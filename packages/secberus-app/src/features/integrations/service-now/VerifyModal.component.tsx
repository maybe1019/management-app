import React from 'react';
import { Text, BaseModal } from '@secberus/components';
import { integrationsApi } from '@secberus/services';
import { Integration } from '../Integrations.types';
import { CallBackModalRenderedModalProps } from '../../callback-modal/definitions';
import { useAppDispatch } from '../../../store/';

type IntegrationModal = CallBackModalRenderedModalProps & {
  integration: Integration;
};

export const ServiceNowModal: React.FC<IntegrationModal> = ({
  onClose,
  open,
  integration,
}) => {
  const dispatch = useAppDispatch();
  const [verifyUrl, setVerifyUrl] = React.useState<string>();
  const [authorizeIntegration, { isLoading: isAuthorizingIntegration }] =
    integrationsApi.useAuthorizeIntegrationMutation();

  React.useEffect(() => {
    const getUrl = async () => {
      let url;
      const res = await authorizeIntegration({ integrationId: integration.id });
      if ('data' in res) {
        url = res.data as unknown as string;
        setVerifyUrl(url);
      }
      return url;
    };
    if (integration.verified) return;
    getUrl();
  }, [dispatch, integration.id, integration.verified, authorizeIntegration]);

  return (
    <BaseModal
      handleClose={onClose}
      title="Almost done!"
      isVisible={open}
      variant="light"
      options={{
        useBackground: true,
        fixedOverScreen: true,
        useAnimation: true,
        closeIcon: true,
      }}
    >
      We need you to visit this link to verify your ServiceNow integration with
      Secberus
      <br />
      <Text type="bold">
        <u>
          <a href={verifyUrl} target="blank" rel="noopener noreferrer">
            Please click here
          </a>
        </u>
      </Text>
    </BaseModal>
  );
};
