import React from 'react';
import { Link } from 'react-router-dom';
import {
  Text,
  SeverityBadge,
  ViolationsBadge,
  RCTableExtendedColumnType,
  BaseBadge,
  DataTableColLink,
  StatusBadge,
} from '@secberus/components';
import { Policy, Violation } from '@secberus/services';
import { Flex } from '@chakra-ui/react';
import { ResourcesContext } from '../../../../app/core/wrappers/WithResources';
import { isControl } from '../../../../utils/flattenFramework';
import { OverlayExpanderCell } from '../../../../components';
import { BasicCell } from './Requirement.styled';

// TODO @sigkar 1/30/2023: Type properly to fix issues up the tree
// with onclick and rendering in Requirement.table.tsx
export const requirementCols: RCTableExtendedColumnType<any>[] = [
  {
    key: 'id',
    title: 'Status',
    width: 120,
    render: (_val, { violation_count, depth, policy_count }, _idx) => {
      const passing = policy_count
        ? (violation_count ?? 0) < 1
          ? 'passing'
          : 'failing'
        : 'indeterminate';
      return (
        <StatusBadge
          passing={passing}
          transparent
          type="xsmall-regular"
          color="extra-dark"
        />
      );
    },
  },
  {
    key: 'description',
    title: 'Controls',
    width: 350,
    render: (_val, row, _idx) => {
      const label = isControl(row) ? row.identifier : row.name;
      const decorator = isControl(row) ? row.ordinal : 0;
      return (
        <OverlayExpanderCell buttonText="View control">
          <Text type="xsmall-regular" color="extra-dark">
            {decorator}. {label}
          </Text>
        </OverlayExpanderCell>
      );
    },
  },
  {
    key: 'failed_policy_count',
    title: 'Passing',
    width: 160,
    render: (_val, { policy_count, failed_policy_count }, _idx) => {
      return (
        <Text type="xsmall-regular" color="extra-dark">
          {policy_count - failed_policy_count} / {policy_count}
        </Text>
      );
    },
  },
  {
    key: 'policy_count',
    title: 'Policies',
    width: 120,
    render: (_val, { policy_count }, _idx) => (
      <Text type="xsmall-regular" color="extra-dark">
        {policy_count}
      </Text>
    ),
  },
  {
    key: 'violation_count',
    title: 'Violations',
    width: 125,
    render: (_val, { violation_count }, _idx) => {
      return <ViolationsBadge violations={violation_count} />;
    },
  },
];

export const policyColumns: RCTableExtendedColumnType<Policy>[] = [
  {
    key: 'severity',
    title: 'Severity',
    width: 108,
    sort: true,
    resize: true,
    render: (_val, row, _idx) => {
      return (
        <BasicCell
          as={Link}
          to={`policy/details/${row.id}`}
          className="leftAlign"
        >
          <SeverityBadge
            background="transparent"
            priorityNum={row.severity}
            type="xsmall-regular"
            color="extra-dark"
          />
        </BasicCell>
      );
    },
  },
  {
    key: 'name',
    title: 'Policy',
    render: (_val, row, _idx) => (
      <BasicCell as={Link} to={`policy/details/${row.id}`}>
        <OverlayExpanderCell buttonText="View policy">
          <Text type="xsmall-regular" color="extra-dark">
            {row.name}
          </Text>
        </OverlayExpanderCell>
      </BasicCell>
    ),
    sort: true,
    resize: true,
  },
  {
    key: 'violation_count',
    title: 'Violation',
    width: 120,
    sort: true,
    render: (_val, row, _idx) => {
      return <ViolationsBadge violations={row.violation_count} />;
    },
  },
];

export const violationColumns: RCTableExtendedColumnType<Violation>[] = [
  {
    key: 'id',
    title: 'Data source',
    width: 300,
    render: (_val, row, _idx) =>
      row?.datasources?.map(({ name, type }) => (
        <BaseBadge label={name} icon={type as any} />
      )),
  },
  {
    key: 'resource',
    title: 'Resource data',
    // width: 500,
    render: (_val, row, _idx) => {
      // @ts-expect-error wait
      const display = Object.entries(row.resource.identifier).map(
        ([key, val]) => `${key}: ${JSON.stringify(val)}`
      );
      return (
        <DataTableColLink to={`violation/details/${row.id}`}>
          <Flex sx={{ gap: '8px' }}>
            {display.map(displayed => (
              <BaseBadge label={displayed} />
            ))}
          </Flex>
        </DataTableColLink>
      );
    },
  },
  {
    key: 'resource_id',
    title: 'Type',
    width: 250,
    render: (_vla, { resource }, _idx) => {
      return (
        <ResourcesContext.Consumer>
          {resourceMap => (
            <BaseBadge
              label={resourceMap[resource.id!].description}
              icon={resourceMap[resource.id!].datasource_types?.[0] as any}
            />
          )}
        </ResourcesContext.Consumer>
      );
    },
  },
];
