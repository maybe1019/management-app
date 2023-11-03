import styled from 'styled-components';
import { Button } from '../button';

export const StyledAppBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.dark};
`;

export const Tag = styled.div`
  margin: auto;
  padding: 0px 8px;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.purple};
`;

export const CloseButton = styled(Button)`
  border: 2px solid ${({ theme }) => theme.colors.transparent};
  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.white};
  }
`;
