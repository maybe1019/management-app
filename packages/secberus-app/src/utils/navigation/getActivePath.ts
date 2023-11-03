import { ORG_PATH_REGEX } from '../../features/organization/constants';

const getActivePath = (pathname: string, replaceSlashWith = '/') => {
  const remainingPath = pathname.replace(ORG_PATH_REGEX, '');
  return remainingPath
    .split('/')
    .filter((str, i) => i > 0)
    .join(replaceSlashWith);
};

export default getActivePath;
