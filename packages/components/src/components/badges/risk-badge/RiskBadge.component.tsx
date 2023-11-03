import React from 'react';
import { RiskDark } from '@secberus/icons';
import classNames from 'classnames';
import { SkeletonComponent } from '../../skeletons/Skeleton';
import { ColorProperties } from '../../../types';
import { StyledRiskBadge, RiskText } from './RiskBadge.styled';
interface RiskBadgeProps {
  riskScore: number;
  className?: string;
  isLoading?: boolean;
  dark?: boolean;
  light?: boolean;
  icon?: boolean;
  background?: ColorProperties;
  pill?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  riskScore,
  className,
  isLoading,
  dark,
  light,
  icon,
  background,
  pill = true,
}) => {
  if (isLoading) return <SkeletonComponent rounded width={80} height={32} />;
  return (
    <StyledRiskBadge
      background={background}
      className={classNames(className, { dark, light })}
      pill={pill}
    >
      {icon && <RiskDark height="20px" width="20px" />}
      <RiskText type="small-bold">{riskScore?.toFixed(2)}</RiskText>
    </StyledRiskBadge>
  );
};
