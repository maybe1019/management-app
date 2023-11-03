import React from 'react';
import { ViolationLight } from '@secberus/icons';
import classNames from 'classnames';
import { Text } from '../../index';
import { SkeletonComponent } from '../../skeletons/Skeleton';
import { StyledViolationsBadge } from './ViolationsBadge.styled';

interface ViolationsBadgeProps {
  violations?: number;
  className?: string;
  isLoading?: boolean;
  withViolations?: boolean;
  dark?: boolean;
  light?: boolean;
}

export const ViolationsBadge: React.FC<ViolationsBadgeProps> = ({
  violations = 0,
  className,
  isLoading = false,
  withViolations,
  light,
  dark,
}) => {
  return isLoading ? (
    <SkeletonComponent width={withViolations ? 130 : 80} height={32} rounded />
  ) : (
    <StyledViolationsBadge
      className={classNames(className, { dark, light }, 'pill')}
      violations={violations}
    >
      <ViolationLight />
      {withViolations ? (
        <Text type="xsmall-bold">{`${violations} ${
          violations === 1 ? 'violation' : 'violations'
        }`}</Text>
      ) : (
        <Text type="small-bold">{violations}</Text>
      )}
    </StyledViolationsBadge>
  );
};
