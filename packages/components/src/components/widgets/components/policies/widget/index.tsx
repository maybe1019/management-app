import React from 'react';
import { PoliciesWidgetMain } from '../Policies.types';
import { PoliciesSubwidget } from '../subwidget';
import { WidgetContainer } from '../../../containers';

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
