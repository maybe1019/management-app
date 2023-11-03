import React, { TdHTMLAttributes } from 'react';
import { Text, RCTableExtendedColumnType } from '@secberus/components';
import { Box, Flex } from '@chakra-ui/react';
import { ChildrenLogs, ChildType } from '../types/ActivityLog.types';
import { DateCell } from '../../../components/Cells/DateCell/DateCell.component';
import { ActivityLogDropdown } from './dropdown';

// const COLUMN_HEIGHT: number = 81;

export const columns: RCTableExtendedColumnType<ChildrenLogs>[] = [
  {
    key: 'timestamp',
    title: 'Timestamp',
    sort: true,
    width: 180,
    onCell: row => {
      const props: TdHTMLAttributes<HTMLTableCellElement> = {};
      // @ts-expect-error Difficult to type
      if (row?.isChild) {
        props.colSpan = 3;
      } else {
        // props.height = 82;
      }
      return props;
    },
    render: (_val, row, _idx) => {
      // @ts-expect-error Difficult to type due to inconsistencies per row.
      if (row.isChild) {
        return <ActivityLogDropdown {...(row as unknown as ChildType)} />;
      }

      return (
        <Flex h="100%" alignItems="center">
          <DateCell
            format={'YYYY-MM-DD\nHH:mm:ss (Z)'}
            datetime={row.time}
            textProps={{ type: 'xsmall-regular', color: 'extra-dark' }}
          />
        </Flex>
      );
    },
  },
  {
    key: 'eventtype',
    title: 'Event type',
    sort: true,
    width: 240,
    ellipsis: true,
    onCell: row => {
      const props: TdHTMLAttributes<HTMLTableCellElement> = {};
      // @ts-expect-error Difficult to type
      if (row?.isChild) {
        props.colSpan = 0;
      } else {
        // props.height = 81;
      }
      return props;
    },
    render: (_val, row, _idx) => (
      <Text type="xsmall-regular" color="extra-dark">
        {row.event_type}
      </Text>
    ),
  },
  {
    key: 'message',
    title: 'Message',
    width: 600,
    ellipsis: true,
    onCell: row => {
      const props: TdHTMLAttributes<HTMLTableCellElement> = {};
      // @ts-expect-error Difficult to type
      if (row?.isChild) {
        props.colSpan = 0;
      } else {
        // props.height = 81;
      }
      return props;
    },
    render: (_val, row, _idx) => (
      <Box whiteSpace="nowrap">
        <Text type="xsmall-regular" color="extra-dark">
          {row.message}
        </Text>
      </Box>
    ),
  },
];
