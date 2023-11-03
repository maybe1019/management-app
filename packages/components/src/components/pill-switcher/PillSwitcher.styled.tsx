import styled from 'styled-components';

export const PillContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  border-radius: 8px;
  border: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  box-shadow: ${({ theme }) => theme.shadows.button};
  &:hover {
    border: ${({ theme }) => `1px solid ${theme.colors['gray']}`};
    box-shadow: ${({ theme }) => theme.shadows.buttonHover};
  }
  &:focus-within {
    border: ${({ theme }) => `1px solid ${theme.colors.blue}`};
    outline: ${({ theme }) => `4px solid ${theme.colors['light-blue']}`};
  }
`;

export const LeftPill = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 40px;
  padding: 8px 16px;
  color: ${({ theme }) => theme.colors['neutral']};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px 0 0 8px;
  border-right: 1px solid ${({ theme }) => theme.colors['medium-gray']};
`;
