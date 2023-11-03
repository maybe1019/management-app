import styled from 'styled-components';
import { NoDataBlockProps } from './NoDataBlock.types';

export const StyledNoDataBlock = styled.div<NoDataBlockProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ padding }) => padding};

  svg {
    & circle,
    path {
      stroke: ${({ theme }) => theme.colors['gray']};
    }
  }
`;
