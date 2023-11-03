import React from 'react';
import { Spinner } from '@chakra-ui/react';
import { ArrowTop, ArrowDown, Minus } from '@secberus/icons';
import { formatNumberWithCommas } from '@secberus/utils';
import { Text } from '../../';
import { NoDataBlock } from '../NoDataBlock/NoDataBlock.component';
import {
  MetricCount,
  MetricSummaryRow,
  MetricTrend,
  MetricTrendText,
  TextContainer,
  InfoLoadWrapper,
  SpinnerWrapper,
} from './TrendIndicator.styled';
import { TrendIndicatorProps } from './TrendIndicator.types';

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({
  count,
  trend,
  countDecimalPlaces = 0,
  trendDecimalPlaces = 0,
  timePeriod,
  hasColor,
  isInverted,
  isLoading,
}) => {
  if (isLoading || typeof trend !== 'number' || typeof count === 'undefined')
    return (
      <InfoLoadWrapper>
        {isLoading ? (
          <SpinnerWrapper>
            <Spinner width={24} height={24} />
          </SpinnerWrapper>
        ) : (
          <NoDataBlock />
        )}
      </InfoLoadWrapper>
    );

  if (trend === 0) {
    return (
      <MetricSummaryRow>
        <MetricCount>
          {typeof count === 'number'
            ? formatNumberWithCommas(count, countDecimalPlaces)
            : count}
        </MetricCount>
        <MetricTrend noChange>
          <Minus />
          <TextContainer>
            <MetricTrendText>0.0% </MetricTrendText>
            <Text type="small-regular">{timePeriod}</Text>
          </TextContainer>
        </MetricTrend>
      </MetricSummaryRow>
    );
  }

  const arrowDirection = trend! > 0 ? 'up' : 'down';

  return (
    <MetricSummaryRow>
      <MetricCount>
        {typeof count === 'number'
          ? formatNumberWithCommas(count, countDecimalPlaces)
          : count}
      </MetricCount>
      <MetricTrend
        hasColor={hasColor}
        isInverted={isInverted}
        arrowDirection={arrowDirection}
      >
        {arrowDirection === 'up' ? (
          <ArrowTop height={16} width={16} />
        ) : (
          <ArrowDown height={16} width={16} />
        )}
        <MetricTrendText>
          {arrowDirection === 'up' && '+'}
          {trend.toFixed(trendDecimalPlaces)}% {timePeriod}
        </MetricTrendText>
      </MetricTrend>
    </MetricSummaryRow>
  );
};
