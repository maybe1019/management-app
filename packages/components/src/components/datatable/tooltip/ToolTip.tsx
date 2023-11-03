import React from 'react';
import { theme } from '../../../styles/theme';
import { Tooltip, TooltipLabel } from './ToolTip.styled';

interface BaseToolTipProps {
  longText?: boolean;
}

export const BaseToolTip: React.FC<BaseToolTipProps> = ({
  longText = false,
}) => (
  <Tooltip
    arrowColor={theme.colors['dark-gray']}
    effect="solid"
    id="overflowCol"
    className="styled-tooltip"
    delayShow={100}
    getContent={(datumAsText: string) => {
      if (datumAsText == null) return;
      return (
        <TooltipLabel className={longText ? 'longText' : ''}>
          {datumAsText}
        </TooltipLabel>
      );
    }}
  />
);
