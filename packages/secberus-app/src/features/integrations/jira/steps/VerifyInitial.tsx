import React from 'react';
import { Text, Link, Button, CopyField } from '@secberus/components';
import { OrderedList, EnablePointerEvents, InlineText } from '../styled';

interface VerifyInitialProps {
  integrationFormatted: {
    name: string;
    public_key: string;
    consumer_key: string;
  };
  integration_id: string;
  handleVerification: (integration_id: string) => any;
}

export const VerifyInitial: React.FC<VerifyInitialProps> = ({
  integrationFormatted,
  handleVerification,
  integration_id,
}) => (
  <>
    <Text type="small-regular">
      Navigate to your Jira AppLinks Dashboard under Integrations &gt;
      Application links and follow the steps below to complete Atlassian
      integration.
    </Text>
    <br />
    <Text type="small-regular">
      <OrderedList>
        <li>Enter your application's url and select Create new link</li>
        <li>
          In the following form, enter <b>only</b> Application Name and check
          Create incoming link.
        </li>
        <li>
          Select continue and paste the inputs below in the appropriate required
          fields.
        </li>
        <li> Click continue, then return to this form to verify</li>
      </OrderedList>
    </Text>
    <br />
    {Object.entries(integrationFormatted).map(([key, value]) => {
      const formattedKey = key.replace('_', ' ');
      return (
        <>
          <EnablePointerEvents>
            <CopyField
              type={key === 'public_key' ? 'area' : 'field'}
              value={value}
              label={formattedKey}
            />
          </EnablePointerEvents>
        </>
      );
    })}
    <Text type="bold">
      <Button onClick={() => handleVerification(integration_id)}>Verify</Button>
    </Text>
    <br />
    <InlineText>
      <Text type="small-regular">
        More information on how to&nbsp;{' '}
        <Text type="small-regular" color="blue">
          <Link
            external
            underline
            to="https://support.atlassian.com/jira-cloud-administration/docs/use-applinks-to-link-to-atlassian-products/"
            rel="noopener noreferrer"
            target="_blank"
          >
            use AppLinks to link to Atlassian products
          </Link>
        </Text>
      </Text>
    </InlineText>
  </>
);
