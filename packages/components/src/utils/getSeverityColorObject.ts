import { theme } from '../styles/theme';
import { ColorProperties } from '../types';
import { CRITICAL, HIGH, MEDIUM, LOW } from './constants';
import { getPriorityStatusString } from './getPriorityStatusString';

export interface SeverityColorObject {
  main: string;
  lighter: string;
  gradient: string;
}

export type SeverityColorMain = Extract<
  ColorProperties,
  'green' | 'orange' | 'red' | 'purple'
>;

export type SeverityColor = SeverityColorMain &
  Extract<
    ColorProperties,
    'light-green' | 'light-orange' | 'light-red' | 'light-purple'
  >;

export interface GetSeverityColorObjectOptions {
  fallbackColor?: string;
  gradientAsObject?: boolean;
}

/**
 * Returns an object representing the colors to use for severity related
 * components. If a priority is invalid, the object returns the fallback
 * color for all values in the object; this makes it easier to use without
 * having to check if a value is null or a string.
 * @param priority
 * @param fallbackColor
 */
export const getSeverityColorObject = (
  priority: string | number | null,
  { fallbackColor = theme.colors.dark }: GetSeverityColorObjectOptions = {}
): SeverityColorObject => {
  const { colors, gradients } = theme;
  const priorityStr =
    typeof priority === 'number' ? getPriorityStatusString(priority) : priority;
  let colorKey = '';

  switch (priorityStr) {
    case LOW:
      colorKey = 'green';
      break;
    case MEDIUM:
      colorKey = 'orange';
      break;
    case HIGH:
      colorKey = 'red';
      break;
    case CRITICAL:
      colorKey = 'purple';
      break;
    default:
  }

  return {
    main: colors[colorKey as SeverityColor] ?? fallbackColor,
    lighter: colors[`light-${colorKey}` as SeverityColor] ?? fallbackColor,
    gradient: gradients[colorKey as SeverityColor] ?? fallbackColor,
  };
};
