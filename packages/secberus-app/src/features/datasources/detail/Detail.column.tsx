import React from 'react';
import {
  BaseBadge,
  RCTableExtendedColumnType,
  BadgeIcon,
  ConnectionStatusBadge,
  ConnectionStatusType,
} from '@secberus/components';
import { Resource } from '@secberus/services';
import { OverlayExpanderCell } from '../../../components';
import { DateCell } from '../../../components/Cells/DateCell/DateCell.component';

export const useDataSourceResourcesColumns = ({
  datasourceType,
}: {
  datasourceType?: string;
}) =>
  React.useMemo<RCTableExtendedColumnType<Resource>[]>(
    () => [
      {
        key: 'description',
        dataIndex: 'description',
        title: 'Resource type',
        sort: false,
        resize: true,
        render: (_val, row) => (
          <OverlayExpanderCell buttonText="View log events">
            <BaseBadge
              transparent
              typography="xsmall-regular"
              color="extra-dark"
              iconMap="datasource"
              icon={datasourceType as BadgeIcon}
              label={row?.description}
            />
          </OverlayExpanderCell>
        ),
      },
      {
        key: 'last_successful',
        dataIndex: 'last_successful',
        title: 'Last connection',
        width: 208,
        sort: false,
        resize: true,
        ellipsis: true,
        // @ts-expect-error badly typed backend response
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
        // @ts-expect-error badly typed backend response
        render: (_val, { last_attempt }) => (
          <DateCell
            format="YYYY-MM-DD HH:mm:ss (Z)"
            datetime={last_attempt}
            textProps={{ type: 'xsmall-regular', color: 'extra-dark' }}
          />
        ),
      },
      {
        key: 'collection_status',
        dataIndex: 'collection_status',
        title: 'Collection status',
        width: 270,
        sort: false,
        // @ts-expect-error badly typed backend response
        render: (_val, { collection_status }) => {
          const type = collection_status ? 'success' : 'failure';
          let message: string;
          let reason: string | undefined;

          switch (collection_status) {
            case true:
              message = 'Successful';
              reason = 'All resources collected';
              break;
            default:
              message = 'Unable to collect';
          }

          return (
            <ConnectionStatusBadge
              type={type as ConnectionStatusType}
              status={{
                message,
                reason,
              }}
            />
          );
        },
      },
    ],
    [datasourceType]
  );
