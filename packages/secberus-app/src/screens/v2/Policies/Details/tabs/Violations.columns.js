import React from 'react';
import moment from 'moment';
import { theme, Checkbox, BaseBadge, Text } from '@secberus/components';
import {} from 'styled-components/macro';
import { Flex } from '@chakra-ui/react';
import { Exception, Violation } from '@secberus/icons';
import { OverlayExpanderCell } from '../../../../../components';

/**
 * The violation table columns.
 * @param onSelectAll
 * @param onChange
 * @param entities
 * @param omitColumns - columns (by key) to remove from the table
 */
export const useColumns = ({
  selectProps: { onSelectAll, onChange, entities },
  omitColumns = [],
}) => {
  return React.useMemo(
    () =>
      [
        {
          key: 'select',
          dataIndex: 'select',
          width: 46,
          fixed: true,
          sort: false,
          render: (_val, row) => (
            <Checkbox
              id={row.id}
              onChange={onChange}
              checked={row.selected}
              gutterBottom={false}
            />
          ),
        },
        {
          key: 'datasources',
          dataIndex: 'datasources',
          title: 'Data sources',
          ellipsis: true,
          resize: true,
          fixed: true,
          sort: false,
          render: (_val, row) => (
            <OverlayExpanderCell buttonIcon="expand">
              {row?.datasources?.map(({ name, type }) => (
                <BaseBadge
                  className={row.suppressed ? 'suppressedViolation' : undefined}
                  iconMap="datasource"
                  icon={type.toLowerCase()}
                  transparent
                >
                  <Text type="xsmall-regular" color="extra-dark">
                    {name}
                  </Text>
                </BaseBadge>
              ))}
            </OverlayExpanderCell>
          ),
        },
        {
          key: 'create_timestamp',
          dataIndex: 'create_timestamp',
          title: 'Exposure',
          width: 104,
          resize: true,
          ellipsis: true,
          sort: true,
          render: (_val, row) => {
            const exposure = moment.unix(row.create_timestamp).fromNow(true);
            return (
              <Text type="xsmall-regular" color="extra-dark">
                {exposure}
              </Text>
            );
          },
        },
        {
          key: 'seen_timestamp',
          dataIndex: 'seen_timestamp',
          title: 'Last detected',
          width: 150,
          resize: true,
          ellipsis: true,
          sort: true,
          render: (_val, row) => {
            const exposure = moment.unix(row.seen_timestamp).fromNow(true);
            return (
              <Text type="xsmall-regular" color="extra-dark">
                {exposure}
              </Text>
            );
          },
        },
        {
          key: 'suppressed',
          dataIndex: 'suppressed',
          title: 'Status',
          width: 185,
          resize: true,
          ellipsis: true,
          sort: true,
          render: (_val, row) => (
            <Flex align="center">
              {!row.exception_id && row.suppressed ? (
                <>
                  <Exception color={theme.colors.gray} font-size="20px" />
                  <Text type="xsmall-regular" color="extra-dark">
                    &nbsp;Manual Exception
                  </Text>
                </>
              ) : row.exception_id ? (
                <>
                  <Exception stroke={theme.colors.gray} font-size="20px" />
                  <Text type="xsmall-regular" color="extra-dark">
                    &nbsp;Exception
                  </Text>
                </>
              ) : (
                <>
                  <Violation color={theme.colors.red} font-size="20px" />
                  <Text type="xsmall-regular" color="extra-dark">
                    &nbsp;Active
                  </Text>
                </>
              )}
            </Flex>
          ),
        },
        {
          key: 'resource_data',
          dataIndex: 'resource_data',
          title: 'Resource identifier',
          width: 450,
          resize: true,
          ellipsis: true,
          render: (_val, row) => {
            const display = Object.entries(row.resource?.identifier ?? {}).map(
              ([key, val]) => `${key}: ${JSON.stringify(val)}`
            );
            return (
              <Flex sx={{ gap: '10px' }}>
                {display.map(displayed => (
                  <Text type="xsmall-regular" color="extra-dark">
                    {displayed}
                  </Text>
                ))}
              </Flex>
            );
          },
        },
      ].filter(o => !omitColumns.includes(o.key)),
    [omitColumns, onChange]
  );
};
