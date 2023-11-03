import React from 'react';
import {
  CodeEditor,
  Text,
  Input,
  Button,
  useCodeEditorRef,
  SplitButton,
  ButtonDropdown,
} from '@secberus/components';
import styled from 'styled-components';
import { Play, More } from '@secberus/icons';
import { Box, Flex } from '@chakra-ui/react';
import qs from 'query-string';
import { useForm } from 'react-hook-form';
import {
  explorerApi,
  policiesApi2,
  secberusApi_RunQueryApiArg,
} from '@secberus/services';
import { ThemeContext } from 'styled-components';
import {
  useHistory,
  useParams,
  generatePath,
  useLocation,
} from 'react-router-dom';
import { useModalToggle } from '@secberus/utils';
import { cloneDeep } from 'lodash';
import { useDispatch } from 'react-redux';
import { QUERY_TAB_KEY } from '..';
import { Feature } from '../../../feature-flags/Feature.component';
import { useFeatureFlags } from '../../../feature-flags/hooks/useFeatureFlags';
import { ErrorBoundary } from '../../../../utils/wrappers/ErrorBoundaries';
import { useDataExplorerContext } from '../../DataExplorerProvider';
import { PathParams } from '../../DataExplorerScreen.types';
import { EditOrSave, DeleteModal } from '../modals';
import { dataExplorerPaths } from '../../routes';
import { isQueryNew } from '../common/utils';
import type { CloseCallbackArgs } from '../modals/DataExplorerModals.types';
import {
  attributesActions,
  selectExplorerQuery,
} from '../../../attributes/slice';
import { useTypedSelector } from '../../../../store';
import { DEFAULT_QUERY_ID } from '../../DataExplorerProvider';
import { notifySuccess } from '../../../../store';

export type OptionKey =
  | 'save-existing'
  | 'save-view'
  | 'save-query'
  | 'save-policy'
  | 'edit-name'
  | 'delete-query'
  | 'delete-view'
  | 'update-policy';

export type OptionDropdowns = {
  id: string;
  label: string;
  onClick: (
    e: any,
    option:
      | {
          id: OptionKey;
        }
      | OptionKey
  ) => void;
}[];

const CHECK_QUERY = /\$\d{1,}/gim;

