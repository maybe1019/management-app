import React from 'react';
import { Input, BaseModal, Button } from '@secberus/components';
import { explorerApi } from '@secberus/services';
import { Box, Spinner } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { ErrorBoundary } from '../../../../utils/wrappers/ErrorBoundaries';
import { isQueryNew } from '../common/utils';
import { PathParams } from '../../DataExplorerScreen.types';
import { notifySuccess } from '../../../../store';
import {
  INPUT_PLACEHOLDERS,
  TYPE_TO_OUTPUT,
} from './DataExplorerModals.constants';
import {
  EditOrSaveModalProps,
  SaveQuery,
  SaveView,
} from './DataExplorerModals.types';
import { saveViewSchema } from './ExplorerSave.schema';

const EditOrSaveModal = ({
  isVisible,
  modalType = 'save-query',
  closeCallback,
  name,
  query,
}: EditOrSaveModalProps) => {
  const { queryId, viewType } = useParams<PathParams>();
  const isNew = isQueryNew(queryId);

  const { data: queryData, ...getSavedQueryQuery } =
    explorerApi.useGetSavedQueryQuery(
      {
        //@ts-expect-error will skip without queryId truthy
        id: queryId,
      },
      {
        skip: isNew || !queryId || viewType !== 'query',
        selectFromResult: ({ data, ...remainder }) => {
          //TODO: Special case for stripping null parameters for updates
          const parameterStrip = cloneDeep(data);
          if (
            parameterStrip &&
            'parameters' in parameterStrip &&
            !parameterStrip?.parameters
          ) {
            delete parameterStrip.parameters;
          }
          return {
            data: parameterStrip,
            ...remainder,
          };
        },
      }
    );

  const { data: view, ...getViewQuery } = explorerApi.useGetViewQuery(
    {
      //@ts-expect-error will skip if queryId is falsy
      id: queryId,
    },
    { skip: isNew || !queryId || viewType !== 'view' }
  );

  const {
    register,
    handleSubmit,
    errors,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name,
      query,
    },
    mode: 'onBlur',
    shouldUnregister: false,
    resolver: yupResolver(saveViewSchema),
  });

  const [saveView, saveViewMutation] = explorerApi.useSaveViewMutation();
  const [saveQuery, saveQueryMutation] = explorerApi.useSaveQueryMutation();
  const [editName, editQueryNameMutation] = explorerApi.useEditQueryMutation();
  const [updateView, editViewMutation] = explorerApi.useUpdateViewMutation();

  const isMutating =
    saveViewMutation.isLoading ||
    saveQueryMutation.isLoading ||
    editQueryNameMutation.isLoading ||
    editViewMutation.isLoading;

  const isLoading =
    getSavedQueryQuery.isLoading ||
    getSavedQueryQuery.isFetching ||
    getViewQuery.isLoading ||
    getViewQuery.isFetching;

  const isSuccess =
    saveViewMutation.isSuccess ||
    saveQueryMutation.isSuccess ||
    editQueryNameMutation.isSuccess ||
    editViewMutation.isSuccess;

  const message =
    saveViewMutation.isSuccess || editViewMutation.isSuccess
      ? 'View updated successfully'
      : 'Query updated successfully';

  const isScreenLoading = isMutating || isLoading;

  /**
   * @description Catchall for handling saving queries, views
   * and whatever else may come out in the future for this screen.
   * @param data SaveQuery | SaveView
   * @returns void
   */
  const handleSave = async (data: SaveQuery | SaveView) => {
    let res;
    switch (modalType) {
      case 'save-query':
        res = await saveQuery({
          saveSqlQuery: {
            name: data?.name,
            query: data?.query,
          },
        });
        break;
      case 'edit-name':
        if (viewType === 'query' && queryData) {
          res = await editName({
            id: queryData?.id,
            saveSqlQuery: {
              ...queryData,
              name: data?.name,
            },
          });
        } else if (viewType === 'view' && view) {
          res = await updateView({
            id: view?.id,
            saveView: {
              ...view,
              name: data?.name,
            },
          });
        }
        break;
      case 'save-view':
        res = await saveView({
          saveView: {
            name: data?.name,
            query: data?.query,
          },
        });
        break;
      default:
        break;
    }
    if (res && 'error' in res) return;
    closeCallback?.({ modalType, id: res?.data?.id, name: res?.data?.name });
  };
  const defaultValue = modalType === 'edit-name' ? queryData?.name : '';

  React.useEffect(() => {
    if (isSuccess) notifySuccess(message);
  }, [isSuccess, message]);

  return (
    <>
      <BaseModal
        isVisible={isVisible}
        title={TYPE_TO_OUTPUT[modalType]}
        handleClose={closeCallback}
      >
        <Box w="500px">
          <form onSubmit={handleSubmit(handleSave)}>
            {!isLoading || modalType !== 'edit-name' ? (
              <>
                <Input
                  name="name"
                  label="Name"
                  ref={register}
                  error={errors?.name}
                  placeholder={INPUT_PLACEHOLDERS[modalType] || 'Save query'}
                  disabled={isScreenLoading}
                  defaultValue={defaultValue}
                />
                <Box pt="24px">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isScreenLoading}
                  >
                    Save changes
                  </Button>
                </Box>
              </>
            ) : (
              <Spinner />
            )}
          </form>
        </Box>
      </BaseModal>
    </>
  );
};

export const EditOrSave = (props: EditOrSaveModalProps) => {
  return (
    <ErrorBoundary>
      <EditOrSaveModal {...props} />
    </ErrorBoundary>
  );
};
