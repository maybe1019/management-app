import { PickUnion } from './utilities';
// Anything secberus propietary or integrated businesses.
export type PRIORITY = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type BadgeIcon =
  | 'aws'
  | 'azure'
  | 'gcp'
  | 'redmine'
  | 'warning'
  | 'success'
  | 'fail'
  | 'failure'
  | 'slack'
  | 'email'
  | 'http'
  | 'jira_basic'
  | 'jira_oauth'
  | 'jira'
  | 'pagerduty'
  | 'webhook'
  | 'msteams'
  | 'servicenow'
  | 'splunk'
  | 'default'
  | 'sumologic';

export type IntegrationType = PickUnion<
  BadgeIcon,
  | 'slack'
  | 'redmine'
  | 'email'
  | 'msteams'
  | 'jira_basic'
  | 'jira_oauth'
  | 'pagerduty'
  | 'http'
  | 'servicenow'
  | 'splunk'
  | 'sumologic'
>;
