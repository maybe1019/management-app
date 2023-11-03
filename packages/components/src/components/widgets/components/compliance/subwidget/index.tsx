import React from 'react';
import { ComplianceWidgetMain } from '../Compliance.types';
import {
  ComplianceContainer,
  ComplianceDonutContainer,
  ComplianceTrendContainer,
} from '../Compliance.styled';
import { PercentageDonut, TrendChart } from '../../../../';

export const ComplianceSubwidget: React.FC<ComplianceWidgetMain> = ({
  compliance = 0,
  trendData,
  showTrendChart,
}) => (
  <ComplianceContainer showTrendChart={showTrendChart}>
    <ComplianceDonutContainer>
      <PercentageDonut percent={compliance} useGradientColors />
    </ComplianceDonutContainer>
    {showTrendChart && (
      <ComplianceTrendContainer>
        <TrendChart
          data={trendData}
          minDataValue={0}
          maxDataValue={100}
          referenceLines={[0, 50, 100]}
          tooltipDataStringModifiers={{ append: '%' }}
        />
      </ComplianceTrendContainer>
    )}
  </ComplianceContainer>
);
