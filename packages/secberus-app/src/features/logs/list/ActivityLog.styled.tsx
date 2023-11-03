import styled from 'styled-components';

export const TableWrapper = styled.div`
  .rc-table tbody {
    td {
      .expand-icon {
        padding-right: 16px;
      }
      .overlay-expander-cell {
        display: flex;
        align-items: center;
      }
    }
    div {
      white-space: pre-wrap;
    }
    .rc-table-row-level-1 {
      td {
        display: revert;
      }
      .rc-table-cell-with-append {
        padding: 8px 24px 24px;
        &.rc-table-cell-row-hover {
          background: transparent;
        }
      }
    }
  }
`;
