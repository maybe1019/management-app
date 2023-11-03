import React from 'react';
import { Text, Link, Button, AlertBox } from '@secberus/components';

interface VerificationProps {
  verifyUrl: string;
  handleFinalVerification: () => Promise<void>;
  errorVisible?: boolean;
}

export const VerifyFinal: React.FC<VerificationProps> = ({
  verifyUrl,
  handleFinalVerification,
  errorVisible,
}) => (
  <>
    {!!errorVisible && (
      <AlertBox
        type="error"
        margin="12px auto 24px auto"
        title="An error occurred while verifying this integration"
        message={
          'Please make sure you clicked "allow" from the Atlassian link below. If you clicked allow, please resubmit or contact support.'
        }
      />
    )}

    <Text type="small-regular">
      Please click the link below to verify it on Atlassian's end.
    </Text>
    <br />
    <u>
      <Text color="blue" type="small-regular">
        <Link
          color="blue"
          external
          underline
          to={verifyUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {verifyUrl}
        </Link>
      </Text>
    </u>
    <br />
    <Text type="small-regular">
      If there is nothing wrong on Atlassian's side, go ahead and click the
      button below and we will finish setting up your integration.
    </Text>
    <br />
    <br />
    <Button onClick={handleFinalVerification}>Create integration</Button>
  </>
);
