import styled from 'styled-components';
import { Text } from '..';

export const ListBox = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors['dark']};
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => `1px solid ${theme.colors['medium-gray']}`};
  border-radius: 16px;
  width: 100%;
  padding: 16px 18px;
  margin-bottom: 8px;
  transition: all 0.3s;

  & svg {
    height: 24px;
    width: 24px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;

  &.centered {
    align-items: center;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 18px;

  &.centered {
    margin-left: 16px;
  }
`;

export const TitleText = styled(Text)``;

export const Description = styled(Text)`
  color: ${({ theme }) => theme.colors.gray};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
  font-size: 13px;
`;

export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
`;
