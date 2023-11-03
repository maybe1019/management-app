import {
  EnvironmentCondition,
  appIsProduction,
  defaultProductionVars,
} from './appIsProduction';

declare global {
  interface Window {
    SCBRS_DEBUG?: boolean;
  }
}

export interface LoggerOptions {
  /**
   * Determines whether to hide console output in production or not.
   * @defaultValue `true`
   */
  suppressInProduction?: boolean;

  /**
   * The list of environment variables and their values that determine if the
   * app is in production. This checks `process.env`, therefore, the key for any
   * `EnvironmentCondition` passed must exist on `process.env`.
   */
  productionVars?: Array<EnvironmentCondition>;
}

/**
 * Environment-aware logger that is a wrapper around the browser's native
 * ConsoleAPI ({@link https://developer.mozilla.org/en-US/docs/Web/API/Console_API});
 * It has access to all the original methods (i.e.: log, warn, error, table, group, etc...)
 * and uses Proxy to allow the dynamic definition of methods similar to magic methods in
 * other languages.
 *
 * Right now, it determines if the app is in production by checking
 * `process.env.NODE_ENV === production` and `process.env.REACT_APP_DEPLOYED_ENV === prod`.
 * Additional variables can be added using the options. There is also an option to allow
 * it to execute in production if desired.
 *
 * @example
 * #Options
 * ```ts
 * const defaultProductionVars = [
 * // value must be type of: string | number | boolean
 *  { key: 'NODE_ENV', value: 'production' },
 *  { key: 'REACT_APP_DEPLOYED_ENV', value: 'prod' },
 * ]
 *
 * const defaultOptions = {
 *  supressInProduction: true,
 *  productionVars: defaultProductionVars,
 * };
 * ```
 *
 * ## Usage
 * ```ts
 * import { createEnvAwareLogger } from 'path/to/file';
 * ...
 * const logger = createEnvAwareLogger();
 * logger.log('This logs normal text');
 * logger.error('This logs an error text');
 * logger.warn('This logs a warning text');
 * logger.table(...);
 *
 * // With options
 * const logger = createEnvAwareLogger({
 *  productionVars: [{ key: 'MY_CUSTOM_KEY', value: 'prod' }],
 * });
 * ```
 *
 * @param supressInProduction - determines whether to hide console output in
 *  production or not.
 * @param productionVars - array of type `EnvironmentCondition` (object with `key`
 * and `value`) that help determine if the app is in production.
 * @returns Proxy - which is used to intercept the call to the ConsoleAPI,
 * checking whether the app is in production or not then either continuing the
 * call to the original console method or executing an empty function resulting in no output.
 * Learn more about Proxy: {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy}
 */
export const createEnvAwareLogger = ({
  suppressInProduction = window.SCBRS_DEBUG ?? true,
  productionVars = defaultProductionVars,
}: LoggerOptions = {}) => {
  const isProduction = appIsProduction(productionVars);
  const target = window.console;
  const handler = {
    get: function (target: never, name: never) {
      if (suppressInProduction && isProduction) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return function () {};
      } else {
        return target[name];
      }
    },
  };
  return new Proxy(target, handler);
};
