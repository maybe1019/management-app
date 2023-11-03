import React from 'react';
import {
  PoliciesWidget,
  RiskScoreWidget,
  ViolationsWidget,
  ConnectionStatusWidget,
} from '@secberus/components';

export type WidgetTypes =
  | 'risk'
  | 'violations'
  | 'policy'
  | 'occurrence'
  | 'connection';

export interface UseWidgetProps {
  widgets: WidgetTypes[];
  posture?: Record<string, any>;
  connection?: { success?: number; fail?: number };
  onClick?: (...args: any) => void;
}

export const useWidgets = ({
  widgets,
  posture,
  connection,
  onClick,
}: UseWidgetProps) => {
  const widgetMap = React.useMemo(() => {
    return {
      policy: (
        <PoliciesWidget
          numPoliciesPassed={
            posture?.policy_count - posture?.policy_failed_count
          }
          numPoliciesTotal={posture?.policy_count}
        />
      ),
      risk: (
        <RiskScoreWidget score={posture?.risk_score} showTrendChart={false} />
      ),
      violations: (
        <ViolationsWidget onClick={onClick} summary={posture?.violations} />
      ),
      occurrence: (
        <ViolationsWidget summary={posture?.violations} title="Occurrence" />
      ),
      connection: (
        <ConnectionStatusWidget
          success={connection?.success}
          fail={connection?.fail}
        />
      ),
    };
  }, [
    posture?.policy_count,
    posture?.policy_failed_count,
    posture?.risk_score,
    posture?.violations,
    onClick,
    connection?.success,
    connection?.fail,
  ]) as Record<WidgetTypes, JSX.Element>;

  return React.useMemo(
    () => widgets.map(w => widgetMap[w]),
    [widgetMap, widgets]
  );
};
