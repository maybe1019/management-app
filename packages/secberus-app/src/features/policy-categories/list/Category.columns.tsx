import React from 'react';
import { Text, RCTableExtendedColumnType } from '@secberus/components';
import type { PolicyCategory } from '@secberus/services';
import { Flex } from '@chakra-ui/react';
import { OverlayExpanderCell } from '../../../components';
import { AuthorCell } from '../../../components/Cells/AuthorCell';

export const categoryColumms: RCTableExtendedColumnType<PolicyCategory>[] = [
  {
    key: 'name',
    title: 'Name',
    sort: true,
    render: (_val, { name, secberus_managed }, _idx) => {
      if (secberus_managed) return <Text type="xsmall-regular">{name}</Text>;
      return (
        <OverlayExpanderCell buttonIcon="pen">
          <Text type="xsmall-regular" color="extra-dark">
            {name}
          </Text>
        </OverlayExpanderCell>
      );
    },
  },
  {
    key: 'secberus_managed',
    title: 'Author',
    width: 250,
    sort: true,
    render: (_val, { secberus_managed }, _idx) => (
      <AuthorCell
        secberusManaged={secberus_managed}
        textProps={{ type: 'xsmall-regular', color: 'extra-dark' }}
      />
    ),
  },
  {
    key: 'policy_count',
    title: (
      <Flex align="center" justify="center" width="100%">
        <Text type="xsmall-bold" color="gray">
          Policies
        </Text>
      </Flex>
    ),
    width: 116,
    sort: false, // not currently possible
    // @ts-expect-error policy_count not typed on GW
    render: (_val, { policy_count }, _idx) => (
      <Flex align="center" justify="center" width="100%">
        <Text type="xsmall-regular" color="extra-dark">
          {policy_count}
        </Text>
      </Flex>
    ),
  },
] as RCTableExtendedColumnType<PolicyCategory>[];
