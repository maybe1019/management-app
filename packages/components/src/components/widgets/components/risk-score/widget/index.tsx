import React from 'react';
import { WidgetContainer } from '../../../containers';
import { RiskScoreSubwidget } from '../subwidget';
import { Text } from '../../../../text';
import { TrendChartData } from '../../../../charts';

const tooltipInfo =
  'Your Risk Score is a measurement of the deviation from the security baseline that you have set in Secberus. It measures the risk of specific policy violations, their age and your organizations ability to remediate all of the open violations. You have the ability to adjust the risk associated with specific policies in the policy editor.';

export interface RiskScoreWidgetMain {
  score: number;
  title?: string;
  tooltip?: string;
  dataDurationText?: string;
  trendData?: TrendChartData;
  showTrendChart?: boolean;
}

export const RiskScoreWidget: React.FC<RiskScoreWidgetMain> = ({
  score,
  title = 'Risk score',
  tooltip = tooltipInfo,
  dataDurationText,
  trendData,
  showTrendChart = true,
}) => {
  return (
    <WidgetContainer
      title={title}
      showTooltip
      tooltipText={tooltip}
      componentRight={
        <Text className="trend-text" type="xsmall-bold" color="gray">
          {dataDurationText}
        </Text>
      }
    >
      <RiskScoreSubwidget
        score={score}
        trendData={trendData}
        showTrendChart={showTrendChart}
      />
    </WidgetContainer>
  );
};
