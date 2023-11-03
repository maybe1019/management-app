import React from 'react';
import { Text } from '../';
import { RightPill } from './components';
import { PillContainer, LeftPill } from './PillSwitcher.styled';
import { PillSwitcherProps } from './PillSwitcher.types';

export const PillSwitcher: React.FC<PillSwitcherProps> = ({
  leftLabel,
  rightLabel,
  options,
  onSelect,
  rightPillWidth = 'fit-content',
  initialSelected,
}) => {
  return (
    <PillContainer>
      <LeftPill>
        <Text type="small-bold">{leftLabel}</Text>
      </LeftPill>
      <RightPill
        label={rightLabel}
        options={options}
        onSelect={onSelect}
        width={rightPillWidth}
        initialSelected={initialSelected}
      />
    </PillContainer>
  );
};
