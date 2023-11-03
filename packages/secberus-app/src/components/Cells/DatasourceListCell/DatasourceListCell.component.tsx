import React from 'react';
import { BadgeIcon, BaseBadge } from '@secberus/components';
import { Flex } from '@chakra-ui/react';

export interface DatasourceListCellProps {
  types?: string[];
  emptyText?: string;
}

export const DatasourceListCell = ({
  types = [],
  emptyText = '-',
}: DatasourceListCellProps) => {
  const list = React.useMemo(() => Array.from(types).sort(), [types]);
  return (
    <Flex align="center" flexWrap="nowrap" sx={{ gap: 8 }}>
      {list.length > 0
        ? list.map(type => (
            <BaseBadge
              key={type}
              iconMap="datasource"
              background="transparent"
              icon={type as BadgeIcon}
              padding="0px"
            />
          ))
        : emptyText}
    </Flex>
  );
};
