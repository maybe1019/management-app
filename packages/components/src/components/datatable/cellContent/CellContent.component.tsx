import React from 'react';
import _ from 'lodash';
import { Truncated } from './CellContent.styled';
import { CellContentProps } from './CellContent.types';

export const DataTableCellContent: React.FC<CellContentProps> = ({
  row,
  target,
}) => {
  const content = _.get(row, target);
  return (
    <Truncated data-tip={content} data-for="overflowCol">
      {content}
    </Truncated>
  );
};
