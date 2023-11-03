import React from 'react';
import { RiskBadge, Link, Text } from '@secberus/components';
import { Flex } from '@chakra-ui/react';
import { Datasource } from '@secberus/services';
import { AnyFn } from '@secberus/utils';
import { DataSourceIcon, DataSourceTypeId } from '../../../datasources';

export const DataSourceRiskRow: React.FC<
  Datasource & { to: string; onClick?: AnyFn }
> = ({ name, datasource_type_id, score, to, onClick }) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      sx={{ gap: '8px' }}
    >
      <Link onClick={onClick} to={to}>
        <Flex sx={{ gap: '8px' }} alignItems="center">
          <DataSourceIcon
            type={datasource_type_id.toLowerCase() as DataSourceTypeId}
            height="24px"
            width="24px"
          />
          <Text type="small-regular" color="dark-gray">
            {name}
          </Text>
        </Flex>
      </Link>
      <RiskBadge riskScore={score || 0} pill />
    </Flex>
  );
};
