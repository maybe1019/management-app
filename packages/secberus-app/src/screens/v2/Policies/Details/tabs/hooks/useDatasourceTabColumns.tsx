import React from 'react';
import { useHistory } from 'react-router';
import {
  BadgeIcon,
  BaseBadge,
  RCTableExtendedColumnType,
} from '@secberus/components';
import { Datasource } from '@secberus/services';
import { OverlayExpanderCell } from '../../../../../../components';
import { DateCell } from '../../../../../../components/Cells/DateCell/DateCell.component';

export interface UseDatasourceTabColumnsProps {
  handleRunPolicy: (props: {
    datasourceId: string;
    datasourceName: string;
  }) => void;
  setToggleEditGithubModal: (value: boolean) => void;
  handleRemoveCoverage: (id: Datasource['id']) => void;
  omitColumns?: string[];
}

export const useDatasourceTabColumns: ({
  handleRunPolicy,
  setToggleEditGithubModal,
  handleRemoveCoverage,
  omitColumns,
}: UseDatasourceTabColumnsProps) => RCTableExtendedColumnType<Datasource>[] = ({
  handleRunPolicy,
  setToggleEditGithubModal,
  handleRemoveCoverage,
  omitColumns = [],
}) => {
  const history = useHistory();
  return React.useMemo<RCTableExtendedColumnType<Datasource>[]>(() => {
    const columns: RCTableExtendedColumnType<Datasource>[] = [
      {
        key: 'name',
        dataIndex: 'name',
        title: 'Data source',
        sort: true,
        resize: true,
        render: (_val, { id, name, datasource_type_id }) => (
          <OverlayExpanderCell
            buttonIcon="more"
            buttonOptions={[
              {
                id: 'view-data-source',
                name: 'View data source',
                onClick: () =>
                  datasource_type_id.toLowerCase() === 'github'
                    ? setToggleEditGithubModal(true)
                    : history.push(
                        `/settings/data-sources/data-source/details/${id}`
                      ),
              },
              {
                id: 'run-policy',
                name: 'Run policy',
                onClick: () =>
                  handleRunPolicy({ datasourceId: id!, datasourceName: name }),
              },
              {
                id: 'remove-coverage',
                name: 'Remove coverage',
                destructive: true,
                onClick: () => handleRemoveCoverage(id),
              },
            ]}
          >
            <BaseBadge
              transparent
              typography="xsmall-regular"
              color="extra-dark"
              iconMap="datasource"
              icon={datasource_type_id as BadgeIcon}
              label={name}
            />
          </OverlayExpanderCell>
        ),
      },
      {
        key: 'policy_last_run',
        dataIndex: 'policy_last_run',
        title: 'Policy last run',
        width: 248,
        sort: false,
        resize: true,
        render: (_val, { policy_last_run }) => (
          <DateCell
            format="YYYY-MM-DD HH:mm:ss (Z)"
            datetime={policy_last_run}
            textProps={{
              type: 'xsmall-regular',
              color: 'extra-dark',
            }}
          />
        ),
      },
      {
        key: 'policy_status',
        dataIndex: 'policy_status',
        title: 'Status',
        width: 216,
        sort: false,
        resize: true,
        render: (_val, { datasource_type_id, policy_status }) => {
          const status =
            datasource_type_id.toLowerCase() === 'github'
              ? 'success'
              : policy_status;
          let icon = status;
          let label: string;

          switch (status) {
            case 'success':
              label = 'Completed';
              break;
            case 'failure':
              label = 'Failed';
              break;
            default:
              icon = 'default';
              label = 'N/A';
          }

          return (
            <BaseBadge
              transparent
              typography="xsmall-regular"
              color="extra-dark"
              iconMap="policy-collection-status"
              icon={icon as BadgeIcon}
              label={label}
            />
          );
        },
      },
    ];
    return columns.filter(o => !omitColumns.includes(o.key as string));
  }, [
    handleRemoveCoverage,
    history,
    omitColumns,
    setToggleEditGithubModal,
    handleRunPolicy,
  ]);
};
