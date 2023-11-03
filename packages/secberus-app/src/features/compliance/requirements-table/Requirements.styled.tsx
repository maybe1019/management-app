import styled from 'styled-components';

export const BasicCell = styled.div`
  display: flex;
  align-items: center;
  &.centered {
    justify-content: center;
  }
  &.leftAlign {
    justify-content: flex-start;
  }
`;

// required unless we want to portal
// overwrites because child table inside child
export const SubTableWrapper = styled.div`
  th {
    background: #f1f6fa !important; // todo: negate need for important
  }
  .rc-table-cell-with-append {
    background: revert;
  }
  * .rc-table-cell-row-hover {
    cursor: pointer;
  }
`;

export const StyledExpandIcon = styled.div`
  .rc-table tbody .rc-table-row-level-1 .rc-table-cell-with-append {
    display: revert !important;
    padding: 24px 40px 40px 40px;
    &.rc-table-cell-row-hover {
      background: transparent;
    }
  }
`;
