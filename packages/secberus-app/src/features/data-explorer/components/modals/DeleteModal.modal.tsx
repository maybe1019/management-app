import React from 'react';
import { ConfirmModal, Text } from '@secberus/components';
import { explorerApi } from '@secberus/services';
import { Box, Spinner } from '@chakra-ui/react';
import {
  generatePath,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import { uniqueId } from 'lodash';
import qs from 'query-string';
import { ErrorBoundary } from '../../../../utils/wrappers/ErrorBoundaries';
import { isQueryNew } from '../common/utils';
import {
  DEFAULT_QUERY_TAB_DATA,
  useDataExplorerContext,
} from '../../DataExplorerProvider';
import { dataExplorerPaths } from '../../routes';
import { DeleteModalProps } from './DataExplorerModals.types';

const DeleteModalComponent = ({
  isVisible,
  modalType = 'delete-query',
  closeCallback,
}: DeleteModalProps) => {
  const history = useHistory();
  const { search } = useLocation();
  const typeText = modalType.split('-')[1];
  const { queryId } = useParams<{ queryId?: string }>();
  const { action } = qs.parse(search);
  const { setTabState, tabStates } = useDataExplorerContext();
  const isNewQuery = isQueryNew(queryId);
  const isNewPolicy = React.useMemo(() => action === 'new_policy', [action]);
  const { deleteTabState } = useDataExplorerContext();
  const { data: query, ...getQueryQuery } = explorerApi.useGetSavedQueryQuery(
    {
      //@ts-expect-error will skip if queryId is falsy
      id: queryId,
    },
    { skip: isNewQuery || !queryId || modalType !== 'delete-query' }
  );

  const { data: view, ...getViewQuery } = explorerApi.useGetViewQuery(
    {
      //@ts-expect-error will skip if queryId is falsy
      id: queryId,
    },
    { skip: isNewQuery || !queryId || modalType !== 'delete-view' }
  );

  // Get query for passthrough - only needed for deletion
  const isSavedQueryLoading =
    getQueryQuery.isLoading ||
    getQueryQuery.isFetching ||
    getViewQuery.isLoading ||
    getViewQuery.isFetching;

  const [deleteQuery, deleteQueryMutation] =
    explorerApi.useDeleteQueryMutation();
  const [deleteView, deleteViewMutation] = explorerApi.useDeleteViewMutation();

  const keys = Object.keys(tabStates).filter(val => val !== queryId);
  const lastTab = keys[keys.length - 1];

  const handleTabChange = (tabKey: string) => {
    const tabType =
      tabStates?.[tabKey]?.attributes?.type?.toLowerCase() || 'query';
    const action = tabStates?.[tabKey]?.attributes?.action;

    const pushLocation = generatePath(
      dataExplorerPaths.dataExplorerManagement,
      {
        viewType: tabType,
        queryId: tabKey,
      }
    );

    history.push(
      `${pushLocation}${isNewPolicy && action ? `?action=${action}` : ''}`
    );
  };

  /**
   *
   * @param confirmed
   * @returns
   */
  const handleDelete = async (confirmed: boolean) => {
    if (confirmed) {
      let res;
      const currentQueryId = queryId;
      switch (modalType) {
        case 'delete-query':
          if (query) {
            res = await deleteQuery({ id: query?.id });
          }
          break;
        case 'delete-view':
          if (view) {
            res = await deleteView({ id: view?.id });
          }
          break;
        default:
          break;
      }
      if (res && 'error' in res) return;
      if (currentQueryId) {
        let tabId = lastTab;
        // Delete the tab, if there's only 1, then create new tab and delete current
        if (keys.length > 0) {
          handleTabChange(lastTab);
        } else {
          tabId = btoa(`new_${Number(uniqueId()) + 1}`);
          setTabState(tabId, DEFAULT_QUERY_TAB_DATA);
          handleTabChange(lastTab);
        }

        setTimeout(() => {
          deleteTabState(currentQueryId);
        }, 500);
      }
    }
    closeCallback?.({ modalType });
  };

  if (isNewQuery) {
    closeCallback?.({ modalType });
  }

  return (
    <>
      <ConfirmModal
        title={`Delete ${typeText}`}
        handleClose={handleDelete}
        isVisible={isVisible}
        loading={isSavedQueryLoading}
        btnOpts={{
          variant: 'destructive',
          color: 'white',
          disabled:
            deleteQueryMutation.isLoading || deleteViewMutation.isLoading,
        }}
        btnText="Confirm deletion"
      >
        <Box display="inline">
          Are you sure you want to delete this {`${typeText} `}
          {!isSavedQueryLoading ? (
            `"${query?.name || view?.name}?"` || ''
          ) : (
            <Spinner />
          )}
          <br />
          <Text type="bold">This action is non reversible.</Text>
        </Box>
      </ConfirmModal>
    </>
  );
};

export const DeleteModal = (props: DeleteModalProps) => {
  return (
    <ErrorBoundary>
      <DeleteModalComponent {...props} />
    </ErrorBoundary>
  );
};
