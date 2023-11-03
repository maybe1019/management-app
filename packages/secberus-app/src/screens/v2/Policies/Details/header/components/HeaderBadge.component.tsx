import { Flex } from '@chakra-ui/react';
import React from 'react';
import { BaseBadge, Text } from '@secberus/components';

export type HeaderBadgeProps = {
  label?: string;
  badgeText?: string;
};

export const HeaderBadge: React.FC<HeaderBadgeProps> = ({
  label,
  badgeText = '',
  children,
}) => {
  return (
    <Flex wrap="wrap" direction="column" sx={{ gap: '8px' }}>
      {label && (
        <Text type="small-bold" color="gray">
          {label}
        </Text>
      )}
      {children ? (
        <Flex wrap="wrap">{children}</Flex>
      ) : (
        <BaseBadge label={badgeText} light />
      )}
    </Flex>
  );
};
