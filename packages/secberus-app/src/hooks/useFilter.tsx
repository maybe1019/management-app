import React from 'react';
import { useDispatch } from 'react-redux';
import { resetFilters } from '../store';

type EffectCallback = () => void | (() => void | undefined);
type DependencyList = ReadonlyArray<any>;
type Callback = void | (() => void);

const useFilter = (effect: EffectCallback, deps: DependencyList) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const cleanup: () => void = () => {
      // filtered should never persist beyond the immediate screen
      dispatch(resetFilters());
    };

    const callback: Callback = effect();

    return () => {
      cleanup();
      if (callback) callback();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);

  return null;
};
export default useFilter;
