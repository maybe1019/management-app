import React from 'react';
import { CheckBall, ErrorBall, PolicyLight } from '@secberus/icons';
import { Subwidget } from '../subwidget/Subwidget.component';
import { PoliciesWidgetMain } from './Policies.types';
import {
  PoliciesCircle,
  PoliciesContainer,
  PoliciesScoreContainer,
} from './Policies.styled';

export const PoliciesSubwidget: React.FC<PoliciesWidgetMain> = ({
  numPoliciesPassed,
  numPoliciesTotal,
  className,
}) => (
  <PoliciesContainer className={className}>
    <PoliciesCircle numPoliciesPassed={numPoliciesPassed}>
      <PolicyLight height={24} width={24} />
    </PoliciesCircle>
    <br />
    <br />
    <PoliciesScoreContainer>
      <span className="policiesScore">{numPoliciesPassed}</span>
      <span className="scoreChange">/&nbsp;{numPoliciesTotal}</span>
    </PoliciesScoreContainer>
    <Subwidget>
      {numPoliciesPassed === numPoliciesTotal ? (
        <>
          <CheckBall className="spacingRight" width={24} height={24} />{' '}
          All&nbsp;Pass
        </>
      ) : (
        <>
          <ErrorBall width={24} height={24} className="spacingRight" />
          {numPoliciesTotal - numPoliciesPassed}&nbsp;fail
        </>
      )}
    </Subwidget>
  </PoliciesContainer>
);
