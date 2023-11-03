import React from 'react';
import { CheckBall, ErrorBall, NullBall } from '@secberus/icons';
import { Text } from '../../text';
import { SkeletonComponent } from '../../skeletons/Skeleton';
import { ColorProperties, TypographyProperties } from '../../../types';
import { StyledBadge } from './StatusBadge.styled';

interface StatusBadgeProps {
  passing: 'passing' | 'failing' | 'indeterminate';
  className?: string;
  rounded?: boolean;
  transparent?: boolean;
  isLoading?: boolean;
  skeletonWidth?: number;
  skeletonHeight?: number;
  type?: TypographyProperties;
  color?: ColorProperties;
}
type IndicatorTypes = Record<
  StatusBadgeProps['passing'],
  [icon: React.ElementType, text: string]
>;

const IndicatorOptions: IndicatorTypes = {
  passing: [CheckBall, 'Pass'],
  failing: [ErrorBall, 'Fail'],
  indeterminate: [NullBall, 'N/A'],
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  passing,
  className,
  isLoading,
  type = 'small-bold',
  color = 'extra-dark',
}) => {
  const [Indicator, IndicatorText] = IndicatorOptions[passing];
  return isLoading ? (
    <SkeletonComponent width={80} height={30} rounded />
  ) : (
    <StyledBadge className={className}>
      <Indicator height="24px" width="24px" />
      <Text type={type} color={color}>
        {IndicatorText}
      </Text>
    </StyledBadge>
  );
};
