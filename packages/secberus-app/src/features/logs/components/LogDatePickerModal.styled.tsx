import styled from 'styled-components';

export const IconContainer = styled.span`
  svg {
    width: 24px;
    height: 24px;
    path {
      fill: ${({ theme }) => theme.colors['gray']};
    }
  }
`;

export const DatepickerInputContainer = styled.div<{ indented?: string }>`
  input {
    ${({ indented }) => (indented ? { textIndent: indented } : {})}
  }
`;
