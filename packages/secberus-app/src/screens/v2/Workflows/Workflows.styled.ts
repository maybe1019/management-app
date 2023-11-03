import styled, { css } from 'styled-components';
import {
  Button,
  ButtonDropdown,
  DataTable,
  FadeScroll,
  BaseModal,
  Select,
  ToggleButton,
  Text,
} from '@secberus/components';

export const StyledFilterSection = styled.div`
  .title {
    margin-bottom: 8px;
  }
  .description {
    margin-bottom: 16px;
  }
`;

export const StyledFilterContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto auto;
`;

export const IntegrationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: 4px;
`;

export const IntegrationSelectionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  padding: 16px;
  ${({ theme }) => theme.typography['small-bold']};
`;

export const StyledDropdown = styled(Select)`
  && {
    width: 200px;
    margin-right: 6px;
    white-space: nowrap;
    width: max-content;
  }
  & > :first-child {
    width: inherit;
    ul {
      width: inherit;
      position: absolute;
      width: 250px;
      top: unset;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export const StyledButtonDropdown = styled(ButtonDropdown)`
  ul {
    position: absolute;
    width: 250px;
    top: unset;
    right: unset;
  }
`;

export const StyledModal = styled(BaseModal)`
  width: max-content;
  background-color: ${({ theme }) => theme.colors['light-gray']};
`;

export const StyledButton = styled(Button)`
  margin: auto;
`;

export const ColContainer = styled(FadeScroll)`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0px 6px;
  flex-direction: row;
  overflow: auto;
  flex: 1;
  white-space: nowrap;
`;

export const StyledDataTable = styled(DataTable)`
  padding: 0px 24px 24px 24px;
`;

export const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormContainer = styled.form`
  display: grid;
  gap: 8px;
`;

export const AllSelected = styled.div`
  width: 100%;
  height: 80px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors['medium-gray']};
  color: ${({ theme }) => theme.colors.gray};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const WorkflowViolationsToggleButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;
export const WorkflowViolationsToggleButton = styled(ToggleButton)`
  height: 40px;
  width: calc(100% - 12px);
  .toggleOption {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.colors.white};
    svg {
      height: 20px;
      width: 20px;
    }
    &.isActive {
      background: ${({ theme }) => theme.colors.dark};
      & path {
        fill: none;
      }
    }
  }
`;

export const ConditionallyVisuallyHidden = styled.span<{ hide?: boolean }>`
  ${({ hide = true }) =>
    hide &&
    css`
      border: 0px;
      clip: rect(0px, 0px, 0px, 0px);
      height: 1px;
      width: 1px;
      margin: -1px;
      padding: 0px;
      overflow: hidden;
      white-space: nowrap;
      position: absolute;
    `}
`;

export const ConditionText = styled(Text)`
  ${({ theme }) => theme.typography['xsmall-regular']}
  color: ${({ theme }) => theme.colors['extra-dark']};
`;
export const ConditionSpacer = styled(ConditionText)`
  padding-right: 6px;
`;
export const IconWrapper = styled.div`
  padding-right: 4px;

  & > svg {
    & > path {
      fill: #6a6a88;
    }
  }
`;
