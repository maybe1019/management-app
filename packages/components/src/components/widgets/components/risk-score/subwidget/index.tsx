import React from 'react';
import { Risk, RiskLight } from '@secberus/icons';
import { RiskScoreMain } from '../RiskScore.types';
import {
  RiskScoreCircle,
  RiskScoreContainer,
  RiskScoreCircleContainer,
  RiskScoreTrendContainer,
  RiskScoreDenotation,
} from '../RiskScore.styled';
import { TrendChart } from '../../../../charts';

export const RiskScoreSubwidget: React.FC<RiskScoreMain> = ({
  score = 0,
  scoreOutOf = 100,
  trendData = [],
  showTrendChart,
}) => (
  <RiskScoreContainer>
    <RiskScoreCircleContainer>
      <RiskScoreCircle score={score}>
        <RiskLight height={32} width={24} />
      </RiskScoreCircle>
      <RiskScoreDenotation>
        <p className="scoreValue">{score.toFixed(2) || 0}</p>
        <p className="scoreOutOf">{scoreOutOf}</p>
      </RiskScoreDenotation>
    </RiskScoreCircleContainer>
    {showTrendChart && (
      <RiskScoreTrendContainer>
        <TrendChart
          data={trendData}
          minDataValue={0}
          maxDataValue={100}
          referenceLines={[0, 50, 100]}
          tooltipIcon={<Risk color="#ffffff" width={24} height={24} />}
          tooltipDataStringModifiers={{
            decimalPlaces: 2,
          }}
        />
      </RiskScoreTrendContainer>
    )}
  </RiskScoreContainer>
);
