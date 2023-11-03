import styled from 'styled-components';
import {
  SearchConditionDropdownGate,
  SearchConditionDisplayGate,
} from '@secberus/components';
import { DeleteLight } from '@secberus/icons';

export const DeleteRed = styled(DeleteLight)`
  path,
  circle {
    stroke: ${({ theme }) => theme.colors.red};
  }
`;
export const PaddingContainer = styled.div`
  padding-top: 12px;
  padding-bottom: 12px;
`;
export const FlexFrame = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors['dark-gray']};
  display: grid;
  grid-template-columns: 270px auto;
  .descriptionContainer {
    border-right: 1px solid ${({ theme }) => theme.colors['dark-gray']};
    width: 270px;
    p {
      padding: 24px;
    }
  }
  @media only screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    .descriptionContainer {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid ${({ theme }) => theme.colors['dark-gray']};
    }
  }
`;

export const GateContainer = styled.div`
  &&& {
    ul[role='listbox'] {
      z-index: 200000;
    }
    width: 100%;
    margin-top: 16px;
    input {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;
export const StyledDropdownGate = styled(SearchConditionDropdownGate)`
  width: 100%;
  display: flex;
`;

export const InputContainer = styled.div`
  width: 90%;
`;

export const StyledDisplayGate = styled(SearchConditionDisplayGate)`
  width: 100%;
  display: flex;
`;
export const Form = styled.form`
  padding: 20px;
  width: calc(100% - 40px);
`;

export const FrameContainer = styled.div`
  padding: 32px;
  overflow-y: auto;
  .form_connector {
    margin-left: 16px;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  gap: 2%;
  grid-template-columns: 24% 55% auto;
  align-items: left;
  border-bottom: 1px solid ${({ theme }) => theme.colors['dark-gray']};
  padding-top: 24px;
  padding-bottom: 24px;
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  .radioLabel {
    margin-left: 24px;
    margin-bottom: 8px;
  }
  .radioContainer {
    margin-left: 16px;
  }
  .containerGate {
    align-items: flex-start;
  }
  @media ${props => props.theme.breakpoints.laptopL} {
    &.buttonItem {
      justify-content: space-between;
      .quaternary {
        height: 48px;
      }
      div {
        height: 1px;
      }
    }
  }
  &.buttonHandler {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
    & > div {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
  }
`;

export const FormButton = styled.div`
  display: flex;
  gap: 16px;
`;

export const ExistingExceptionsContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  .policyExceptionsList {
    position: relative;
  }
`;

export const ExceptionBadge = styled.div`
  p {
    & > div {
      // one deep selector
      display: flex;
      align-items: center;
      gap: 8px;
    }
    display: flex;
    gap: 24px;
    margin-top: 28px;
  }
`;

export const DeleteButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

// todo: dark mode pagination container
export const PaginationContainer = styled.div`
  div {
    border: 0px;
  }
  p {
    color: white;
  }
  .rightButton,
  .leftButton {
    * path {
      stroke: white;
      &:disabled {
        stroke: #6a6a88;
      }
    }
    &:active {
      background: #323246;
    }
  }
`;
