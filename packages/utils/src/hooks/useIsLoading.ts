import React from 'react';

export const useIsLoading = (boolArray: boolean[]) =>
  React.useMemo(() => boolArray.includes(true), [boolArray]);
