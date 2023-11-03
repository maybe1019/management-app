import React from 'react';
import { WidgetContainerComponentMain } from './WidgetContainer.types';
import { StyledWidgetContainer, WidgetTitle } from './WidgetContainer.styled';

export const WidgetContainer: React.FC<WidgetContainerComponentMain> = ({
  title,
  className,
  children,
  iconRight = null,
}) => {
  return (
    <StyledWidgetContainer className={`${className} widgetOuter`}>
      <WidgetTitle>
        {title}
        {iconRight}
      </WidgetTitle>
      {children}
    </StyledWidgetContainer>
  );
};
