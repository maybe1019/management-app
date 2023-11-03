import { UserOrg } from '@secberus/services';
import React from 'react';
import { generatePath, useHistory, useLocation } from 'react-router';
import { authPaths } from '../auth/paths';
import { ORG_PATH_REGEX } from './constants';

const EXCLUDED_PATHS = ['/404', '/admin'];

export const useOrgUrlPrefix: (
  currentOrg: UserOrg | undefined,
  orgs: UserOrg[] | undefined
) => void = (currentOrg, orgs) => {
  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    if (!currentOrg?.id || !orgs) return;

    if (EXCLUDED_PATHS.some(excluded => location.pathname.startsWith(excluded)))
      return;

    if (Object.values(authPaths).includes(location.pathname as any)) return;

    if (!location.pathname.includes(currentOrg.id.toString())) {
      const remainingPath = location.pathname.replace(ORG_PATH_REGEX, '');
      const path = generatePath(`/org/:orgId${remainingPath}`, {
        orgId: currentOrg.id,
      });
      history.replace(path + location.search, location.state);
    }
  }, [
    currentOrg,
    history,
    location.pathname,
    location.search,
    location.state,
    orgs,
  ]);
};
