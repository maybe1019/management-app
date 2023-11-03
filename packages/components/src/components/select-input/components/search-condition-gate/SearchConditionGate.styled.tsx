import styled from 'styled-components';
import { Input, Text } from '../../..';
import { ValueDisplay } from './components';

export const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1px;
  width: 100%;
  input {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`;

export const StyledLabel = styled(Text)`
  width: 50px;
`;

export const StyledLeftComponent = styled.div`
  && {
    width: 152px;
  }
`;

export const StyledDisplay = styled(ValueDisplay)`
  width: 152px;
`;

export const StyledInput = styled(Input)`
  width: calc(100% - 202px);
  color: ${({ theme }) => theme.colors.white};
`;

export const LabelContainer = styled.div`
  padding-top: 12px;
`;
