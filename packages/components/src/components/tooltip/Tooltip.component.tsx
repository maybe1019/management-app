import React from 'react';
import { theme } from '../../styles/theme';
import { StyledTooltip, TooltipLabel } from './Tooltip.styled';
import { ToolTipProps } from './Tooltip.types';
import { TooltipPortal } from './tooltip-portal/TooltipPortal.component';

export const Tooltip: React.FC<ToolTipProps> = ({
  id,
  place = 'right',
  longText = false,
  usePortal = false,
}) => {
  return (
    <TooltipPortal usePortal={usePortal}>
      <StyledTooltip
        arrowColor={theme.colors['dark-gray']}
        className="styled-tooltip"
        id={id}
        place={place}
        getContent={(datumAsText: string) => {
          if (datumAsText == null) return;
          return (
            <TooltipLabel className={longText ? 'longText' : ''}>
              {datumAsText}
            </TooltipLabel>
          );
        }}
      />
    </TooltipPortal>
  );
};
