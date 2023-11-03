import React from 'react';
import {
  AmazonAwsLight,
  AzureLight,
  GoogleCloudPlatformLight,
} from '@secberus/icons';
import { Text } from '../../../index';
import { HeaderProps } from './Header.types';
import { HeaderContainer } from './Header.styled';

export const Icons = {
  AWS: AmazonAwsLight,
  AZ: AzureLight,
  GCP: GoogleCloudPlatformLight,
};

export const Header: React.FC<HeaderProps> = ({ provider, name }) => {
  const Component = Icons[provider];

  return (
    <HeaderContainer>
      <Component />
      <Text type="small-bold">{name}</Text>
    </HeaderContainer>
  );
};
