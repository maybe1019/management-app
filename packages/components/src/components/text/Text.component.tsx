import React from 'react';
import classNames from 'classnames';
import { StyledText } from './Text.styled';
import { TextProps } from './Text.types';

export const Text: React.FC<TextProps> = ({
  type = 'regular',
  className,
  children,
  color = 'dark',
  bold,
  align = 'initial',
}) => {
  return (
    <StyledText
      className={classNames(type, className)}
      color={color}
      bold={bold}
      type={type}
      align={align}
    >
      {children}
    </StyledText>
  );
};
