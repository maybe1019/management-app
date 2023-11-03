import React from 'react';
import { Text } from '../text/Text.component';
import { BrandingMain } from './Branding.types';
import { Wrapper } from './Branding.styled';

export const Branding: React.FC<BrandingMain> = ({
  children,
  title,
  className,
}) => {
  return (
    <Wrapper id="branding_header" className={className}>
      <Text type="medium">{title}</Text>
      {children}
    </Wrapper>
  );
};
