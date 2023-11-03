import styled from 'styled-components';
import { Flex, Box } from '@chakra-ui/react';
import { Text, BaseModal } from '@secberus/components';
import { FormInput } from '../../form-builder';

interface StepFlowProps extends React.HTMLAttributes<HTMLElement> {
  height: number;
}

export const StyledTileWrapper = styled(Flex)`
  padding: 24px;
  button {
    margin: 0;
    width: 272px;
    height: 247px;
    svg {
      width: 124px;
      height: 95px;
      margin-bottom: 24px;
    }
    p {
      text-align: center;
    }
    p.report-title {
      margin-bottom: 8px;
    }
  }
`;

export const StyledModal = styled(BaseModal)`
  width: 696px;
  overflow: auto;
  .modal-content {
    overflow: unset;
  }
`;

export const ConfirmationModal = styled(BaseModal)`
  width: 490px;
  height: auto;
`;

export const Wrapper = styled.div`
  display: flex;
  .report-type {
    margin: 0;
  }
  input {
    width: 552px;
  }
  .input,
  .select-interval {
    width: 552px;
    margin-top: 24px;
    & > div {
      margin-bottom: 0;
    }
  }
  p.error {
    margin-top: 15px !important;
  }
`;

export const FormWrapper = styled.div`
  width: 552px;
  flex-grow: 10;
  & .select-datasources {
    margin-top: 24px;
  }
`;

export const HiddenFormInput = styled(FormInput)`
  display: none;
`;

export const FormSection = styled(Box)`
  flex-grow: 15;
  div:first-child {
    margin-top: 0;
  }
  div {
    margin-top: 24px;
  }
`;

export const StepSection = styled(Box)`
  flex-grow: 5;
  padding-top: 4px;
  justify-content: left;
  svg {
    width: 24px;
    height: 24px;
    margin-top: -2px;
    margin-bottom: -2px;
  }
`;

export const StepLine = styled.div<StepFlowProps>`
  width: 2px;
  height: ${({ height }) => `${height}px`};
  background: #35b589;
  margin: 4px 11px 4px;
`;

export const Section = styled.div`
  margin-top: 25px;
  position: relative;
  padding-right: 55px;
`;

export const EmptyCheckBall = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 2px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors['medium-gray']};
`;

export const EditLink = styled.span`
  top: 0;
  right: 0;
  float: right;
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
  font-size: 15px;
  position: absolute;
  text-decoration: underline;
  font-family: 'Eina 01-Bold', sans-serif;
`;

export const SelectInfo = styled(Text)`
  font-size: 11px;
  font-weight: 600;
  line-height: 16px;
  margin-top: 8px;
  margin-left: 24px;
  font-style: normal;
`;
