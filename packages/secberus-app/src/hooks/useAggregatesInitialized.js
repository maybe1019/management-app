import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetAggregatesStatus } from '../store/actions/ui';

const useAggregatesInitialized = () => {
  const dispatch = useDispatch();
  const aggregatesInitialized = useSelector(
    state => state.ui.aggregatesLoading
  );

  const isInitialized = React.useMemo(() => {
    return Object.values(aggregatesInitialized).every(
      ({ aggregateRequested, aggregateInitialized }) =>
        aggregateRequested ? aggregateInitialized : true
    );
  }, [aggregatesInitialized]);

  React.useEffect(() => {
    return () => {
      dispatch(resetAggregatesStatus());
    };
  }, [dispatch]);

  return isInitialized;
};

export default useAggregatesInitialized;
