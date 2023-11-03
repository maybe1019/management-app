import styled from 'styled-components';

export const HoverWrapper = styled.div`
  .rc-table
    .rc-table-container
    .rc-table-content
    table
    .rc-table-tbody
    .rc-table-row {
    * {
      cursor: pointer !important;
    }
    &:hover {
      background: ${({ theme }) => theme.colors['light-blue']};
    }
  }
`;
