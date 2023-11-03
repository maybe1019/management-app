import React from 'react';
import { ProgressBarProps } from './ProgressBar.types';
import {
  ProgressBar as StyledProgressBar,
  ProgressBarContainer,
  ProgressContentContainer,
} from './ProgressBar.styled';

export const ProgressBar: React.FC<ProgressBarProps> = ({
  rightLabel,
  leftLabel,
  barBackground = 'medium-gray',
  progressBackground = 'blue',
  percent,
}) => {
  const labelExists = !!leftLabel && !!rightLabel;

  const Container = labelExists ? ProgressContentContainer : React.Fragment;

  return (
    <Container>
      <ProgressBarContainer barBackground={barBackground}>
        <StyledProgressBar
          barBackground={barBackground}
          progressBackground={progressBackground}
          percent={percent}
        />
      </ProgressBarContainer>
      {labelExists && (
        <div className="ProgressContent_TextContainer">
          <div className="ProgressContent_Text">{leftLabel}</div>
          <div className="ProgressContent_Text">{rightLabel}</div>
        </div>
      )}
    </Container>
  );
};
