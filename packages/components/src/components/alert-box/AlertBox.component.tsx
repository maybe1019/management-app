import React from 'react';
import clsx from 'clsx';
import { Warning, Caution, InfoSolid, CheckBall } from '@secberus/icons';
import { Text } from '../text';
import { AlertBoxProps } from './AlertBox.types';
import { AlertBoxContainer, AlertBoxTextContainer } from './AlertBox.styled';

export const AlertBox = ({
  margin,
  type,
  title,
  message,
  withIcon = true,
}: AlertBoxProps) => {
  const Icon = React.useMemo(() => {
    switch (type) {
      case 'error':
        return Warning;
      case 'warning':
        return Caution;
      case 'info':
        return InfoSolid;
      case 'success':
        return CheckBall;
      default:
        return undefined;
    }
  }, [type]);

  return (
    <AlertBoxContainer
      margin={margin}
      className={clsx('alert-box', {
        error: type === 'error',
        warning: type === 'warning',
        info: type === 'info',
        success: type === 'success',
      })}
    >
      {Icon && withIcon && (
        <Icon className="alert-box__icon" width="24px" height="24px" />
      )}
      <AlertBoxTextContainer>
        <Text type="small-bold" color="dark">
          {title}
        </Text>
        <Text type="small-regular" color="dark">
          {message}
        </Text>
      </AlertBoxTextContainer>
    </AlertBoxContainer>
  );
};
