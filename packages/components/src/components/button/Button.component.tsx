import React from 'react';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';
import { Spinner } from '@chakra-ui/react';
import { Tooltip } from '..';
import {
  ButtonLoaderContainer,
  StyledButton,
  StyledLink,
} from './Button.styled';
import { ButtonProps } from './Button.types';

export const ButtonLoader = ({ size }: Pick<ButtonProps, 'size'>) => (
  <ButtonLoaderContainer className={size as string}>
    <Spinner className="btn-spinner" />
  </ButtonLoaderContainer>
);

export const Button: React.FC<ButtonProps> = ({
  children,
  id,
  disabled,
  onClick,
  variant = 'primary',
  className,
  isLoading,
  type = 'button',
  color,
  background,
  endIcon,
  icon,
  to,
  size = 'default',
  desc,
  ...rest
}) => {
  const linkProps = to ? { as: StyledLink, to } : {};
  const buttonId = id ?? uuid();

  return (
    <>
      <StyledButton
        id={buttonId}
        type={type}
        data-tip={desc}
        data-for={buttonId}
        className={classNames(
          variant,
          size,
          {
            disabled: disabled || isLoading,
            loading: isLoading,
            endIcon,
            icon,
          },
          className
        )}
        disabled={disabled}
        onClick={onClick}
        color={color}
        background={background}
        {...linkProps}
        {...rest}
      >
        {isLoading && <ButtonLoader size={size} />}
        {children}
      </StyledButton>
      {icon && desc && <Tooltip id={buttonId} place="bottom" />}
    </>
  );
};
