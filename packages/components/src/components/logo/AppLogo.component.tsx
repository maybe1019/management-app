import React from 'react';
import { SecberusLogoDark } from '@secberus/icons';
import { Text } from '../text';
import { Logo } from './Logo.component';
import { LogoProps } from './Logo.types';

export const AppLogo: React.FC<LogoProps> = ({ to }) => (
  <Logo to={to}>
    <SecberusLogoDark height={24} width={124} />
  </Logo>
);

export const AdminAppLogo: React.FC<LogoProps> = ({ to }) => (
  <Logo to={to}>
    <Text type="xsmall" bold>
      Secberus Admin
    </Text>
  </Logo>
);
