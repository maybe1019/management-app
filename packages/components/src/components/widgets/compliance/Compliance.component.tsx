import React from 'react';
import { CheckMarkLight } from '@secberus/icons';
import { ComplianceWidgetMain } from './Compliance.types';
import {
  ComplianceCircle,
  ComplianceContainer,
  ComplianceScoreContainer,
} from './Compliance.styled';

export const ComplianceSubwidget: React.FC<ComplianceWidgetMain> = ({
  compliance,
}) => (
  <ComplianceContainer>
    <ComplianceCircle compliance={compliance}>
      <CheckMarkLight height={24} width={24} />
    </ComplianceCircle>
    <br />
    <br />
    <ComplianceScoreContainer>
      <span className="complianceScore">{compliance}%</span>
    </ComplianceScoreContainer>
  </ComplianceContainer>
);
