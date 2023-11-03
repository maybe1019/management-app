import React from 'react';
import { PoliciesWidgetMain } from './policies/Policies.types';
import { PoliciesSubwidget } from './policies/Policies.component';
import { WidgetContainer } from './widget-container/WidgetContainer.component';

interface PoliciesWidgetComponentMain extends PoliciesWidgetMain {
  title?: string;
}

export const PoliciesWidget: React.FC<PoliciesWidgetComponentMain> = ({
  title = 'Policies',
  numPoliciesPassed = 0,
  numPoliciesTotal = 0,
  className,
}) => (
  <WidgetContainer title={title}>
    <PoliciesSubwidget
      numPoliciesPassed={numPoliciesPassed || 0}
      numPoliciesTotal={numPoliciesTotal || 0}
      className={className}
    />
  </WidgetContainer>
);