const StyledPlay = styled(Play)`
  path {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

type DataExplorerQueryProps = {
  setQueryArg: (newArgs: secberusApi_RunQueryApiArg['sqlQuery']) => void;
  setQueryFocus: React.Dispatch<React.SetStateAction<string>> | undefined;
};

export function DataExplorerQueryComponent({
  setQueryArg,
  setQueryFocus,
}: DataExplorerQueryProps) {
  // Context and stateful variables
  const { queryId, viewType } = useParams<PathParams>();
  // To collect info from monaco
  const { monaco } = useCodeEditorRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const isNewQuery = isQueryNew(queryId);
  const { getTabState, setTabState } = useDataExplorerContext();
  const explorerQuery = useTypedSelector(selectExplorerQuery);
  const theme = React.useContext(ThemeContext);
  const features = useFeatureFlags();
  const { action } = qs.parse(search);
  // States
  const [rev1Enabled, rev2Enabled] = [
    features?.['data-explorer-rev1'],
    features?.['data-explorer-rev2'],
  ];

  const isNewPolicy = React.useMemo(() => action === 'new_policy', [action]);
  const queryName = getTabState(queryId)?.name ?? 'New query';
  const isPolicy = viewType === 'policy';
  // API Specs
  const { data: policy, ...getPolicyQuery } = policiesApi2.useGetPolicyQuery(
    {
      //@ts-expect-error skips if queryId undefined
      id: queryId,
    },
    {
      skip: !queryId || viewType !== 'policy' || isNewQuery,
    }
  );
  const [editQuery, editQueryMutation] = explorerApi.useEditQueryMutation();
  const [updateView, updateViewMutation] = explorerApi.useUpdateViewMutation();
  const [updatePolicy, updatePolicyQuery] =
    policiesApi2.useUpdatePolicyMutation();
  const isMutating =
    editQueryMutation.isLoading ||
    updateViewMutation.isLoading ||
    updatePolicyQuery.isLoading;

  const [queryState, setQueryState] = React.useState<string>('');

  const query = React.useMemo(() => {
    const tabStateQuery = getTabState(queryId)?.query as string;
    if (isNewPolicy) {
      return (explorerQuery as string) || '';
    } else {
      return tabStateQuery ?? queryState ?? '';
    }
  }, [explorerQuery, getTabState, isNewPolicy, queryId, queryState]);

  // Hooks
  const handleSavePolicy = React.useCallback(() => {
    if (queryId && queryState !== query) {
      setTabState(queryId, { query: queryState });
    }

    dispatch(
      attributesActions.querySet({
        explorerQuery: queryState,
      })
    );

    history.push('/policies/form/details?fromExplorer=true');
  }, [dispatch, history, query, queryId, queryState, setTabState]);

  React.useEffect(() => {
    if (editQueryMutation.isSuccess || updateViewMutation.isSuccess)
      notifySuccess(
        `${viewType === 'view' ? 'View' : 'Query'} updated successfully`
      );
  }, [editQueryMutation.isSuccess, updateViewMutation.isSuccess, viewType]);

  React.useEffect(() => {
    const editor = monaco?.editor;
    const disposable = editor?.onDidCreateEditor(editorInstance => {
      // Set the default value on mount only
      editorInstance?.onDidChangeModel(() => {
        const model = editorInstance?.getModel();
        model?.setValue(query || '');
        setQueryState(query || '');
      });

      // Only save the editor value on blur, reducing unnecessary state changes
      editorInstance.onDidBlurEditorText(() => {
        const value = editorInstance.getValue();
        if (value !== query) {
          setQueryState(value);
          setTabState(queryId ?? DEFAULT_QUERY_ID, { query: value });
        }
        // explorerQuery only needs to be updated for action=new_policy
        if (isNewPolicy) {
          dispatch(
            attributesActions.querySet({
              explorerQuery: value,
            })
          );
        }
      });
    });

    return () => {
      // Call editor clean-up functions
      disposable?.dispose();
    };
  }, [
    monaco,
    query,
    dispatch,
    queryId,
    setTabState,
    explorerQuery,
    isNewPolicy,
    queryState,
  ]);

  const keyValues = React.useMemo(
    () =>
      rev1Enabled
        ? query?.match(CHECK_QUERY)?.reduce((acc: Array<string>, val) => {
            acc.indexOf(val) === -1 && acc.push(val);
            return acc;
          }, [])
        : [],
    [query, rev1Enabled]
  );

  const { register, handleSubmit, watch } = useForm({
    mode: 'onBlur',
    shouldUnregister: false,
  });

  const [editSaveModalOpen, toggleEditSaveModalOpen] = useModalToggle();
  const [deleteModalOpen, toggleDeleteModalOpen] = useModalToggle();
  const [modalType, setModalType] = React.useState<OptionKey>();

  /**
   * @description Catch all to handle all modals
   * @param modalType OptionKey
   * @param id string
   * @param name Only used on edit actions - expect an existing item
   * @param confirmed
   * @returns undefined | void
   * @todo Type this a bit stronger with the tuple type
   */
  const closeModalCallback = ({ modalType, id, name }: CloseCallbackArgs) => {
    let collectedTabState;

    switch (modalType) {
      case 'save-query':
        if (id) {
          const pushLocation = generatePath(
            dataExplorerPaths.dataExplorerManagement,
            {
              viewType: 'query',
              queryId: id,
            }
          );
          history.push(pushLocation, {
            fromExplorer: true,
          });
        }
        break;
      case 'edit-name':
        if (id && name) {
          collectedTabState = getTabState(id);
          setTabState(id, {
            ...collectedTabState,
            name,
          });
        }
        break;
      case 'save-view':
        if (id) {
          const pushLocation = generatePath(
            dataExplorerPaths.dataExplorerManagement,
            {
              viewType: 'view',
              queryId: id,
            }
          );
          history.push(pushLocation, {
            fromExplorer: true,
          });
        }
        break;
      case 'delete-query':
      case 'delete-view':
        toggleDeleteModalOpen();
        return;
      default:
        break;
    }
    toggleEditSaveModalOpen();
  };

  const watchedValues = watch();

  const onSubmit = async (args: any) => {
    if (!query) return;
    // Have to filter keyValues but don't want to lose the value if they
    // delete a variable on accident, so we persist it.
    const parameters = rev2Enabled
      ? keyValues?.reduce((acc: Record<string, string>, key) => {
          if (args?.[key]) acc[key] = args[key];
          return acc;
        }, {})
      : {};
    setQueryFocus?.(QUERY_TAB_KEY);
    setQueryArg({
      query,
      parameters,
    });
  };

  /**
   * @description Handles one of the many modal opening options we have
   * on this screen - will set the correct modal type and toggle said modal
   * @param e throwaway
   * @param option OptionKey | Record<'id', OptionKey>
   */
  const handleOptionClick = (
    e: any,
    option:
      | {
          id: OptionKey;
        }
      | OptionKey
  ) => {
    const selectedModalType = typeof option !== 'string' ? option?.id : option;
    setModalType(selectedModalType);
    switch (selectedModalType) {
      case 'save-policy':
        if (query || queryState) {
          handleSavePolicy();
        }
        break;
      case 'update-policy':
        if (getPolicyQuery.isSuccess && queryId && policy) {
          const createPolicy = cloneDeep(policy);
          if (createPolicy?.logic) delete createPolicy.logic;
          if (!createPolicy?.policy_category_id) break;
          createPolicy.query = query;
          updatePolicy({
            id: queryId,
            //@ts-expect-error What
            createPolicy: {
              ...createPolicy,
            },
          });
        }
        break;
      case 'delete-query':
      case 'delete-view':
        toggleDeleteModalOpen();
        break;
      case 'save-existing':
        if (isNewQuery || !queryId) {
          setModalType('save-query');
          toggleEditSaveModalOpen();
        } else {
          const payload = {
            name: queryName,
            query,
          };

          switch (viewType) {
            case 'query':
              editQuery({
                id: queryId,
                saveSqlQuery: payload,
              });
              break;
            case 'view':
              updateView({ id: queryId, saveView: payload });
          }
        }
        break;
      default:
        toggleEditSaveModalOpen();
    }
  };
  const [buttonText, mainButtonActionKey]: [string, OptionKey] = isPolicy
    ? isNewPolicy || isNewQuery
      ? ['Save policy', 'save-policy']
      : ['Save changes', 'update-policy']
    : ['Save', 'save-existing'];

  /**
   * @description Split button dropdowns with a typed accumulator which will
   * enable the dropdown item if the feature is enabled
   */
  const SplitButtonDropdownOptions: OptionDropdowns = [
    {
      id: 'save-query',
      label: 'Save as query',
      onClick: handleOptionClick,
      enabled: rev1Enabled,
    },
    {
      id: 'save-view',
      label: 'Save as view',
      onClick: handleOptionClick,
      enabled: rev2Enabled,
    },
    {
      id: 'save-policy',
      label: 'Save as policy',
      onClick: handleOptionClick,
      enabled: rev1Enabled,
    },
  ].reduce((acc: OptionDropdowns, val, index) => {
    const { id, label, onClick, enabled } = val;
    enabled && acc.push({ id, label, onClick });
    return acc;
  }, []);

  const splitButtonLoadingState =
    buttonText === 'Save' &&
    (editQueryMutation.isLoading || updateViewMutation.isLoading);

  return (
    <>
      <Flex w="100%" h="100%" flexDirection="column">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          minHeight="64px"
          w="100%"
          padding="20px 40px"
          borderBottom={`1px solid ${theme.colors['light-gray']}`}
        >
          <Text type="bold">{queryName}</Text>
          <Flex gridGap="8px">
            <Button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              disabled={isMutating}
            >
              <Flex alignItems="center" flexGap="4px">
                <StyledPlay />
                <span>Run</span>
              </Flex>
            </Button>
            <SplitButton
              variant="secondary"
              type="button"
              isLoading={splitButtonLoadingState}
              disabled={isMutating}
              onClick={e => {
                handleOptionClick(e, mainButtonActionKey);
              }}
              options={SplitButtonDropdownOptions}
            >
              {
                /* Will only ever be an edit state here */
                buttonText
              }
            </SplitButton>
            {!isNewQuery && !isPolicy && (
              <ButtonDropdown
                alignRight
                variant="secondary"
                disabled={isMutating}
                options={[
                  {
                    id: 'edit-name',
                    name: 'Edit name',
                    onClick: () => handleOptionClick(undefined, 'edit-name'),
                  },
                  {
                    id: 'delete',
                    name: `Delete ${viewType === 'query' ? 'query' : 'view'}`,
                    destructive: true,
                    onClick: () =>
                      handleOptionClick(
                        undefined,
                        viewType === 'query' ? 'delete-query' : 'delete-view'
                      ),
                  },
                ]}
                icon
                label={<More height="24px" width="24px" />}
              />
            )}
          </Flex>
        </Flex>
        <Flex w="100%" h="calc(100% - 72px)">
          <Box
            w={rev2Enabled && keyValues ? 'calc(100% - 290px)' : '100%'}
            h="100%"
          >
            <CodeEditor
              defaultLanguage="REGO"
              theme="sb-white"
              options={{
                readOnly: isMutating,
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                automaticLayout: true,
                padding: {
                  top: 16,
                },
              }}
            />
          </Box>
          <Feature name="data-explorer-rev1">
            <form>
              {keyValues && (
                <Box
                  w="290px"
                  padding="16px 20px"
                  className="param-container"
                  overflowY="auto"
                >
                  <Box mb="8px">
                    <Text type="small-bold">Query parameters</Text>
                  </Box>
                  <Flex mt="16px" flexDirection="column" gridGap="16px">
                    {keyValues.map((val: string) => (
                      <Flex
                        key={`input_${val}`}
                        justifyContent="space-between"
                        alignItems="center"
                        gap="16px"
                        overflowX="auto"
                      >
                        <Text type="small-regular">{val}&nbsp;=&nbsp;</Text>
                        <Input
                          defaultValue={watchedValues?.[val] || ''}
                          placeholder="Value"
                          name={val}
                          ref={register}
                          type="text"
                          noMargin
                          required
                        />
                      </Flex>
                    ))}
                  </Flex>
                </Box>
              )}
            </form>
          </Feature>
        </Flex>
      </Flex>
      {editSaveModalOpen && query?.length && (
        <EditOrSave
          closeCallback={closeModalCallback}
          isVisible={editSaveModalOpen}
          modalType={modalType}
          query={query}
          name={!isNewQuery ? queryName : ''}
        />
      )}
      {deleteModalOpen && (
        <DeleteModal
          isVisible={deleteModalOpen}
          modalType={modalType}
          closeCallback={closeModalCallback}
        />
      )}
    </>
  );
}

export function DataExplorerQuery(props: DataExplorerQueryProps) {
  return (
    <ErrorBoundary
      height="100%"
      message="Something unexpected went wrong trying to execute queries."
    >
      <DataExplorerQueryComponent {...props} />
    </ErrorBoundary>
  );
}
