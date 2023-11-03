import { CSSProperties } from 'styled-components';

export type IconTagCSS = Partial<
  Pick<CSSProperties, 'height' | 'padding' | 'margin'>
>;
export interface IconTagProps extends IconTagCSS {
  value: string;
}
