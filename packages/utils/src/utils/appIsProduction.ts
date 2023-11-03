export interface EnvironmentCondition {
  /**
   * The name of the environment variable that exists on `process.env`.
   */
  key: string;

  /**
   * The value of the environment variable that if evaluated to means the app
   * is in production.
   */
  value: string | number | boolean;
}

export const defaultProductionVars: Array<EnvironmentCondition> = [
  { key: 'NODE_ENV', value: 'production' },
  { key: 'REACT_APP_DEPLOYED_ENV', value: 'prod' },
];

export const appIsProduction = (
  productionVars = defaultProductionVars
): boolean => {
  let result = false;
  productionVars.forEach(({ key, value }) => {
    if (process.env[key] === value) result = true;
  });
  return result;
};
