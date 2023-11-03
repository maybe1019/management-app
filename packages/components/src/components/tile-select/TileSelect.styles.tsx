import styled from 'styled-components';

export const TileSelectButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 124px;
  height: 116px;
  border-radius: 24px;
  padding: 20px;
  margin-right: 24px;
  margin-bottom: 24px;
  box-shadow: 0px 4px 8px rgba(30, 30, 50, 0.16);
  background: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  & svg {
    height: 40px;
    width: 40px;
    margin-bottom: 4px;
  }
  &:hover {
    box-shadow: 0px 16px 48px rgba(17, 17, 34, 0.24);
  }

  &:active {
    border: ${({ theme }) => `1px solid ${theme.colors.blue}`};
    box-shadow: none;
  }
`;
