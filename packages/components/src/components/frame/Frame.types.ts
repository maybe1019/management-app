import { ColorProperties } from '../../types';

export interface FrameMain {
  variant?: 'primary' | 'secondary' | 'tertiary';
  title?: string;
  isVisible?: boolean;
  backgroundColor?: ColorProperties;
  titleColor?: ColorProperties;
  borderColor?: ColorProperties;
  borderSize?: number;
}
