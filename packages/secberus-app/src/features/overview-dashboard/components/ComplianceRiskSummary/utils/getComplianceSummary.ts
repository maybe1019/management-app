import { ColorProperties } from '@secberus/components';
import { ComplianceFrameworkSummary } from '@secberus/services';

export const getComplianceSummary = (
  compliance_summary: ComplianceFrameworkSummary['compliance_summary']
) => {
  let progressBackground: ColorProperties;
  if (compliance_summary <= 25) {
    progressBackground = 'purple';
  } else if (compliance_summary <= 50) {
    progressBackground = 'red';
  } else if (compliance_summary <= 75) {
    progressBackground = 'orange';
  } else {
    progressBackground = 'green';
  }
  return progressBackground;
};
