import React from 'react';
import { ColorProperties } from '../../types/theme';

export interface ProgressBarBackgrounds {
  progressBackground?: ColorProperties;
  barBackground?: ColorProperties;
}
export interface ProgressBarProps extends ProgressBarBackgrounds {
  total?: number;
  rightLabel?: JSX.Element | React.ReactNode | string;
  leftLabel?: JSX.Element | React.ReactNode | string;
  percent: string; // css string
}

export interface ProgressComponentProps extends ProgressBarBackgrounds {
  percent: string;
}
