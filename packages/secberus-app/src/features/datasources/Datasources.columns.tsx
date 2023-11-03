import React from 'react';
import {
  BadgeIcon,
  BaseBadge,
  ConnectionStatusBadge,
  ConnectionStatusType,
  RCTableExtendedColumnType,
} from '@secberus/components';
import { Datasource } from '@secberus/services';
import { getDatasourceConnectionMessageObject } from '@secberus/utils';
import { OverlayExpanderCell } from '../../components';
import { DateCell } from '../../components/Cells/DateCell/DateCell.component';

export interface UseConnectedDataSourcesColumnsProps {
  omitColumns?: string[];
}

export const useConnectedDataSourcesColumns: ({
  omitColumns,
}: UseConnectedDataSourcesColumnsProps) => RCTableExtendedColumnType<Datasource>[] =
  ({ omitColumns = [] }) =>
    React.useMemo<RCTableExtendedColumnType<Datasource>[]>(() => {
      const columns: RCTableExtendedColumnType<Datasource>[] = [
        {
          key: 'name',
          dataIndex: 'name',
          title: 'Data source',
          sort: true,
          resize: true,
          ellipsis: true,
          render: (_val, row) => (
            <OverlayExpanderCell buttonText="View data source">
              <BaseBadge
                transparent
                typography="xsmall-regular"
                color="extra-dark"
                iconMap="datasource"
                icon={row.datasource_type_id as BadgeIcon}
                label={row.name}
              />
            </OverlayExpanderCell>
          ),
        },
        {
          key: 'last_connection',
          dataIndex: 'last_connection',
          title: 'Last connection',
          width: 208,
          sort: false,
          resize: true,
          ellipsis: true,
          render: (_val, { last_successful }) => (
            <DateCell
              relative
              datetime={last_successful}
              textProps={{ type: 'xsmall-regular', color: 'extra-dark' }}
            />
          ),
        },
        {
          key: 'last_attempt',
          dataIndex: 'last_attempt',
          title: 'Last attempt',
          width: 270,
          sort: false,
          resize: true,
          ellipsis: true,
          render: (_val, { last_attempt }) => (
            <DateCell
              format="YYYY-MM-DD HH:mm:ss (Z)"
              datetime={last_attempt}
              textProps={{ type: 'xsmall-regular', color: 'extra-dark' }}
            />
          ),
        },
        {
          key: 'connection_status',
          dataIndex: 'connection_status',
          title: 'Connection status',
          width: 270,
          sort: false,
          resize: true,
          ellipsis: true,
          render: (
            _val,
            { datasource_type_id, connection_status, verified }
          ) => {
            const badgeProps = getDatasourceConnectionMessageObject(
              datasource_type_id.toLowerCase() === 'github'
                ? 'success'
                : (connection_status as ConnectionStatusType),
              verified
            );

            return <ConnectionStatusBadge {...badgeProps} />;
          },
        },
      ];
      return columns.filter(o => !omitColumns.includes(o.key as string));
    }, [omitColumns]);
