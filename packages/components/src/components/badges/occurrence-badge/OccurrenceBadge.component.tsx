import React from 'react';
import { InfoLight } from '@secberus/icons';
import classNames from 'classnames';
import { Text } from '../../index';
import { SkeletonComponent } from '../../skeletons/Skeleton';
import { StyledViolationsBadge } from './OccurrenceBadge.styled';

interface ViolationsBadgeProps {
  violations?: number;
  className?: string;
  isLoading?: boolean;
  withViolations?: boolean;
  dark?: boolean;
  light?: boolean;
}

export const OccurrenceBadge: React.FC<ViolationsBadgeProps> = ({
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
      className={classNames(className, { dark, light })}
      violations={violations}
    >
      <InfoLight width="20px" height="20px" />
      {withViolations ? (
        <Text type="small-bold">{`${violations} ${
          violations === 1 ? 'occurrence' : 'occurrences'
        }`}</Text>
      ) : (
        <Text type="small-bold">{violations}</Text>
      )}
    </StyledViolationsBadge>
  );
};
