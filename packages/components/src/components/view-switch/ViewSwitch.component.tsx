import React from 'react';
import {
  ViewSwitchContainer,
  ActiveViewButton,
  InactiveViewButton,
} from './ViewSwitch.styled';
import { ViewSwitchProps } from './ViewSwitch.types';

export const ViewSwitch: React.FC<ViewSwitchProps> = ({
  firstOption,
  secondOption,
  mode = 'dark',
}) => {
  const [primaryActive, setPrimaryActive] = React.useState(true);
  return (
    <ViewSwitchContainer mode={mode}>
      {primaryActive ? (
        <ActiveViewButton mode={mode}>{firstOption}</ActiveViewButton>
      ) : (
        <InactiveViewButton onClick={() => setPrimaryActive(true)} mode={mode}>
          {firstOption}
        </InactiveViewButton>
      )}
      {primaryActive ? (
        <InactiveViewButton onClick={() => setPrimaryActive(false)} mode={mode}>
          {secondOption}
        </InactiveViewButton>
      ) : (
        <ActiveViewButton mode={mode}>{secondOption}</ActiveViewButton>
      )}
    </ViewSwitchContainer>
  );
};
