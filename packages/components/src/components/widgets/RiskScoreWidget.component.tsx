import React from 'react';
import styled from 'styled-components';
import { InfoLight } from '@secberus/icons';
import { Tooltip } from '../index';
import { WidgetContainer } from './widget-container/WidgetContainer.component';
import { RiskScoreSubwidget } from './risk-score/RiskScore.component';

const ColoredInfo = styled(InfoLight)`
  circle,
  path {
    stroke: #9d9db1;
  }
`;

const tooltipInfo =
  'Your Risk Score is a measurement of the deviation from the security baseline that you have set in Secberus. It measures the risk of specific policy violations, their age and your organizations ability to remediate all of the open violations. You have the ability to adjust the risk associated with specific policies in the policy editor.';

interface RiskScoreWidgetMain {
  score: number;
  title?: string;
  tooltip?: string;
}

export const RiskScoreWidget: React.FC<RiskScoreWidgetMain> = ({
  score,
  title = 'Risk score',
}) => {
  return (
    <>
      <WidgetContainer
        title={title}
        iconRight={
          <ColoredInfo
            height={18}
            width={18}
            data-tip={tooltipInfo}
            data-for="riskWidget"
          />
        }
      >
        <RiskScoreSubwidget score={score} />
      </WidgetContainer>
      <Tooltip id="riskWidget" longText />
    </>
  );
};
