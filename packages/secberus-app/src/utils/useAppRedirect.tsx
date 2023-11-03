import { useHistory } from 'react-router-dom';
import {
  DEFAULT_ROUTE_PATH,
  DEFAULT_ADMIN_ROUTE_PATH,
} from '../app/routing/constants';
import AppRedirectUrl from './AppRedirectUrl';

export interface UseAppRedirectOptions {
  fallbackToAdminHome?: boolean;
}

export interface UseAppRedirectReturnValue {
  navigateBack: () => void;
  navigateTo: (path: string) => void;
  clear: () => void;
}

const defaultOptions: UseAppRedirectOptions = {
  fallbackToAdminHome: false,
};

/**
 * Sets the current url before navigating to a specified path.
 * This allows navigating "back to" the intial path at anytime. Can be
 * used to create seamless user experiences where a user is returned to
 * a route to finish some task.
 * @param path
 * @param fallbackToAdminHome
 */
export const useAppRedirect = ({
  fallbackToAdminHome,
}: UseAppRedirectOptions = defaultOptions): UseAppRedirectReturnValue => {
  const history = useHistory();

  const clear = () => {
    AppRedirectUrl.remove();
  };

  const navigateBack = () => {
    let redirectUrl = fallbackToAdminHome
      ? DEFAULT_ADMIN_ROUTE_PATH
      : DEFAULT_ROUTE_PATH;
    AppRedirectUrl.exists(url => {
      redirectUrl = url;
      clear();
    });

    history.push(redirectUrl);
  };

  const navigateTo = (path: string) => {
    const { pathname, search } = history.location;
    AppRedirectUrl.set(pathname + search);
    history.push(path);
  };

  return {
    navigateTo,
    navigateBack,
    clear,
  };
};
