import styled from 'styled-components';
import { Input } from '../../../../../index';

export const InputField = styled(Input)`
  height: 48px;
  width: 385px;
  margin-bottom: 0px;
`;

export const ListContainer = styled.ul`
  position: absolute;
  overflow-y: scroll;
  max-height: 144px;
  width: 385px;
  padding-left: 0px;
  margin-top: 0;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);

  list-style: none;
  li:last-child {
    border-bottom: none;
  }
`;

export const ListItem = styled.li`
  width: 385px;
  padding: 12px 16px;
  cursor: pointer;

  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;

  border-bottom: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};

  &:hover {
    background-color: ${({ theme }) => theme.colors['medium-gray']};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors['medium-gray']};
  }
`;
