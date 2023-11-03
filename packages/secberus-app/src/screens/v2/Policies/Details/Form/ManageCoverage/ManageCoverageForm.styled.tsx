import { BaseModal } from '@secberus/components';
import styled from 'styled-components';

export const ModalFooter = styled.div`
  padding-top: 48px;
`;

export const ButtonGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const StyledModal = styled(BaseModal)`
  width: 900px;

  .modal-content {
    overflow: unset;
  }

  .select-checkbox label span {
    margin-right: 0;
  }
`;
