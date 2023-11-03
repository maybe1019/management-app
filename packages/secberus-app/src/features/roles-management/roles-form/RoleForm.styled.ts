import styled from 'styled-components';
import { BaseModal } from '@secberus/components';

export const ButtonContainer = styled.div`
  display: flex;
  & button {
    margin-right: 8px;
  }
`;

export const StyledModal = styled(BaseModal)`
  .modal-content {
    overflow: unset;
  }
`;
