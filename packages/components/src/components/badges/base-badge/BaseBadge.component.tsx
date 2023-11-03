import React from 'react';
import classNames from 'classnames';
import { ServiceDisabled, ServiceSuccess, ServiceError } from '@secberus/icons';
import { SkeletonComponent } from '../../skeletons/Skeleton';
import {
  RESOURCE_LOGO_BY_DATASOURCE,
  RESOURCE_LOGO_BY_INTEGRATION,
  RESOURCE_LOGO_BY_POLICY_COLLECTION_STATUS,
  RESOURCE_LOGO_BY_TYPE,
} from '../../../constants';
import { StyledBaseBadge, LogoWrapper } from './BaseBadge.styled';
import { BaseBadgeProps } from './BaseBadge.types';

// All keys need to be lower case.
export const BaseBadgeIconMap = {
  default: {
    warning: ServiceDisabled,
    success: ServiceSuccess,
    fail: ServiceError,
  },
  datasource: RESOURCE_LOGO_BY_DATASOURCE,
  resource: RESOURCE_LOGO_BY_TYPE,
  integration: RESOURCE_LOGO_BY_INTEGRATION,
  'policy-collection-status': RESOURCE_LOGO_BY_POLICY_COLLECTION_STATUS,
};

export const BaseBadge: React.FC<BaseBadgeProps> = ({
  label,
  children,
  iconMap = 'default',
  icon,
  className,
  color,
  background,
  transparent,
  isLoading = false,
  skeletonWidth = 120,
  skeletonHeight = 32,
  dark,
  light,
  badgeColor,
  padding = '4px 12px',
  iconColor,
  pill,
  typography,
}) => {
  const getIcon = () => {
    if (icon) {
      const LogoComponent =
        // @ts-expect-error poorly typed
        BaseBadgeIconMap[iconMap][icon.toLowerCase()] || React.Fragment;
      return (
        <LogoWrapper
          className={iconColor ? 'iconColor' : ''}
          iconColor={iconColor}
        >
          <LogoComponent height="20px" width="20px">
            {label}
          </LogoComponent>
        </LogoWrapper>
      );
    }
    return React.Fragment;
  };
  return isLoading ? (
    <SkeletonComponent rounded width={skeletonWidth} height={skeletonHeight} />
  ) : (
    <StyledBaseBadge
      className={classNames(className, { transparent, pill })}
      dark={dark}
      light={light}
      badgeColor={badgeColor}
      background={background}
      color={color}
      padding={padding}
      typography={typography}
    >
      {icon && getIcon()} {label} {children}
    </StyledBaseBadge>
  );
};
