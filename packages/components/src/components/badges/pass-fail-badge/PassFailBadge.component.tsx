import React from 'react';
import { CheckBall, CheckMarkLight, ErrorBall } from '@secberus/icons';
import { Text } from '../../index';
import { SkeletonComponent } from '../../skeletons/Skeleton';
import { BaseBadge } from '../base-badge/BaseBadge.component';
import { BadgeContainer } from './PassFailBadge.styled';
import { PassFailBadgeProps } from './PassFailBadge.types';

export const PassFailBadge: React.FC<PassFailBadgeProps> = ({
  pass = 0,
  fail = 0,
  isLoading,
  variant = 'base',
}) => {
  if (isLoading) return <SkeletonComponent width={120} height={25} rounded />;
  if (variant === 'icon')
    return (
      <BaseBadge light>
        <ErrorBall />
        {fail} Fail &nbsp;
        <CheckBall />
        {pass} Pass
      </BaseBadge>
    );

  if (variant === 'colorful') {
    return (
      <BadgeContainer>
        {fail ? (
          <>
            <Text type="small-bold" color="red">{`${fail} fail`}</Text>
            <Text type="small-bold" color="dark">
              &nbsp; / &nbsp;
            </Text>
            <Text type="small-bold" color="blue">{` ${pass} pass`}</Text>
          </>
        ) : (
          <>
            <CheckMarkLight height="24px" width="24px" /> All pass
          </>
        )}
      </BadgeContainer>
    );
  }

  return (
    <BadgeContainer>
      <>
        <Text type="small-bold">{`${fail} fail`}</Text>
        <Text type="small-bold">&nbsp; / &nbsp;</Text>
        <Text type="small-bold">{` ${pass} pass`}</Text>
      </>
    </BadgeContainer>
  );
};
