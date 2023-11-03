import { BaseModal, TextArea } from '@secberus/components';
import styled from 'styled-components/macro';

export const DPIFormModal = styled(BaseModal)`
  max-width: 850px;
`;

export const ModalForm = styled.form`
  grid-template-rows: repeat(3, min-content);
  & .setup-docs-link {
    color: ${props => props.theme.colors.blue};
  }
`;

export const GridFields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 324px);
  grid-column-gap: 24px;
`;

export const ModalFooter = styled.div`
  padding-top: 24px;
  height: 10%;
`;

export const StyledLabel = styled.label`
  font-stretch: normal;
  letter-spacing: normal;
  margin-block-start: 0em;
  margin-block-end: 0em;
  ${({ theme }) => theme.typography['small-bold']};
  color: ${({ theme }) => theme.colors.dark};
  margin-left: 20px;
  margin-bottom: 6px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MaskedTextArea = styled(TextArea)`
  & textarea {
    -webkit-text-security: disc;
    font-family: text-security-disc;
  }
`;
