import React from 'react';
import { RiskLight } from '@secberus/icons';
import { RiskScoreMain } from './RiskScore.types';
import {
  RiskScoreCircle,
  RiskScoreContainer,
  RiskScoreDenotation,
} from './RiskScore.styled';

export const RiskScoreSubwidget: React.FC<RiskScoreMain> = ({
  score = 0,
  scoreOutOf = 100,
}) => (
  <RiskScoreContainer>
    <RiskScoreCircle score={score}>
      <RiskLight height={32} width={24} />
    </RiskScoreCircle>
    <RiskScoreDenotation>
      <p className="scoreValue">{score || 0}</p>
      <p className="scoreOutOf">{scoreOutOf}</p>
    </RiskScoreDenotation>
  </RiskScoreContainer>
);
