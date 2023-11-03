import React from 'react';
import { Control } from 'react-hook-form';
import { CSSProperties } from 'styled-components';
import { serviceNowOptions, NO_EDIT } from './integrations.constants';

const callbackUrl = process.env.REACT_APP_LEGACY_API_URL
  ? `${process.env.REACT_APP_LEGACY_API_URL}/servicenow/oauth/callback`
  : 'https://api-stg.secberus.com/servicenow/oauth/callback';

export const useIntegrationHelper = (
  errors: any,
  register: any,
  type: any,
  isEdit = false,
  control: Control
) => {
  return React.useMemo(() => {
    //Should be a let for future use
    //eslint-disable-next-line
    let title: string | null = null;
    const disabled = isEdit && NO_EDIT.includes(type?.toUpperCase());
    const formHelperData = {
      input: [
        {
          ref: register(),
          name: 'name',
          label: 'Integration name',
          placeholder: 'Integration name',
          type: 'text',
          size: 'large',
          disabled,
        },
      ] as any,
      gridStyles: {} as CSSProperties,
      renderUnderInput: [] as any,
      buttons: [] as any,
      width: '450px',
    };

    switch (type) {
      case 'slack':
        formHelperData.input.push({
          ref: register(),
          name: 'url',
          label: 'Incoming webhook url',
          placeholder: 'http://',
          type: 'url',
          size: 'large',
        });
        formHelperData.buttons.push({
          variant: 'contained',
          text: 'Save Slack channel',
          disabled: Object.values(errors).length > 0,
          type: 'submit',
        });

        return { formHelperData };
      case 'sumologic':
        title =
          'This integration is for the entire account and will cover all organizations. There can only be one Sumo Logic integration per account.';
        formHelperData.input.push({
          ref: register(),
          name: 'url',
          label: 'HTTP Source URL',
          placeholder: 'https://',
          type: 'url',
          size: 'large',
          disabled,
        });
        if (!isEdit) {
          formHelperData.buttons.push({
            variant: 'contained',
            text: 'Save',
            disabled: Object.values(errors).length > 0,
            type: 'submit',
          });
        }
        return {
          title,
          formHelperData,
        };
      case 'splunk':
        title =
          'This integration is for the entire account and will cover all organizations. There can only be one Splunk integration per account.';
        formHelperData.input.push(
          {
            ref: register(),
            name: 'splunk_url',
            label: 'HTTP Event Collector (HEC) URL',
            placeholder: 'https://yourendpoint.extension',
            type: 'url',
            size: 'large',
            disabled,
          },
          {
            ref: register(),
            name: 'hec_token',
            placeholder: '',
            label: 'HTTP Event Collector (HEC) Token',
            type: 'text',
            size: 'large',
            disabled,
          },
          {
            ref: register(),
            name: 'index',
            label: 'An index to feed data into',
            placeholder: 'main',
            type: 'text',
            size: 'large',
            defaultValue: 'main',
            disabled,
          }
        );
        !disabled &&
          formHelperData.buttons.push({
            variant: 'contained',
            text: 'Save',
            disabled: Object.values(errors).length > 0,
            type: 'submit',
          });
        return {
          formHelperData,
          title,
        };
      case 'jira_oauth':
        formHelperData.input.push(
          {
            ref: register(),
            name: 'url',
            label: 'URL',
            placeholder: 'https://some.atlassian.net',
            type: 'url',
            size: 'large',
          },
          {
            ref: register(),
            name: 'project',
            label: 'Project',
            placeholder: 'Name of project',
            type: 'text',
            size: 'large',
          },
          {
            ref: register(),
            name: 'issue_type',
            label: 'Issue type',
            placeholder: 'Type of issue',
            type: 'text',
            size: 'large',
          }
        );
        formHelperData.buttons.push({
          variant: 'contained',
          text: 'Initialize Jira OAuth Integration',
          disabled: Object.values(errors).length > 0,
          type: 'submit',
        });
        return { formHelperData, title };
      case 'servicenow':
        formHelperData.input.push({
          ref: register(),
          name: 'client_id',
          label: 'Client ID',
          type: 'text',
          size: 'large',
        });
        if (!isEdit) {
          formHelperData.input.push({
            ref: register(),
            name: 'client_secret',
            label: 'Client Secret',
            type: 'password',
            size: 'large',
          });
        }
        formHelperData.input.push(
          {
            ref: register(),
            name: 'assigned_group',
            label: 'Assigned Group',
            type: 'text',
            size: 'large',
          },
          {
            ref: register(),
            name: 'table',
            label: 'Table',
            type: 'select',
            size: 'large',
            isEdit,
            selectProps: {
              control,
              name: 'table',
              defaultValue: {
                id: 'incident',
                name: 'Incident',
              },
              placeholder: 'Select a table',
              options: serviceNowOptions,
            },
          },
          {
            ref: register(),
            name: 'assigned_to',
            label: 'Assigned To',
            type: 'text',
            size: 'large',
          },
          {
            ref: register(),
            name: 'url',
            label: 'Client URL',
            type: 'text',
            size: 'large',
            tooltipInfo: `Make sure you have configured your instance to include ${callbackUrl}`,
          }
        );
        formHelperData.buttons.push({
          variant: 'contained',
          text: 'Save ServiceNow Integration',
          disabled: Object.values(errors).length > 0,
          type: 'submit',
        });
        formHelperData.gridStyles = {
          gridTemplateColumns: 'auto auto',
        };
        return {
          title,
          formHelperData,
        };
      case 'redmine':
        formHelperData.input.push(
          {
            ref: register(),
            name: 'email',
            label: 'Email',
            placeholder: 'team@example.com',
            type: 'email',
            size: 'large',
            fillWidth: false,
            tooltipInfo:
              'Make sure to verify your email by clicking the link from us which is sent to your inbox.',
          },
          {
            ref: register(),
            name: 'table',
            label: 'Table',
            placeholder: 'incident',
            type: 'select',
            size: 'large',
          },
          {
            ref: register(),
            name: 'status',
            label: 'Status',
            type: 'text',
            size: 'large',
            fillWidth: false,
          },
          {
            ref: register(),
            name: 'tracker',
            label: 'Tracker',
            type: 'text',
            size: 'large',
            fillWidth: false,
          },
          {
            ref: register(),
            name: 'category',
            label: 'Category',
            type: 'text',
            size: 'large',
            fillWidth: false,
          },
          {
            ref: register(),
            name: 'priority',
            label: 'Priority',
            type: 'text',
            size: 'large',
            fillWidth: false,
          },
          {
            ref: register(),
            name: 'assigned_to',
            label: 'Assigned to',
            type: 'text',
            size: 'large',
            fillWidth: false,
          }
        );
        formHelperData.gridStyles = {
          gridTemplateColumns: 'auto auto',
        };
        formHelperData.buttons.push({
          variant: 'contained',
          text: 'Save Redmine channel',
          disabled: Object.values(errors).length > 0,
          type: 'submit',
        });
        formHelperData.width = '497px';
        return { title, formHelperData };
      case 'msteams':
        formHelperData.input.push({
          ref: register(),
          name: 'url',
          label: 'Incoming webhook url',
          placeholder: 'http://',
          type: 'url',
          size: 'large',
        });
        formHelperData.buttons.push({
          variant: 'contained',
          text: 'Save Microsoft Teams integration',
          disabled: Object.values(errors).length > 0,
          type: 'submit',
        });
        return { title, formHelperData };
      case 'pagerduty':
        formHelperData.input.push({
          ref: register(),
          name: 'routing_key',
          label: 'Routing key',
          size: 'large',
        });
        formHelperData.buttons.push({
          variant: 'contained',
          text: 'Save pager duty integration',
          disabled: Object.values(errors).length > 0,
          type: 'submit',
        });
        return { title, formHelperData };
      case 'http':
        formHelperData.input.push({
          ref: register(),
          name: 'url',
          label: 'HTTP url',
          type: 'url',
          placeholder: 'http://',
          size: 'large',
        });
        formHelperData.buttons.push({
          variant: 'contained',
          text: 'Save integration',
          disabled: Object.values(errors).length > 0,
          type: 'submit',
        });
        return { title, formHelperData };
      case 'email':
        formHelperData.input.push({
          ref: register(),
          name: 'emails',
          label: 'Email',
          size: 'large',
        });
        formHelperData.buttons.push({
          variant: 'contained',
          text: 'Save integration',
          disabled: Object.values(errors).length > 0,
          type: 'submit',
        });
        return { title, formHelperData };
      case 'jira_basic':
        formHelperData.input.push(
          {
            ref: register(),
            name: 'url',
            label: 'Incoming webhook url',
            placeholder: 'http://',
            type: 'url',
            size: 'large',
          },
          {
            ref: register(),
            name: 'username',
            label: 'User email',
            type: 'email',
            size: 'large',
            fillWidth: false,
          },
          {
            ref: register(),
            name: 'api_token',
            label: 'API token',
            type: 'text',
            size: 'large',
            fillWidth: false,
          },
          {
            ref: register(),
            name: 'project',
            label: 'Project',
            type: 'text',
            size: 'large',
            fillWidth: false,
          },
          {
            ref: register(),
            name: 'issue_type',
            label: 'Issue type',
            type: 'text',
            size: 'large',
            fillWidth: false,
          }
        );
        formHelperData.gridStyles = {
          gridTemplateColumns: 'auto auto',
        };
        formHelperData.buttons.push({
          variant: 'contained',
          text: 'Save Jira integration',
          disabled: Object.values(errors).length > 0,
          type: 'submit',
        });
        formHelperData.width = '497px';
        return { title, formHelperData };
      default:
        return { title, formHelperData };
    }
  }, [control, errors, isEdit, register, type]);
};
