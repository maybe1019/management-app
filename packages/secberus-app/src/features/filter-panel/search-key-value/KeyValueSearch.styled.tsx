import styled from 'styled-components';
import { Input, Button } from '@secberus/components';

interface SeparatorProps {
  backgroundColor: string;
}

export const SelectedChip = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors['light-blue']};
  border-radius: 4px;
  align-items: center;
  margin-top: 6px;
  padding: 8px 12px 4px 12px;
  & p {
    margin-right: 4px;
    word-break: break-word;
  }
  & rect {
    fill: ${props => props.theme.colors['light-gray']};
  }
`;

export const RemoveChip = styled.div`
  display: flex;
  cursor: pointer;
  margin-left: auto;
`;

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
