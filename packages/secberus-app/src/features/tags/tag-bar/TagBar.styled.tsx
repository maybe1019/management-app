import styled from 'styled-components';

export const TabBarContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors['light-gray']}`};
  width: 100%;
  box-sizing: border-box;
  padding: 8px 32px;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 80%;
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const ResetButton = styled.button`
  ${({ theme }) => theme.typography['xsmall-bold']};
  color: ${({ theme }) => theme.colors.gray};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`;
