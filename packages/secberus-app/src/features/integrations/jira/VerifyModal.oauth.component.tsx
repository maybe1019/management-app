import React from 'react';
import { BaseModal } from '@secberus/components';
import { Container } from '@chakra-ui/react';
import {
  integrationsApi,
  CreateIntegrationApiResponse as IntegrationResponse,
} from '@secberus/services';
import { useNotify } from '../../../store';
import { IntegrationModal } from '../list/Row.component';
import { VerifyFinal } from './steps/VerifyFinal';
import { VerifyInitial } from './steps/VerifyInitial';

export const JiraOauthModal: React.FC<IntegrationModal> = props => {
  const { onClose, open, integration } = props as IntegrationModal<
    Extract<IntegrationResponse, { type: 'JIRA_OAUTH' }>
  >;
  const [errorVisible, setErrorVisible] = React.useState<boolean>(false);
  const [authorizeIntegration] =
    integrationsApi.useAuthorizeIntegrationMutation();
  const [verifyIntegration] = integrationsApi.useVerifyIntegrationMutation();
  const [verifyUrl, setVerifyUrl] = React.useState<string>('');
  const [modalStep, setModalStep] = React.useState<number>(0);
  const { notifySuccess } = useNotify();
  const integrationFormatted = React.useMemo(() => {
    if (integration.type === 'JIRA_OAUTH') {
      return {
        name: integration.name ?? 'No name',
        public_key: integration.spec.public_key ?? 'Missing public key',
        consumer_key: integration.spec.consumer_key ?? 'Missing consumer key',
      };
    } else {
      return {
        name: 'No name',
        public_key: 'Missing public key',
        consumer_key: 'Missing consumer key',
      };
    }
  }, [integration]);

  const handleVerification = async (integration_id: string) => {
    let url = '';
    const res = await authorizeIntegration({ integrationId: integration_id });
    if ('data' in res) {
      url = res.data as unknown as string;
      setVerifyUrl(url);
      setModalStep(modalStep + 1);
    }
  };
  const handleFinalVerification = async () => {
    setErrorVisible(false);
    const res = await verifyIntegration({ integrationId: integration.id });
    // @ts-expect-error Verify response is untyped from AWS
    if ('data' in res && res?.data?.verified) {
      setModalStep(0);
      onClose();
      notifySuccess('Integration successfully verified.');
    } else {
      setErrorVisible(true);
    }
  };

  return (
    <BaseModal
      handleClose={onClose}
      title={`Step ${modalStep + 1}`}
      isVisible={open}
      variant="light"
      options={{
        useBackground: true,
        fixedOverScreen: true,
        useAnimation: true,
        closeIcon: true,
      }}
    >
      <Container>
        {modalStep === 1 ? (
          <VerifyFinal
            handleFinalVerification={handleFinalVerification}
            verifyUrl={verifyUrl}
            errorVisible={errorVisible}
          />
        ) : (
          <VerifyInitial
            integration_id={integration.id}
            integrationFormatted={integrationFormatted}
            handleVerification={handleVerification}
          />
        )}
      </Container>
    </BaseModal>
  );
};
