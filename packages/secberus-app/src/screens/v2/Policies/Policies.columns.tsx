import React from 'react';
import {
  BaseBadge,
  Text,
  Switch,
  SeverityBadge,
  RCTableExtendedColumnType,
  Checkbox,
  TableCell,
} from '@secberus/components';
import { secberusApi_Policy } from '@secberus/services';
import { RiskPosturePolicyCell } from '../RiskPosture/RiskPosture.styled';
import { ResourcesContext } from '../../../app/core/wrappers/WithResources';
import { OverlayExpanderCell } from '../../../components';
import { UseTableSelectReturnType } from '../../../components/TableSelect/useTableSelect.component';
import { AuthorCell } from '../../../components/Cells/AuthorCell';

interface UsePolicyColumnsProps {
  selected?: string[];
  secberusManagedProps: { handleChange: (...args: any) => any };
  canTogglePolicy: boolean;
  isAllOnPageSelected: UseTableSelectReturnType['isAllOnPageSelected'];
  handleSelectAllOnPage:
    | UseTableSelectReturnType['selectAllOnPage']
    | UseTableSelectReturnType['deselectAllOnPage'];
  handleSelectRow: UseTableSelectReturnType['handleSelectRow'];
  omitColumns?: string[];
}

export const usePolicyColumns: (
  values: UsePolicyColumnsProps
) => RCTableExtendedColumnType<secberusApi_Policy>[] = ({
  selected = [],
  canTogglePolicy,
  secberusManagedProps: { handleChange },
  isAllOnPageSelected,
  handleSelectAllOnPage,
  handleSelectRow,
  omitColumns = [],
}) =>
  React.useMemo<RCTableExtendedColumnType<secberusApi_Policy>[]>(() => {
    const columns: RCTableExtendedColumnType<secberusApi_Policy>[] = [
      {
        key: 'select',
        dataIndex: 'select',
        width: 46,
        fixed: true,
        sort: false,
        title: (
          <Checkbox
            id="select-all-checkbox"
            onChange={() => handleSelectAllOnPage()}
            checked={isAllOnPageSelected}
            gutterBottom={false}
          />
        ),
        render: (_val, { id }) => (
          <TableCell>
            <Checkbox
              id={id}
              onChange={handleSelectRow}
              checked={selected.includes(id as string)}
              gutterBottom={false}
            />
          </TableCell>
        ),
      },
      {
        resize: true,
        sort: true,
        key: 'name',
        dataIndex: 'name',
        title: 'Policy',
        ellipsis: true,
        width: 360,
        fixed: true,
        render: (_val, row, _idx) => {
          return (
            <TableCell to={`/policies/policy/details/${row.id}/details`}>
              <OverlayExpanderCell buttonText="View policy">
                <RiskPosturePolicyCell>
                  <Text type="xsmall-regular" color="extra-dark">
                    {row.name}
                  </Text>
                </RiskPosturePolicyCell>
              </OverlayExpanderCell>
            </TableCell>
          );
        },
      },
      {
        resize: true,
        key: 'subscribed',
        dataIndex: 'subscribed',
        title: 'Status',
        width: 78,
        render: (_val, row, _idx) => (
          <TableCell to={`/policies/policy/details/${row.id}/details`}>
            <span onClick={e => e.stopPropagation()}>
              <Switch
                initialChecked={row.subscribed}
                disabled={!canTogglePolicy}
                updateCheckboxState={(_e, checked) =>
                  handleChange(row.id, checked)
                }
              />
            </span>
          </TableCell>
        ),
      },
      {
        resize: true,
        key: 'label',
        title: 'ID',
        width: 148,
        dataIndex: 'label',
        sort: true,
        render: (_val, { label, id }, _idx) => (
          <TableCell to={`/policies/policy/details/${id}/details`}>
            <Text type="xsmall-regular" color="extra-dark">
              {label ?? '-'}
            </Text>
          </TableCell>
        ),
      },
      {
        resize: true,
        ellipsis: true,
        key: 'resource_name',
        title: 'Resource type',
        width: 210,
        dataIndex: 'resource_name',
        render: (_val, row, _idx) => {
          return (
            <TableCell to={`/policies/policy/details/${row.id}/details`}>
              <ResourcesContext.Consumer>
                {resourceMap => (
                  <BaseBadge
                    background="transparent"
                    label={
                      <Text type="xsmall-regular" color="extra-dark">
                        {row?.resource_id
                          ? resourceMap[row.resource_id]?.description
                          : '-'}
                      </Text>
                    }
                    iconMap="resource"
                    // @ts-expect-error expect it
                    icon={resourceMap[row?.resource_id]?.datasource_types[0]}
                    padding="0px"
                  />
                )}
              </ResourcesContext.Consumer>
            </TableCell>
          );
        },
      },
      {
        resize: true,
        key: 'severity',
        title: 'Severity',
        width: 100,
        dataIndex: 'severity',
        sort: true,
        render: (_val, row, _idx) => {
          return (
            <TableCell to={`/policies/policy/details/${row.id}/details`}>
              <SeverityBadge
                background="transparent"
                priorityNum={row.severity}
                type="xsmall-regular"
                color="extra-dark"
              />
            </TableCell>
          );
        },
      },
      {
        key: 'secberus_managed',
        resize: true,
        ellipsis: true,
        dataIndex: 'secberus_managed',
        title: 'Author',
        sort: true,
        width: 180,
        render: (_val, { secberus_managed, id }, _idx) => (
          <TableCell to={`/policies/policy/details/${id}/details`}>
            <AuthorCell
              secberusManaged={secberus_managed}
              textProps={{ type: 'xsmall-regular', color: 'extra-dark' }}
            />
          </TableCell>
        ),
      },
      {
        resize: true,
        ellipsis: true,
        key: 'policy_category_name',
        title: 'Category',
        width: 216,
        dataIndex: 'policy_category_name',
        render: (_val, row, _idx) => (
          <TableCell to={`/policies/policy/details/${row.id}/details`}>
            <Text type="xsmall-regular" color="extra-dark">
              {row?.policy_category_name}
            </Text>
          </TableCell>
        ),
      },
    ];
    return columns.filter(o => !omitColumns.includes(o.key as string));
  }, [
    canTogglePolicy,
    handleChange,
    handleSelectAllOnPage,
    handleSelectRow,
    isAllOnPageSelected,
    omitColumns,
    selected,
  ]);
