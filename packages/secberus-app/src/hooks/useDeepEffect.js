import React from 'react';
import { isEqual } from 'lodash';

export const useDeepEffect = (effect, deps) => {
  const isFirst = React.useRef(true);
  const prevDeps = React.useRef(deps);

  React.useEffect(() => {
    const isSame = prevDeps.current.every((obj, idx) =>
      isEqual(obj, deps[idx])
    );

    if (isFirst.current || !isSame) {
      effect();
    }

    isFirst.current = false;
    prevDeps.current = deps;
  });
};
