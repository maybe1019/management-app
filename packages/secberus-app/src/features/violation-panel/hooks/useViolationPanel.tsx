import React from 'react';
import { ViolationPanel } from '../ViolationPanel';
import { useViolationPanelProps } from '../types/useViolationPanel.types';

export const useViolationPanel = (props?: useViolationPanelProps) => {
  const [data, setData] = React.useState({});
  const [visibility, setVisibility] = React.useState(false);

  const openPanel = React.useCallback(
    (newData = {}) => {
      setData(newData);
      setVisibility(true);
    },
    [setVisibility, setData]
  );

  const closePanel = React.useCallback(() => {
    setVisibility(false);
  }, [setVisibility]);

  const panelProps = {
    isVisible: visibility,
    onClose: closePanel,
    data,
  };

  return {
    component: ViolationPanel,
    panelProps,
    isVisible: visibility,
    openPanel,
    closePanel,
  };
};
