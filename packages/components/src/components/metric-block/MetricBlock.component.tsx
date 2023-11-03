import React from 'react';
import { Tooltip } from '../tooltip';
import {
  Container,
  HeaderTextContainer,
  HeaderText,
  ColoredInfoIcon,
} from './MetricBlock.styled';
import { MetricBlockProps } from './MetricBlock.types';
import { TrendIndicator } from './TrendIndicator/TrendIndicator.component';

export const MetricBlock: React.FC<MetricBlockProps> = ({
  header,
  count,
  trend,
  countDecimalPlaces = 0,
  trendDecimalPlaces = 1,
  timePeriod = '30d',
  hasColor = false,
  isInverted = false,
  isLoading = false,
  children,
  tooltipText,
}) => {
  return (
    <Container>
      <HeaderTextContainer>
        <HeaderText>
          {header}
          {tooltipText && (
            <>
              <ColoredInfoIcon
                width={18}
                height={18}
                data-tip={tooltipText}
                data-for={`${header}-metric-explainer-icon`}
              />
              <Tooltip id={`${header}-metric-explainer-icon`} />
            </>
          )}
        </HeaderText>
        <TrendIndicator
          count={count}
          trend={trend}
          countDecimalPlaces={countDecimalPlaces}
          trendDecimalPlaces={trendDecimalPlaces}
          timePeriod={timePeriod}
          hasColor={hasColor}
          isInverted={isInverted}
          isLoading={isLoading}
        />
      </HeaderTextContainer>
      {!isLoading && children}
    </Container>
  );
};
