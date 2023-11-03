import React from 'react';
import { Switch, Text, RCTableExtendedColumnType } from '@secberus/components';
import { AnyFn } from '@secberus/utils';
import { Flex } from '@chakra-ui/react';
import { ComplianceFramework } from '@secberus/services';
import { AuthorCell } from '../../components/Cells/AuthorCell';
import { DateCell } from '../../components/Cells/DateCell/DateCell.component';
import { DatasourceListCell } from '../../components/Cells/DatasourceListCell/DatasourceListCell.component';

interface UseFrameworkColumns {
  handleToggle: AnyFn;
}

export const useFrameworkColumns: (
  args: UseFrameworkColumns
) => RCTableExtendedColumnType<ComplianceFramework>[] = ({ handleToggle }) => {
  const columns = React.useMemo(
    () =>
      [
        {
          key: 'name',
          title: 'Name',
          resize: true,
          fixed: true,
          ellipsis: true,
          width: 343,
          render: (_val, { id, name }, _idx) => (
            <Text type="xsmall-regular" color="extra-dark">
              {name}
            </Text>
          ),
        },
        {
          key: 'action',
          title: 'Status',
          dataKey: 'Status',
          resize: true,
          width: 78,
          render: (_val, { enabled, id }, _idx) => (
            <Flex alignItems="center">
              <Switch
                initialChecked={enabled}
                updateCheckboxState={(_e, checked) => handleToggle(id, checked)}
              />
            </Flex>
          ),
        },
        {
          key: 'version',
          title: 'Version',
          className: 'centered-head',
          resize: true,
          width: 100,
          render: (_val, { version }, _idx) => (
            <Text type="xsmall-regular" color="extra-dark" align="center">
              {version ?? '-'}
            </Text>
          ),
        },
        {
          key: 'secberus_managed',
          title: 'Maintained by',
          resize: true,
          width: 172,
          render: (_val, { secberus_managed }, _idx) => (
            <AuthorCell
              secberusManaged={secberus_managed}
              textProps={{ type: 'xsmall-regular', color: 'extra-dark' }}
            />
          ),
        },
        {
          key: 'name',
          title: 'Last updated',
          resize: true,
          width: 150,
          render: (_val, { update_timestamp }, _idx) => (
            <DateCell
              datetime={update_timestamp!}
              textProps={{ type: 'xsmall-regular', color: 'extra-dark' }}
            />
          ),
        },
        {
          key: 'name',
          title: 'Policies',
          className: 'centered-head',
          resize: true,
          width: 100,
          sort: false,
          render: (_val, { policy_count }, _idx) => (
            <Text type="xsmall-regular" color="extra-dark" align="center">
              {policy_count ?? 0}
            </Text>
          ),
        },
        {
          key: 'name',
          title: 'Data source type',
          resize: true,
          width: 137,
          render: (_val, { datasource_types }, _idx) => {
            return <DatasourceListCell types={datasource_types ?? []} />;
          },
        },
      ] as RCTableExtendedColumnType<ComplianceFramework>[],
    [handleToggle]
  );
  return columns;
};
