import { ColorProperties } from '../../../../../../types';

export interface ValueDisplayProps {
  displayOnlyText: string;
  displayLabelColor?: ColorProperties;
  displayOnlyColor?: ColorProperties;
  displayOnlyBackgroundColor?: ColorProperties;
  className?: string;
}
export interface ValueDisplayContainerProps {
  backgroundColor: ColorProperties;
}
