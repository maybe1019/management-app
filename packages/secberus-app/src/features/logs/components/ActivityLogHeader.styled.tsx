import { Select } from '@secberus/components';
import styled from 'styled-components';

export const StyledSelect = styled(Select)`
  .dark {
    background: ${({ theme }) => theme.colors.dark};
    min-width: 180px;
  }
`;
