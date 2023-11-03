import styled from 'styled-components';
import { Text } from '../text/Text.component';
import { SnackTypes } from './Snackbar.types';

export const Snack = styled.div<{ opacity: number; type: SnackTypes }>`
  background-color: ${props => props.theme.colors.dark};
  border-radius: 16px;
  width: ${props => (props.type === 'default' ? 360 : 400)}px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);
  display: flex;
  transition: opacity 100ms linear;
  height: fit-content;
  position: relative;
  padding: 16px;
  box-sizing: border-box;
  opacity: ${props => props.opacity};
  .content-container {
    display: flex;
    width: 100%;
    gap: 16px;
    align-items: flex-start;
  }
  .message {
    max-width: ${props => (props.type === 'action' ? 270 : 288)}px;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ActionButton = styled.button`
  background-color: ${props => props.theme.colors.gray};
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 0;
  margin: 0;
  transition: background 100ms linear;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  border-radius: 4px;
  padding: 4px;
`;

export const Message = styled(Text)`
  width: 100%;
`;

export const IconButton = styled.button`
  height: 24px;
  width: 24px;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  transition: background 100ms linear;
  cursor: pointer;
`;
