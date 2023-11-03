import React from 'react';
import { useDispatch } from 'react-redux';
import { setUIAttribute } from '../store';

const SCREEN_LOADING = `screensLoading`;

const useLoader = (entity: string, isLoading: boolean) => {
  const dispatch = useDispatch();
  const [delayed, setDelayed] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading) return setDelayed(false);
    const tmo = setTimeout(() => {
      setDelayed(true);
    }, 500);

    return () => clearTimeout(tmo);
  }, [isLoading]);

  React.useEffect(() => {
    if (delayed && isLoading)
      dispatch(setUIAttribute(`${SCREEN_LOADING}[${entity}]`, isLoading));

    return () => {
      dispatch(setUIAttribute(`${SCREEN_LOADING}[${entity}]`, false));
    };
  }, [delayed, dispatch, entity, isLoading]);
};

export default useLoader;
