import styled from 'styled-components';
import { Text } from '../text/Text.component';
import { StyledValidationProps } from './Validation.types';

export const StyledValidation = styled.div<StyledValidationProps>`
  margin-bottom: ${props => (props.errorVisible ? '0px' : '24px')};
  margin-bottom: ${props => props.noMargin && 'unset'};
  & .info {
    margin-left: 20px;
    margin-top: 4px;
  }
  position: relative;
`;

export const ValidationSubText = styled(Text)`
  position: initial;
`;
