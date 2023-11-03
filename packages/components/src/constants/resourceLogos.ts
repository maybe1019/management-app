import {
  AmazonAwsDark,
  AzureDark,
  EmailLight,
  GoogleCloudPlatformDark,
  JiraLight,
  LogosWebhook,
  MsTeamsLight,
  PagerdutyLight,
  RedmineLight,
  AmazonAwsLight,
  AzureLight,
  DataLight,
  GithubLight,
  GoogleCloudPlatformLight,
  TerraformLight,
  ServicenowLight,
  SlackLight,
  CheckBall,
  ErrorBall,
  NullBall,
  SplunkLight,
  SumoLogicDark,
} from '@secberus/icons';
import { ConnectionStatusType } from '../components';
import {
  FailureIcon,
  NullIcon,
  PartialIcon,
  SuccessIcon,
} from '../components/badges/connection-status-badge/ConnectionStatusBadge.styled';

export type ResourceLogoType =
  | React.ComponentType<
      React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
    >
  | React.FC;

export type ResourceLogoIndexType = {
  [key: string]: ResourceLogoType;
};

export const RESOURCE_LOGO_BY_DATASOURCE: ResourceLogoIndexType = {
  aws: AmazonAwsLight,
  azure: AzureLight,
  gcp: GoogleCloudPlatformLight,
  github: GithubLight,
  default: DataLight,
};

export const RESOURCE_LOGO_BY_DATASOURCE_DARK: ResourceLogoIndexType = {
  aws: AmazonAwsDark,
  azure: AzureDark,
  gcp: GoogleCloudPlatformDark,
};

export const RESOURCE_LOGO_BY_TYPE: ResourceLogoIndexType = {
  aws: RESOURCE_LOGO_BY_DATASOURCE['aws'],
  azure: RESOURCE_LOGO_BY_DATASOURCE['azure'],
  gcp: RESOURCE_LOGO_BY_DATASOURCE['gcp'],
  github: TerraformLight,
  default: RESOURCE_LOGO_BY_DATASOURCE['default'],
};

export const RESOURCE_LOGO_BY_INTEGRATION: ResourceLogoIndexType = {
  email: EmailLight,
  jira_basic: JiraLight,
  jira_oauth: JiraLight,
  msteams: MsTeamsLight,
  pagerduty: PagerdutyLight,
  redmine: RedmineLight,
  servicenow: ServicenowLight,
  slack: SlackLight,
  splunk: SplunkLight,
  webhook: LogosWebhook,
  sumo: SumoLogicDark,
};

export const RESOURCE_LOGO_BY_DATASOURCE_CONNECTION_STATUS: Record<
  ConnectionStatusType,
  ResourceLogoType
> = {
  success: SuccessIcon,
  partial: PartialIcon,
  failure: FailureIcon,
  default: NullIcon,
};

export const RESOURCE_LOGO_BY_POLICY_COLLECTION_STATUS: Record<
  'success' | 'failure' | 'default',
  ResourceLogoType
> = {
  success: CheckBall,
  failure: ErrorBall,
  default: NullBall,
};
