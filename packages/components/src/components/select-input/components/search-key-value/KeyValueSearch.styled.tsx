import styled from 'styled-components';
import { Input } from '../../..';
import { Button } from '../../../button';

interface SeparatorProps {
  backgroundColor: string;
}

export const KeyField = styled(Input)<SeparatorProps>`
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  input {
    padding-right: 4px;
  }
`;

export const ValueField = styled(Input)`
  border-radius: 0px;
  input {
    padding-right: 4px;
    padding-left: 4px;
  }
`;

export const Separator = styled.div<SeparatorProps>`
  background-color: ${({ theme, backgroundColor }) =>
    theme.colors[backgroundColor]};
  padding: auto 2px;
  display: flex;
  align-items: center;
`;

export const InputFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  position: relative;
  & .validation {
    margin-bottom: 0px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const InputGroup = styled.div`
  display: flex;
  width: 100%;
`;

export const InputAction = styled(Button)`
  border-radius: 0px 8px 8px 0px;
  height: unset;
  font-size: 18px;
  padding-bottom: 2px;
  &.disabled {
    background: ${({ theme }) => theme.colors.dark};
    opacity: 0.4;
    color: #fff;
  }
`;
