/* eslint-disable camelcase */
import faker from 'faker';

export const IntegrationTypes = [
  'msteams',
  'slack',
  'redmine',
  'jira',
  'webhook',
  'email',
  'servicenow',
];

export type IntegrationsTuple = typeof IntegrationTypes;
export type IntegrationsType = IntegrationsTuple[number];

export interface Integrations {
  id: string;
  name: string;
  integration_type: IntegrationsType;
  url?: string;
  verified?: string;
}

export const generateIntegrations = (count: number): Integrations[] =>
  Array(count)
    .fill(0)
    .map(
      (): Integrations => ({
        id: faker.random.uuid(),
        name: faker.lorem.words(),
        integration_type:
          IntegrationTypes[Math.floor(Math.random() * IntegrationTypes.length)],
        url: faker.internet.url(),
      })
    );
