import React from 'react';
import { Box } from '@chakra-ui/react';
import { Input, PropertyNames } from '@secberus/components';
import { SearchDark } from '@secberus/icons';
import { explorerApi } from '@secberus/services';
import { useDeepMemo } from '@secberus/utils';
import { useParams } from 'react-router-dom';
import { ValueWithType, DescriptionContent } from '../../common';
import { ActiveTableViews, HandleItemClickArgs } from '../..';
import { useFeatureFlags } from '../../../../feature-flags/hooks/useFeatureFlags';
import { useDataExplorerContext } from '../../../DataExplorerProvider';

export type HandleItemClickProps = {
  handleItemClick: (
    id: string,
    type: HandleItemClickArgs['keyType']
  ) => unknown;
};

/**
 * @author Duncan Pierce <duncan@secberus.com>
 * @description builds a very complex list of groups for rendering a Sidebar.
 * The groups are complex and have several subcomponents. This could all live
 * in the same file its being used in, but its cleaner imo as a hook
 * it also returns the data from the API since it's being requested here.
 * @returns Sidebar groups, unfiltered views (limit 500), tables, and isLoading
 */
export function useBuildGroups({ handleItemClick }: HandleItemClickProps) {
  /**
   * @param type 'table' or 'views' - will handle click with a constant string
   * without the need of extending existing type args
   * @returns function
   */
  const createTypeClosure = (type: HandleItemClickArgs['keyType']) => {
    function closure(id: string, isOpen?: boolean) {
      isOpen && handleItemClick(id, type);
    }
    return closure;
  };

  const features = useFeatureFlags();
  const [_, rev2Enabled, dataExplorerEnabled] = [
    features?.['data-explorer-rev1'],
    features?.['data-explorer-rev2'],
    features?.['data-explorer'],
  ];

  const tableClosure = createTypeClosure('tables');
  const viewClosure = createTypeClosure('views');

  const { data: tables, ...listTablesQuery } = explorerApi.useListTablesQuery();
  const { data: views, ...listViewsQuery } = explorerApi.useListViewsQuery({
    limit: 500,
  });

  const { queryId } = useParams<{ queryId?: string }>();
  const { getTabState, setTabState } = useDataExplorerContext();
  const defaultSearch = React.useMemo(
    () => getTabState(queryId)?.searchFilters,
    [getTabState, queryId]
  );

  const [tableSearch, setTableSearch] = React.useState<string>(
    defaultSearch?.tables ?? ''
  );
  const [viewSearch, setViewSearch] = React.useState<string>(
    defaultSearch?.views ?? ''
  );

  const handleBlurEvent = React.useCallback(
    (key: PropertyNames<ActiveTableViews>, value: string) => {
      if (queryId && key) {
        setTabState(queryId, {
          searchFilters: {
            ...defaultSearch,
            [key]: value,
          },
        });
      }
    },
    [defaultSearch, queryId, setTabState]
  );

  const isLoading = listTablesQuery.isLoading || listViewsQuery.isLoading;

  // I think this is the most expensive memo I've ever written
  const groups = useDeepMemo(() => {
    const tableItems = [];
    const viewItems = [];
    const viewResults = views?.results;
    // Filter tables
    const filteredTables =
      tableSearch?.length && tables?.length
        ? tables.filter(({ name }) => name.indexOf(tableSearch) !== -1)
        : tables;
    // filter views
    const filteredViews =
      viewSearch?.length && viewResults
        ? viewResults.filter(({ name }) => name.indexOf(viewSearch) !== -1)
        : viewResults;
    if (filteredTables?.length)
      for (let i = 0; i <= Math.min(filteredTables.length - 1, 100); i++) {
        tableItems.push({
          id: filteredTables?.[i]?.name,
          label: filteredTables?.[i]?.name,
          render: (
            <Box mt="16px" mb="16px">
              {filteredTables?.[i]?.columns.map(
                ({
                  data_type,
                  column_name,
                }: {
                  data_type: string;
                  column_name: string;
                }) => {
                  // Don't show "private" fields
                  if (column_name.startsWith('_')) return undefined;
                  return (
                    <ValueWithType
                      key={column_name}
                      value={column_name}
                      type={data_type}
                    />
                  );
                }
              )}
            </Box>
          ),
        });
      }
    if (filteredViews?.length)
      for (let i = 0; i <= Math.min(filteredViews.length - 1, 100); i++) {
        viewItems.push({
          id: filteredViews?.[i]?.id,
          label: filteredViews?.[i]?.name,
          render: (
            <DescriptionContent
              description={filteredViews?.[i]?.query as string}
            />
          ),
        });
      }
    const groups = [];
    if (dataExplorerEnabled) {
      groups.push({
        render: (
          <Box mt="16px" key="SEARCH_TABLES">
            <Input
              icon={<SearchDark />}
              onChange={e => {
                e.preventDefault();
                setTableSearch(e.currentTarget.value);
              }}
              onBlur={e => handleBlurEvent('tables', e.currentTarget.value)}
              placeholder="Search tables"
              value={tableSearch}
              noMargin
            />
          </Box>
        ),
        id: 'SEARCH_TABLES',
        label: 'Tables',
        handleItemClick: tableClosure,
        items: tableItems,
      });
    }
    if (rev2Enabled) {
      groups.push({
        render: (
          <Box mt="16px" key="SEARCH_VIEWS">
            <Input
              icon={<SearchDark />}
              onChange={e => {
                e.preventDefault();
                setViewSearch(e.currentTarget.value);
              }}
              onBlur={e => handleBlurEvent('views', e.currentTarget.value)}
              placeholder="Search views"
              value={viewSearch}
              noMargin
            />
          </Box>
        ),
        id: 'SEARCH_VIEWS',
        label: 'Views',
        handleItemClick: viewClosure,
        items: viewItems,
      });
    }
    return groups;
  }, [tables, tableSearch, viewSearch]);

  return {
    groups,
    isLoading,
    tables,
    views,
  };
}
