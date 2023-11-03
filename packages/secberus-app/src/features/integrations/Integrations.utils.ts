import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';
import type { AlertBoxError } from '@secberus/components';
import type { IntegrationType } from './Integrations.types';

const TRIGGERS = [
  'HTTP',
  'SLACK',
  'MSTEAMS',
  'JIRA_BASIC',
  'SPLUNK',
  'SUMOLOGIC',
];
export const shouldTriggerModalWarning = (
  integrationType: IntegrationType | undefined
) => !!integrationType && TRIGGERS.includes(integrationType);

export const DEFAULT_ERROR_MSG: AlertBoxError = {
  title: 'There was a problem',
  message:
    'The url cannot be verified. Please make sure you have entered a valid url.',
};

export const UNABLE_TO_CREATE_MSG: AlertBoxError = {
  title: 'Unable to create integration',
  message: 'Please review the information and try again.',
};

export const getErrorMessage = (
  integrationType?: IntegrationType
): AlertBoxError => {
  switch (integrationType) {
    case 'SPLUNK':
    case 'SUMOLOGIC':
      return UNABLE_TO_CREATE_MSG;
    default:
      return DEFAULT_ERROR_MSG;
  }
};
export const isUrlVerificationError = (
  error: FetchBaseQueryError | SerializedError | undefined
) => !!error && 'status' in error && error.status === 400;
