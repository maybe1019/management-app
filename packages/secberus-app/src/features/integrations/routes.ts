import { lazily } from 'react-lazily';
import { composeRouteConfig } from '../../app/routing/utils';

const { Integrations } = lazily(() => import('./Integrations.component'));

const { integrationsRoutes, integrationsPaths, integrationsPermissions } =
  composeRouteConfig('integrations')({
    components: { integrations: Integrations },
    paths: { integrations: '/integrations' },
    permissions: { integrations: 'api:integrations:list' },
  });

export { integrationsRoutes, integrationsPaths, integrationsPermissions };
