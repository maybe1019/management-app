import React from 'react';

export interface UseSlidePanelProps {
  component: any;
}

export const useSlidePanel = ({
  component,
}: UseSlidePanelProps): any => {
  const [data, setData] = React.useState({});
  const [visibility, setVisibility] = React.useState(false);

  const openPanel = React.useCallback(
    (newData = {}) => {
      setData(newData);
      setVisibility(true);
    },
    []
  );

  const closePanel = React.useCallback(() => {
    setVisibility(false);
  }, []);

  const panelProps = {
    isVisible: visibility,
    onClose: closePanel,
    data,
  };

  return {
    component,
    panelProps,
    isVisible: visibility,
    openPanel,
    closePanel,
  };
};
