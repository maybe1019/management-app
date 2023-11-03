import styled from 'styled-components';

export const ResendEmailLink = styled.span`
  cursor: pointer;
  font-size: 15px;
  line-height: 24px;
  text-decoration-line: underline;
  color: ${({ theme }) => theme.colors.blue};
`;
