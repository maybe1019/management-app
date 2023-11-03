import React from 'react';

export const useStaggeredLoading = (isLoading?: boolean) => {
  const [canStartLoading, setCanStartLoading] = React.useState(false);
  const [canStopLoading, setCanStopLoading] = React.useState(true);

  React.useEffect(() => {
    const tm = setTimeout(() => {
      setCanStartLoading(true);
    }, 500);
    if (!isLoading) {
      setCanStartLoading(false);
      clearTimeout(tm);
    }
    return () => clearTimeout(tm);
  }, [isLoading]);

  React.useEffect(() => {
    const tm = setTimeout(() => {
      setCanStopLoading(true);
    }, 850);

    if (canStartLoading) return setCanStopLoading(false);
    clearTimeout(tm);
    return () => clearTimeout(tm);
  }, [canStartLoading]);

  if (!canStopLoading) return true;
  return canStartLoading;
};
