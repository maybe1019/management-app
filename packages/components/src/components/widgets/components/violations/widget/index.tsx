import React from 'react';
import { WidgetContainer } from '../../../containers';
import { ViolationWidgetFilterComponentProps } from '../Violations.types';
import { ViolationsSubwidget } from '../subwidget';

export const ViolationsWidget: React.FC<ViolationWidgetFilterComponentProps> =
  ({ title = 'Violations', ...props }) => (
    <WidgetContainer title={title}>
      <ViolationsSubwidget {...props} />
    </WidgetContainer>
  );
