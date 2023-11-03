import * as yup from 'yup';
import { CreateIntegrationApiResponse } from '@secberus/services';
import { AnyURL } from '@secberus/utils';

type IntegrationType = `${Lowercase<CreateIntegrationApiResponse['type']>}`;

const requiredMessage = 'This is required';
const typeMessage = (type: string) => `Please enter a valid ${type}`;

const useIntegrationsFormSchema = (
  type: IntegrationType | 'none' = 'none',
  isEdit = false
) =>
  ({
    none: yup.object().shape({
      name: yup.string().trim().required(requiredMessage),
    }),
    slack: yup.object().shape({
      name: yup.string().trim().required(requiredMessage),
      url: yup
        .string()
        .trim()
        .url(typeMessage('url'))
        .required(requiredMessage),
    }),
    redmine: yup.object().shape({
      name: yup.string().trim().required(requiredMessage),
      email: yup
        .string()
        .trim()
        .email(typeMessage('email'))
        .required(requiredMessage),
    }),
    msteams: yup.object().shape({
      name: yup.string().trim().required(requiredMessage),
      url: yup
        .string()
        .trim()
        .url(typeMessage('url'))
        .required(requiredMessage),
    }),
    pagerduty: yup.object().shape({
      name: yup.string().trim().required(requiredMessage),
      routing_key: yup.string().trim().required(requiredMessage),
    }),
    http: yup.object().shape({
      name: yup.string().trim().required(requiredMessage),
      url: yup
        .string()
        .trim()
        .url(typeMessage('url'))
        .required(requiredMessage),
    }),
    email: yup.object().shape({
      name: yup.string().required('Name is required'),
      emails: yup
        .array()
        .min(1, 'Email is required')
        .transform(function (value, originalValue) {
          if (this.isType(value) && value !== null) {
            return value;
          }
          return originalValue ? originalValue.trim().split(/[\s,]+/) : [];
        })
        .of(yup.string().email(({ value }) => `${value} is not a valid email`)),
    }),
    jira_basic: yup.object().shape({
      name: yup.string().trim().required(requiredMessage),
      url: yup
        .string()
        .matches(/^https?:\/\/.*.atlassian.net$/, {
          message: typeMessage('Atlassian URL'),
          excludeEmptyString: true,
        })
        .required(requiredMessage),
      username: yup
        .string()
        .email(typeMessage('email'))
        .required(requiredMessage),
      api_token: yup.string().trim().required(requiredMessage),
      project: yup.string().trim().required(requiredMessage),
      issue_type: yup.string().trim().required(requiredMessage),
    }),
    jira_oauth: yup.object().shape({
      name: yup.string().trim().required(requiredMessage),
      url: yup
        .string()
        .matches(/^https?:\/\/.*.atlassian.net$/, {
          message: typeMessage('Atlassian URL'),
          excludeEmptyString: true,
        })
        .required(requiredMessage),
      project: yup.string().required(requiredMessage),
      issue_type: yup.string().required(requiredMessage),
    }),
    splunk: yup.object().shape({
      name: yup.string().trim().required(requiredMessage),
      splunk_url: yup
        .string()
        .matches(AnyURL, {
          message: typeMessage('URL'),
          excludeEmptyString: true,
        })
        .required(requiredMessage),
      hec_token: yup.string().required(requiredMessage),
      index: yup.string().required(requiredMessage),
    }),
    sumologic: yup.object().shape({
      name: yup.string().trim().required(requiredMessage),
      url: yup
        .string()
        .matches(AnyURL, {
          message: typeMessage('URL'),
          excludeEmptyString: true,
        })
        .required(requiredMessage),
    }),
    servicenow: yup.object().shape({
      name: yup.string().trim().required(requiredMessage),
      url: yup
        .string()
        .matches(/^https?:\/\/.*\.service-now.com$/gm, {
          message: typeMessage('ServiceNow URL'),
          excludeEmptyString: true,
        })
        .required(requiredMessage),
      category: yup.string().trim(),
      table: yup.string().required(requiredMessage),
      client_id: yup.string().trim().required(requiredMessage),
      client_secret: yup
        .string()
        .when('client_id', (_arg: any, schema: any) =>
          !isEdit ? schema.trim().required(requiredMessage) : schema
        ),
      assigned_group: yup.string().trim(),
      assigned_to: yup.string().trim(),
    }),
  }[type]);

export default useIntegrationsFormSchema;
