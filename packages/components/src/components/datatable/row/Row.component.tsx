import React from 'react';
import { RowProps } from './Row.types';
import { StyledRow } from './Row.styled';

export const DataTableRow: React.FC<RowProps> = ({
  index,
  alternatingRowColor,
  children,
  style,
  fontWeight = 400,
}) => (
  <StyledRow
    index={index}
    alternatingRowColor={alternatingRowColor}
    style={style}
    fontWeight={fontWeight}
  >
    {children}
  </StyledRow>
);
