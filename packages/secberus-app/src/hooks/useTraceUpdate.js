import React from 'react';
import { createEnvAwareLogger } from '@secberus/utils';

const useTraceUpdate = props => {
  const logger = createEnvAwareLogger();
  const prev = React.useRef(props);
  React.useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      logger.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
};

export default useTraceUpdate;
