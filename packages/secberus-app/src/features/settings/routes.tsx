import { lazily } from 'react-lazily';
import { RouteGateProps } from '../../app/routing/definitions';

const { SettingsScreen } = lazily(() => import('./index'));

const paths = {
  base: '/settings',
} as const;

const routes: RouteGateProps[] = [
  {
    path: paths.base,
    component: SettingsScreen,
    type: 'PROTECTED',
  },
];

export { paths as settingsPaths };
export { routes as settingsRoutes };
