import {
  EmailLight,
  MsTeamsLight,
  PagerdutyLight,
  ServicenowLight,
  SlackLight,
  LogosWebhook,
  JiraLight,
  RedmineLight,
  SplunkLight,
  SumoLogicDark,
} from '@secberus/icons';
import { Integration } from '@secberus/services';

// todo: write some insane type that requires all Integration['type'](s)
// to be present in iconoptions
type IconOption = {
  Icon: any;
  type: Integration['type'];
};

export const IconOptions: Array<IconOption> = [
  { Icon: EmailLight, type: 'EMAIL' },
  { Icon: JiraLight, type: 'JIRA_BASIC' },
  { Icon: JiraLight, type: 'JIRA_OAUTH' },
  { Icon: MsTeamsLight, type: 'MSTEAMS' },
  {
    Icon: PagerdutyLight,
    type: 'PAGERDUTY',
  },
  { Icon: RedmineLight, type: 'REDMINE' },
  {
    Icon: ServicenowLight,
    type: 'SERVICENOW',
  },
  { Icon: SlackLight, type: 'SLACK' },
  { Icon: LogosWebhook, type: 'HTTP' },
  {
    Icon: SplunkLight,
    type: 'SPLUNK',
  },
  {
    Icon: SumoLogicDark,
    type: 'SUMOLOGIC',
  },
];

export const DEFAULT_ICON = { Icon: LogosWebhook };
