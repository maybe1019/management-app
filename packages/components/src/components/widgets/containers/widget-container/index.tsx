import React from 'react';
import styled from 'styled-components';
import { InfoLight } from '@secberus/icons';
import { Tooltip } from '../../../';
import { WidgetContainerComponentMain } from './WidgetContainer.types';
import {
  StyledWidgetContainer,
  WidgetHeader,
  WidgetTitle,
} from './WidgetContainer.styled';

const ColoredInfo = styled(InfoLight)`
  circle,
  path {
    stroke: #9d9db1;
  }
`;

export const WidgetContainer: React.FC<WidgetContainerComponentMain> = ({
  title,
  className,
  children,
  showTooltip,
  tooltipText,
  tooltipProps,
  componentRight = null,
}) => {
  return (
    <StyledWidgetContainer className={`${className} widgetOuter`}>
      <WidgetHeader>
        <WidgetTitle>
          {title}
          {showTooltip && (
            <ColoredInfo
              height={18}
              width={18}
              data-tip={tooltipText}
              data-for={`widget-${title}`}
            />
          )}
        </WidgetTitle>
        {componentRight}
      </WidgetHeader>
      {children}
      <Tooltip id={`widget-${title}`} longText {...tooltipProps} />
    </StyledWidgetContainer>
  );
};
