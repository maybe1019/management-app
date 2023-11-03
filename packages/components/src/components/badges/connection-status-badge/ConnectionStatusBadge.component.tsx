import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Text } from '../../text';
import { RESOURCE_LOGO_BY_DATASOURCE_CONNECTION_STATUS } from '../../../constants';
import {
  ConnectionStatusBadgeProps,
  ConnectionStatusIconSizeMap,
  ConnectionStatusIconSizeVariant,
} from './ConnectionStatusBadge.types';
import { IconContainer, TextContainer } from './ConnectionStatusBadge.styled';

const ICON_SIZE_MAP: Record<
  ConnectionStatusIconSizeVariant,
  ConnectionStatusIconSizeMap
> = {
  small: {
    icon: 20,
    iconContainer: 32,
  },
  medium: {
    icon: 24,
    iconContainer: 40,
  },
};

export const ConnectionStatusBadge = ({
  type = 'success',
  iconSize = 'small',
  iconTextSpacing = 16,
  status: { message, reason },
  statusMessageTextProps,
  statusReasonTextProps,
}: ConnectionStatusBadgeProps): JSX.Element => {
  const Icon = RESOURCE_LOGO_BY_DATASOURCE_CONNECTION_STATUS[type];
  const iconSizeObject =
    typeof iconSize === 'string' ? ICON_SIZE_MAP[iconSize] : iconSize;
  const IconProps = {
    width: iconSizeObject.icon,
    height: iconSizeObject.icon,
  };
  return (
    <Flex alignItems="center" sx={{ gap: iconTextSpacing }}>
      <IconContainer type={type} size={iconSizeObject.iconContainer}>
        <Icon {...IconProps} />
      </IconContainer>
      <TextContainer>
        <Text
          type="xsmall-regular"
          color="extra-dark"
          {...statusMessageTextProps}
        >
          {message}
        </Text>
        {reason && (
          <Text
            type="xsmall-regular"
            color="extra-dark"
            {...statusReasonTextProps}
          >
            {reason}
          </Text>
        )}
      </TextContainer>
    </Flex>
  );
};
