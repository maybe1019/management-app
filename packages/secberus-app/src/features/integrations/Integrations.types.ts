import { CreateIntegrationApiResponse as IntegrationResponse } from '@secberus/services';
import { AlertBoxProps, ResourceLogoType } from '@secberus/components';

export type IntegrationType = IntegrationResponse['type'];

export type IntegrationErrorMessage = Pick<AlertBoxProps, 'title' | 'message'>;

/**
 * @deprecated
 */
export interface Integration {
  name: string;
  id: string;
  type: IntegrationType;
  url?: string;
  email?: string;
  verified?: boolean;
}

export type ServiceNowTable = 'problem' | 'incident' | 'change_request';

export interface ServiceNowIntegration extends Integration {
  table: ServiceNowTable;
}

export interface JiraOauthIntegration extends Integration {
  project: string;
  issue_type: string;
  consumer_key: string;
  public_key: string;
}

export interface VerifiableIntegration extends Integration {
  handleVerify?: (...args: any) => any;
}

export interface RowProps {
  row: VerifiableIntegration;
}

export interface RootState {
  integrations: {
    keySets: {
      integrationList: VerifiableIntegration[];
    };
  };
}
export interface Option {
  label: string;
  type: IntegrationType;
  Component: ResourceLogoType;
  ownerPermissionRequired?: boolean;
}

export interface IntegrationsFormProps {
  integrationType?: IntegrationType;
  modalTitle?: string;
  webhookTitle?: string;
  closeCallback: () => unknown;
  submitCallback: () => void;
  visible: boolean;
  formData?: IntegrationResponse;
}

export interface ListRowProps {
  integration: any;
  allowEdit?: boolean;
}
