import React from 'react';
import { createEnvAwareLogger } from '../utils';

export const useTraceUpdate = (props: any) => {
  const logger = createEnvAwareLogger();
  const prev = React.useRef(props);
  React.useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps: any, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      logger.log('Changed props:', changedProps);
    } else {
      logger.log('No changed props');
    }
    prev.current = props;
  });
};
