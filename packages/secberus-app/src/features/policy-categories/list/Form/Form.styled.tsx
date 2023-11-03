import {
  BaseModal,
  Select,
  Text,
  Tooltip,
  Validation,
} from '@secberus/components';
import styled from 'styled-components';

export const ModalForm = styled.form`
  grid-template-rows: min-content, min-content, min-content;
`;

export const ModalFooter = styled.div`
  padding-top: 24px;
  padding-bottom: 8px;
  height: 10%;
`;

export const RadioGroup = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-left: 20px;
`;

export const ButtonGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const DropdownContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 59px;

  & span {
    & p {
      margin-left: 0px;
    }
  }
`;

export const CategorySelect = styled(Select)`
  .Select__label {
    margin-left: 20px;
  }
`;

export const TextContainer = styled(ButtonGroup)`
  margin-bottom: 8px;

  svg {
    circle {
      stroke-width: 2.5;
    }

    path {
      stroke-width: 2.5;
    }
  }
`;

export const DeletionText = styled(Text)`
  display: inline-block;
`;
export const CategoryText = styled(Text)`
  margin-left: 20px;
`;

export const RadioValidationWrapper = styled(Validation)`
  margin-bottom: 0px;
`;

export const StyledModal = styled(BaseModal)`
  width: 490px;

  .modal-content {
    overflow: unset;
  }
`;

export const StyledTooltip = styled(Tooltip)`
  width: 360px;
`;
