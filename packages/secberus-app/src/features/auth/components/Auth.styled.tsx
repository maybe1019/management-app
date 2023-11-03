import styled from 'styled-components';

export const NotificationBox = styled.div`
  background-color: ${({ theme }) => theme.colors['light-blue']};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.dark};
  padding: 16px 20px 20px 20px;
  width: 440px;
`;
