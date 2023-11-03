import React from 'react';
import { StyledLogo } from './Logo.styled';
import { LogoProps } from './Logo.types';

export const Logo: React.FC<LogoProps> = ({ children, to, onClick }) => (
  <StyledLogo to={to} onClick={onClick}>
    {children}
  </StyledLogo>
);
