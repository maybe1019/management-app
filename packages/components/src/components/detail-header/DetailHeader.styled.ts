import styled from 'styled-components';
import { DetailHeaderProps } from './DetailHeader.types';

// Will overflow and disable styled components linting without eslint-disable
// eslint-disable-next-line
export const DetailHeaderContainer = styled.div<Pick<DetailHeaderProps, 'marginBottom'>>`
  width: 100%;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors['light-gray']};
  margin-bottom: ${({ marginBottom }) => marginBottom};
`;
