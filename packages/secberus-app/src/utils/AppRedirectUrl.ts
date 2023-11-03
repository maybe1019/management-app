import { createEnvAwareLogger } from '@secberus/utils';

const logger = createEnvAwareLogger();

const AppRedirectUrl = {
  /**
   * Checks if there is an appRedirect url set in sessionStorage.
   * @param callback - optional callback function that will execute if an
   * appRedirect url exists. The callback receives the url as the first argument.
   */
  exists: (callback?: (url: string) => void): boolean => {
    let item = null;
    try {
      item = window.sessionStorage.getItem('appRedirect');
    } catch (error) {
      logger.error(
        'Encountered error while checking if appRedirect exists in sessionStorage',
        error
      );
    }

    if (callback && item !== null) {
      callback(item);
    }

    return item !== null;
  },
  /**
   * Retrieves the app redirect url. If no redirect url is set, returns null.
   * @return string | null
   */
  get: (): string | null => {
    let url = null;
    try {
      const storedUrl = window.sessionStorage.getItem('appRedirect');
      if (storedUrl) {
        url = storedUrl;
      }
    } catch (error) {
      logger.error(
        'Encountered error while retrieving appRedirect in sessionStorage',
        error
      );
    }
    return url;
  },
  /**
   * Sets an appRedirect url in sessionStorage. Set accepts callbacks that will
   * run on success or error.
   * @param url - the url that will be set
   * @param onSuccess - callback that runs on success.
   * @param onError - callback that runs on failure.
   */
  set: (
    url: string,
    onSuccess?: () => void | null,
    onError?: (error: any) => void
  ) => {
    try {
      window.sessionStorage.setItem('appRedirect', url);
      if (onSuccess) onSuccess();
    } catch (error) {
      logger.error(
        'Encountered error while setting appRedirect in sessionStorage',
        error
      );
      if (onError) onError(error);
    }
  },
  /**
   * Removes the appRedirect url from sessionStorage. Remove accepts callbacks
   * that will run on success or error.
   * @param onSuccess - callback that runs on success.
   * @param onError - callback that runs on failure.
   */
  remove: (onSuccess?: () => void, onError?: (error: any) => void): void => {
    try {
      window.sessionStorage.removeItem('appRedirect');
      if (onSuccess) onSuccess();
    } catch (error) {
      logger.error(
        'Encountered error while removing appRedirect in sessionStorage',
        error
      );
      if (onError) onError(error);
    }
  },
};

export default AppRedirectUrl;
