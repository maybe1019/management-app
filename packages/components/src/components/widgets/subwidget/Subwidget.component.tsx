import React from 'react';
import { SubwidgetContainer } from './Subwidget.styled';
import { SubwidgetContainerMain } from './Subwidget.types';

export const Subwidget: React.FC<SubwidgetContainerMain> = ({
  children,
  className,
}) => <SubwidgetContainer className={className}>{children}</SubwidgetContainer>;
