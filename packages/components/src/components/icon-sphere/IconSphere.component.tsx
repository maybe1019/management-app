import React from 'react';
import { IconSphereProps } from './IconSphere.types';
import { StyledIconSphere } from './IconSphere.styled';

export const IconSphere: React.FC<IconSphereProps> = ({
  background,
  children,
}) => {
  return (
    <StyledIconSphere background={background}>{children}</StyledIconSphere>
  );
};
