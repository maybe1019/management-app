/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Validation } from '../validation/Validation.component';

export const IntegrationInputContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  h3 {
    ${({ theme }) => theme.typography.small}
    margin-bottom:24px;
  }
  h5 {
    ${({ theme }) => theme.typography['small-regular']}
    margin-bottom: 0px;
  }
  .marginHandler {
    margin-bottom: 16px;
    margin-top: 0px;
  }
  button {
    margin: 8px;
    &:first-of-type {
      margin-left: 0px;
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
`;

export const StyledValidation = styled(Validation)<{
  fillWidth?: boolean;
  name?: string;
}>`
  width: ${({ fillWidth = true }) => (fillWidth ? '100%' : '49%')};
  margin: 0;
  padding: 0;
`;
