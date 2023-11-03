import { CSSProperties } from 'react';
import { ColorProperties, TypographyProperties } from '../../types';

export interface TextProps {
  type?: TypographyProperties;
  className?: string;
  color?: ColorProperties;
  bold?: boolean;
  align?: CSSProperties['textAlign'];
}

export interface TextColors extends TextProps {
  light?: boolean;
  dark?: boolean;
}
