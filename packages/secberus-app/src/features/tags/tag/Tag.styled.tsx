import styled from 'styled-components';
import { Text } from '@secberus/components';

export const TagContainer = styled.button`
  max-width: 300px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors['light-blue']};
  border: ${({ theme }) => `1px solid ${theme.colors['light-blue']}`};
  border-radius: 4px;
  display: flex;
  padding: 8px 12px;
  height: 32px;

  &:hover {
    background-color: ${({ theme }) => theme.colors['light-gray']};
    border: ${({ theme }) => `1px solid ${theme.colors.dark}`};
  }

  svg {
    & > path {
      stroke-width: 3px;
    }
  }
`;

export const DataKeyTagText = styled(Text)`
  white-space: nowrap;
  padding-left: 2px;
`;

export const TagText = styled(Text)`
  padding-left: 2px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const TimesContainer = styled.div`
  margin-left: 9px;
`;
