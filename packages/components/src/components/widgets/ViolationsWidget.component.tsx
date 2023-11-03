import React from 'react';
import { ViolationsSubwidget } from './components';
import { WidgetContainer } from './widget-container/WidgetContainer.component';

interface ViolationsWidgetProps {
  title?: string;
  summary: {
    CRITICAL: number;
    HIGH: number;
    MEDIUM: number;
    LOW: number;
  };
}

export const ViolationsWidget: React.FC<ViolationsWidgetProps> = ({
  title = 'Violations',
  summary = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 },
}) => (
  <WidgetContainer title={title}>
    <ViolationsSubwidget summary={summary} />
  </WidgetContainer>
);
