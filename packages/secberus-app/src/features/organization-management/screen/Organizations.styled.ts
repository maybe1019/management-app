import styled from 'styled-components';
import { BaseModal, Select, Button } from '@secberus/components';

export const MembersFieldContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 77%;

  @media (max-width: 1120px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const StyledSelect = styled(Select)`
  margin-bottom: 24px;
  margin: 28px 0 24px 2%;
`;

export const StyledButton = styled(Button)`
  && {
    ${props => props.theme.typography.bold};
  }
`;

export const StyledModal = styled(BaseModal)`
  min-width: 450px;
  width: 40%;
`;
