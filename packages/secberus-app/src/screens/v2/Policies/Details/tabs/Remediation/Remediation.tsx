import React from 'react';
import { DetailHeader, Text, StyledPre } from '@secberus/components';
import type { Policy } from '@secberus/services';
import { RemediationWrapper } from '../../Details.styled';

export const RemediationTab: React.FC<{
  remediationSteps: Policy['remediation_steps'];
}> = ({ remediationSteps }) => {
  return (
    <>
      <DetailHeader title="Remediation" />
      <RemediationWrapper>
        <StyledPre wrapText>
          <Text>{remediationSteps}</Text>
        </StyledPre>
      </RemediationWrapper>
    </>
  );
};
