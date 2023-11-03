import React from 'react';
import { Text, RCTableExtendedColumnType } from '@secberus/components';
import { Org } from '@secberus/services';
import { Flex } from '@chakra-ui/react';
import { OverlayExpanderCell } from '../../../components';

export const columns: RCTableExtendedColumnType<Org>[] = [
  {
    key: 'name',
    title: 'Name',
    sort: true,
    resize: true,
    render: (_val, row, _idx) => {
      return (
        <OverlayExpanderCell buttonIcon="pen">
          <Text type="xsmall-regular" color="extra-dark">
            {row.name}
          </Text>
        </OverlayExpanderCell>
      );
    },
  },
  {
    key: 'datasource_count',
    title: 'Data sources',
    sort: true,
    width: 115,
    render: (_val, row, _idx) => {
      return (
        <Flex align="center" justify="center" width="100%">
          <Text type="xsmall-regular" color="extra-dark">
            {row.datasource_count}
          </Text>
        </Flex>
      );
    },
  },
  {
    key: 'user_count',
    title: (
      <Flex align="center" justify="center" width="100%">
        <Text type="xsmall-bold" color="gray">
          Members
        </Text>
      </Flex>
    ),
    sort: true,
    width: 115,
    render: (_val, row, _idx) => {
      return (
        <Flex align="center" justify="center" width="100%">
          <Text type="xsmall-regular" color="extra-dark">
            {row.user_count}
          </Text>
        </Flex>
      );
    },
  },
];
