import styled from 'styled-components';
import { Button } from '@secberus/components';

export const SectionText = styled.div`
  ${({ theme }) => theme.typography.bold}
  margin-bottom: 24px;
`;

export const CircleButton = styled(Button)`
  padding: 4px;
  margin-left: 12px;
  & svg {
    height: 24px;
    width: 24px;
    margin-right: 0;
  }
`;
