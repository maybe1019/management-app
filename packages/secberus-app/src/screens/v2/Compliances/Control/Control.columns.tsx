import React from 'react';
import {
  Text,
  SeverityBadge,
  ViolationsBadge,
  RCTableExtendedColumnType,
  BaseBadge,
  DataTableColLink,
} from '@secberus/components';
import { Policy, Violation } from '@secberus/services';
import { Flex } from '@chakra-ui/react';
import { ResourcesContext } from '../../../../app/core/wrappers/WithResources';
import { OverlayExpanderCell } from '../../../../components';

export const policyColumns: RCTableExtendedColumnType<Policy>[] = [
  {
    key: 'severity',
    title: 'Severity',
    width: 108,
    sort: true,
    resize: true,
    render: (_val, row, _idx) => {
      return (
        <SeverityBadge
          background="transparent"
          priorityNum={row.severity}
          type="xsmall-regular"
          color="extra-dark"
        />
      );
    },
  },
  {
    key: 'name',
    title: 'Policy',
    ellipsis: true,
    sort: true,
    render: (_val, row, _idx) => (
      <OverlayExpanderCell buttonText="View policy">
        <Text type="xsmall-regular" color="extra-dark">
          {row.name}
        </Text>
      </OverlayExpanderCell>
    ),
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
    render: (_val, row, _idx) => (
      <div>
        {row?.datasources?.map(({ name, type }) => (
          // @ts-expect-error bad type?
          <BaseBadge label={name} icon={type} />
        ))}
      </div>
    ),
  },
  {
    key: 'resource',
    title: 'Resource data',
    // width: 500,
    render: (_val, row, _idx) => {
      // @ts-expect-error bad type?
      const display = Object.entries(row.resource.identifier).map(
        ([key, val]) => `${key}: ${JSON.stringify(val)}`
      );
      return (
        <div>
          <DataTableColLink to={`violation/details/${row.id}`}>
            <Flex sx={{ gap: '8px' }}>
              {display.map(displayed => (
                <BaseBadge label={displayed} />
              ))}
            </Flex>
          </DataTableColLink>
        </div>
      );
    },
  },
  {
    key: 'resource_id',
    title: 'Type',
    render: (_val, { resource }, _idx) => {
      return (
        <ResourcesContext.Consumer>
          {resourceMap => (
            <div>
              <BaseBadge
                label={resourceMap[resource.id!].description}
                // @ts-expect-error bad type?
                icon={resourceMap[resource.id!].datasource_types[0]}
              />
            </div>
          )}
        </ResourcesContext.Consumer>
      );
    },
  },
];
