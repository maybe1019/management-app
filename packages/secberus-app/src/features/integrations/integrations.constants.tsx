import { RESOURCE_LOGO_BY_INTEGRATION } from '@secberus/components';
import { Option } from './Integrations.types';

export const integrationOptions: Option[] = [
  {
    label: 'Email',
    Component: RESOURCE_LOGO_BY_INTEGRATION.email,
    type: 'EMAIL',
  },
  {
    label: 'Jira',
    Component: RESOURCE_LOGO_BY_INTEGRATION.jira_basic,
    type: 'JIRA_BASIC',
  },
  {
    label: 'Jira OAuth',
    Component: RESOURCE_LOGO_BY_INTEGRATION.jira_oauth,
    type: 'JIRA_OAUTH',
  },
  {
    label: 'MS Teams',
    Component: RESOURCE_LOGO_BY_INTEGRATION.msteams,
    type: 'MSTEAMS',
  },
  {
    label: 'Pager Duty',
    Component: RESOURCE_LOGO_BY_INTEGRATION.pagerduty,
    type: 'PAGERDUTY',
  },
  {
    label: 'RedMine',
    Component: RESOURCE_LOGO_BY_INTEGRATION.redmine,
    type: 'REDMINE',
  },
  {
    label: 'ServiceNow',
    Component: RESOURCE_LOGO_BY_INTEGRATION.servicenow,
    type: 'SERVICENOW',
  },
  {
    label: 'Slack',
    Component: RESOURCE_LOGO_BY_INTEGRATION.slack,
    type: 'SLACK',
  },
  {
    label: 'Splunk',
    Component: RESOURCE_LOGO_BY_INTEGRATION.splunk,
    type: 'SPLUNK',
    ownerPermissionRequired: true,
  },
  {
    label: 'Sumo Logic',
    Component: RESOURCE_LOGO_BY_INTEGRATION.sumo,
    type: 'SUMOLOGIC',
    ownerPermissionRequired: true,
  },
  {
    label: 'Webhook',
    Component: RESOURCE_LOGO_BY_INTEGRATION.webhook,
    type: 'HTTP',
  },
];

export const verifiableIntegrations = ['JIRA_OAUTH', 'SERVICENOW', 'EMAIL'];

export const serviceNowOptions = [
  {
    id: 'incident',
    name: 'Incident',
  },
  {
    id: 'problem',
    name: 'Problem',
  },
  {
    id: 'change_request',
    name: 'Change Request',
  },
];

export const NO_EDIT = ['SPLUNK', 'SUMOLOGIC'];
