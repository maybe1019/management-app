import { RowRenderProps } from 'react-fluid-table';

export type RowProps = RowRenderProps & {
  alternatingRowColor: boolean;
  fontWeight: number;
};

export interface StyledRowProps {
  index: number;
  alternatingRowColor: boolean;
  fontWeight: number;
}
