import styled from 'styled-components';
import { ConfirmModalProps } from './Confirm.modal.types';

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`;

export const InnerContainer = styled.div<{
  align: ConfirmModalProps['align'];
}>`
  display: block;
  .innerContainerDiv {
    display: flex;
    flex-direction: column;
    justify-content: ${({ align }) => align || 'left'};
    align-items: ${({ align }) => align || 'left'};
  }
`;
