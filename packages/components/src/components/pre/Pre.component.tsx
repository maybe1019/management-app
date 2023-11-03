import styled, { css } from 'styled-components';

export interface PreProps {
  wrapText?: boolean;
}

export const StyledPre = styled.pre<PreProps>`
  ${props =>
    props.wrapText &&
    css`
      white-space: pre-line;
    `}
`;
