import React from 'react';
import { useSelector } from 'react-redux';
import { LoadingOverlay } from '@secberus/components';

const WithLoader = ({ children }) => {
  const screensLoading = useSelector(state => state.ui.screensLoading);

  const active = !!Object.values(screensLoading ?? {}).filter(val => val)
    .length;

  return (
    <>
      {children}
      {active && <LoadingOverlay />}
    </>
  );
};

export default WithLoader;
