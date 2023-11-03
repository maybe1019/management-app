import React from 'react';
import {
  ListBoxComponent,
  Button,
  IntegrationType,
} from '@secberus/components';
import { EmailLight, PenLight } from '@secberus/icons';
import { HStack } from '@chakra-ui/react';
import { IntegrationsForm } from '../Integrations.form';
import { Integration, ListRowProps } from '../Integrations.types';
import { CallBackModalRenderedModalProps } from '../../callback-modal/definitions';
import { ServiceNowModal } from '../service-now/VerifyModal.component';
import { JiraOauthModal } from '../jira/VerifyModal.oauth.component';
import {
  integrationOptions,
  verifiableIntegrations,
} from '../integrations.constants';

export type IntegrationModal<T extends Integration = Integration> =
  CallBackModalRenderedModalProps & {
    integration: T;
  };

const callbackModals: Partial<
  Record<IntegrationType, { component: React.FC<IntegrationModal> }>
> = {
  servicenow: { component: ServiceNowModal },
  jira_oauth: { component: JiraOauthModal },
  // TODO: Email needs a callback component but the data does not
  // describe as of right now whether or not an email is verified
  // outside of an empty array. This is commented out for now, because
  // there is no way to discern (outside of an empty  array which is brittle)
  // if an email is verified or not.
  // email: { component: EmailModal },
};

export const ListRow = ({ integration, allowEdit }: ListRowProps) => {
  const [showForm, setShowForm] = React.useState(false);
  const [showCallback, setShowCallback] = React.useState(false);

  type integrationTypeLowercase = `${Lowercase<
    ReturnType<() => typeof integration.type>
  >}`;

  const integrationType =
    integration.type.toLowerCase() as integrationTypeLowercase;

  const integrationMeta = integrationOptions.find(
    option => integration.type === option.type
  );

  const IntegrationDescription = React.useMemo(() => {
    let description;
    switch (integration.type) {
      case 'EMAIL':
        description = integration?.spec?.emails.length
          ? integration.spec.emails
          : 'No verified email(s), check your inbox for verification.';
        break;
      case 'REDMINE':
        description = integration.spec.email;
        break;
      case 'SPLUNK':
        description = integration.splunk_url;
        break;
      case 'SUMOLOGIC':
        description = integration.url;
        break;
      default:
        description = integration.spec.url;
        break;
    }
    if (Array.isArray(description)) {
      description = description.join(' | ');
    }
    return description;
  }, [integration]);

  if (!integration) return <></>;

  const { Component = EmailLight as React.ElementType, label = '' } =
    integrationMeta!;
  // @ts-expect-error Implied any
  const CallbackComponent = callbackModals[integrationType]?.component;

  return (
    <>
      <div>
        <ListBoxComponent
          startIcon={Component}
          title={integration.name}
          description={IntegrationDescription}
        >
          <HStack spacing="8px">
            {!integration.verified && // If not verified and is an instance of verifiable integration
              verifiableIntegrations.includes(integration.type) && (
                <Button
                  size="small"
                  onClick={() => setShowCallback(true)}
                  data-test-id={`verify${integration.name}`}
                >
                  Verify
                </Button>
              )}
            {allowEdit && (
              <Button
                icon
                variant="secondary"
                size="small"
                data-test-id={`${integration.name}`}
                onClick={() => {
                  setShowForm(true);
                }}
              >
                <PenLight />
              </Button>
            )}
          </HStack>
        </ListBoxComponent>
      </div>
      {showForm && (
        <>
          <IntegrationsForm
            integrationType={integration.type}
            modalTitle={label}
            formData={integration}
            closeCallback={() => {
              setShowForm(false);
            }}
            submitCallback={() => {
              setShowForm(false);
            }}
            visible={showForm}
          />
        </>
      )}
      {showCallback && CallbackComponent && (
        <CallbackComponent
          onClose={() => {
            setShowCallback(false);
          }}
          open={showCallback}
          integration={integration}
        />
      )}
    </>
  );
};
