import React from 'react';
import { Policy } from '@secberus/icons';
import classNames from 'classnames';
import { Text } from '../../index';
import { SkeletonComponent } from '../../skeletons/Skeleton';
import { Container } from './PolicyBadge.styled';

interface PolicyBadge {
  className?: string;
  isLoading?: boolean;
  count: number;
  size?: 'default' | 'small';
}

export const PolicyBadge: React.FC<PolicyBadge> = ({
  isLoading,
  count = 0,
  className,
  size = 'default',
}) => {
  return isLoading ? (
    <SkeletonComponent width={80} height={30} rounded />
  ) : (
    <Container className={classNames(className, size)}>
      <Policy height={24} width={24} />
      <Text type="small-bold">{count} policies</Text>
    </Container>
  );
};
