import styled from 'styled-components';
import { BaseModal } from '@secberus/components';

export const StyledModal = styled(BaseModal)`
  min-width: 450px;
  width: 65%;
  height: auto;

  .modal-content {
    height: 90%;
    padding: 0;
    max-height: 85vh;
  }
`;

export const TableWrapper = styled.div`
  padding: 30px 20px 0;

  .rc-table {
    .rc-table-body {
      border-top: 1px solid ${({ theme }) => theme.colors['medium-gray']};
      tr.category-row td.rc-table-cell {
        background: ${({ theme }) => theme.colors['light-gray']};

        p {
          ${({ theme }) => theme.typography['small-bold']};
        }
      }
    }
  }
`;
