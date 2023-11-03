import styled, { css } from 'styled-components';
import { IStyling, ITableData } from '../DataTable.types';

export const Table = styled.table`
  width: 100%;
  grid-area: 2 / 2;
  padding: 0px 24px;
`;

export const TableRow = styled.tr`
  display: flex;
  align-items: center;
  ${({ rowStyles }: IStyling) => css`
    ${rowStyles?.borderBottom
      ? `border-bottom: 1px solid ${rowStyles.color || '#e8e8e8'};`
      : ``};
    height: ${rowStyles?.height ? rowStyles.height : '48px'};
    font-weight: ${rowStyles?.['font-weight'] ? rowStyles['font-weight'] : 400};
  `}
`;

export const TableData = styled.td`
  min-width: ${({ width = 200 }: ITableData) =>
    typeof width === 'number' ? `${width}px` : { width }};
  width: ${({ width }: ITableData) =>
    typeof width === 'number' ? `${width}px` : { width }};
  padding: 8px;
`;

export const TableHeaders = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #034286;
`;
