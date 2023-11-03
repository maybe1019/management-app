import React from 'react';
import { secberusApiGW } from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';

export const useGetResource = () => {
  const logger = createEnvAwareLogger();
  const {
    data: resources,
    isError,
    error,
  } = secberusApiGW.useListResourcesQuery({});

  React.useEffect(() => {
    if (isError) {
      logger.error(error);
    }
  }, [logger, error, isError]);

  return resources ?? [];
};
