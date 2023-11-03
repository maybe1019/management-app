/**
 * @author Sigkar <duncan@secberus.com>
 * @returns React.component
 * @description Silo feature for creating activity log tables
 */
import { TableGW } from '@secberus/components';
import { CustomGetLogsApiResponse } from '@secberus/services';
import React from 'react';
import { Box } from '@chakra-ui/react';
import {
  camelToSnakeObjectKeys,
  useDeepEffect,
  useDeepMemo,
} from '@secberus/utils';
import { useGetLogsPage } from '../hooks';
import { ChildrenLogs } from '../types/ActivityLog.types';
import { columns } from './ActivityLog.columns';
import { TableWrapper } from '.';

function parseFloatOrUndefined(floatVal: string): number | undefined {
  if (!floatVal.length) return undefined;
  const parsed = parseFloat(floatVal);
  if (isNaN(parsed)) {
    return undefined;
  }
  return parsed;
}

export const ActivityLogTable = ({
  params,
}: {
  params: Record<string, any>;
}) => {
  const { filters, earliest, latest } = useDeepMemo(() => {
    const prebuiltParams = { ...params };
    const filters: Record<string, Array<string>> = {};
    let earliest;
    let latest;
    // These two are forced due to queryparams being
    // an array of strings and number is required
    if (typeof prebuiltParams?.earliest?.[0] === 'string') {
      earliest = parseFloatOrUndefined(prebuiltParams.earliest[0]);
      // Earliest is required for latest
      if (earliest && typeof prebuiltParams?.latest?.[0] === 'string') {
        latest = parseFloatOrUndefined(prebuiltParams.latest[0]);
        delete prebuiltParams.latest;
      }
      delete prebuiltParams.earliest;
    }
    if (prebuiltParams) {
      Object.assign(filters, camelToSnakeObjectKeys(prebuiltParams));
    }
    return { filters, earliest, latest };
  }, [params]);

  const { data, PaginationComponent, isLoading, getLogsPage, resetPagination } =
    useGetLogsPage({
      params: {
        filters,
        earliest,
        latest,
      },
    });

  useDeepEffect(() => {
    resetPagination();
  }, [params]);

  useDeepEffect(() => {
    getLogsPage({ earliest, latest, filters });
  }, [getLogsPage, earliest, latest, filters]);
  /*
    TODO: @sigkar Discuss w/ backend if we can simplify this. This is a
    workaround due to strict return from backend since athena is not as
    accessible as Opensearch for customization. Also, building our own children
    gives us better control on the UI as to what gets dropdowns.
  */
  const logsWithDataAsChildren: ChildrenLogs[] = useDeepMemo(() => {
    if (isLoading || !data?.logs) return [];
    return data.logs.map(
      (d: CustomGetLogsApiResponse['logs'][0]): ChildrenLogs => {
        const dataObj: Record<string, any> = {};
        Object.assign(dataObj, {
          message: d.data.message,
          level: d.data.level,
          event_type: d.data.event_type,
          children: [
            {
              isChild: true,
              data: d.data,
              time: d.time,
              id: d.id,
              event_type: d.data.event_type,
              status: d.data.status,
            },
          ],
          ...d,
        });
        delete dataObj.data;
        return dataObj as ChildrenLogs;
      }
    ) as unknown as ChildrenLogs[];
  }, [data, isLoading]);

  return (
    <Box padding="32px">
      <TableWrapper>
        <TableGW<ChildrenLogs>
          isLoading={isLoading}
          columns={columns}
          data={logsWithDataAsChildren}
          rowKey={record => {
            // @ts-expect-error Hard to type w/o backend
            return record.isChild ? `child_row_${record.id}` : record.id;
          }}
        />
        {PaginationComponent}
      </TableWrapper>
    </Box>
  );
};
