import React from 'react';
import { Risk } from '@secberus/icons';
import { ErrorBoundary } from '../../../../../../utils/wrappers/ErrorBoundaries';
import { RISK_TOOLTIP_TEXT } from '../../../../../../constants/tooltips';
import { MetricBlockIndicator } from '../MetricIndicator/MetricIndicator.component';
import { MetricIndicatorProps } from '../MetricIndicator/MetricIndicator.types';
import { timeToRemediateReducer } from '../../utils/timeToRemediateReducer';
import { DashboardMetricBlockWrapper } from './MetricIndicatorGridList.styled';

const RiskTooltipIcon = <Risk color="#ffffff" width={24} height={24} />;

const metricIndicatorConfig: MetricIndicatorProps[] = [
  {
    metric: 'violationsOpen',
    header: 'Violations',
    hasColor: data => data?.trend !== 0,
    isInverted: true,
  },
  {
    metric: 'riskScore',
    header: 'Risk score',
    hasColor: data => data?.trend !== 0,
    decimalPlaces: 2,
    isInverted: true,
    minDataValue: 0,
    maxDataValue: 100,
    tooltipIcon: RiskTooltipIcon,
    tooltipText: RISK_TOOLTIP_TEXT,
  },
  {
    metric: 'policiesSubscribed',
    header: 'Policies enabled',
  },
  {
    metric: 'resourcesScanned',
    header: 'Resources covered',
  },
  {
    metric: 'violationsClosedRemediated',
    header: 'Remediations',
    hasColor: data => data?.trend !== 0,
  },
  {
    metric: 'timeToRemediate',
    header: 'Time to remediate',
    mutateCount: count => `${count}d`,
    hasColor: data => data?.trend !== 0,
    isInverted: true,
    reducer: timeToRemediateReducer,
  },
];

const MetricIndicatorGridList = () => {
  return (
    <div>
      <DashboardMetricBlockWrapper>
        {metricIndicatorConfig.map(props => {
          return <MetricBlockIndicator key={props.metric} {...props} />;
        })}
      </DashboardMetricBlockWrapper>
    </div>
  );
};

const WithErrorBoundary = () => (
  <ErrorBoundary>
    <MetricIndicatorGridList />
  </ErrorBoundary>
);

export { WithErrorBoundary as MetricIndicatorGridList };
