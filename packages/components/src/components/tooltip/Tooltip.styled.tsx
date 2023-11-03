import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

export const StyledTooltip = styled(ReactTooltip)`
  &.styled-tooltip {
    ${({ theme }) => theme.typography['xsmall-bold']};
    box-shadow: 0px 8px 24px 0px #00000014;
    border-radius: 8px;
    max-width: 350px;
    list-style-position: inside;
    padding: 0;
    pointer-events: auto !important;
    background: ${({ theme }) => theme.colors['dark-gray']};

    &:hover {
      visibility: visible !important;
      opacity: 1 !important;
    }
    &.show {
      opacity: 1;
    }
  }

  p {
    color: white;
  }
  ul {
    margin-bottom: 0;
    top: 5px;
    padding-inline-start: 15px;

    li,
    p {
      color: white;
    }
  }
`;

export const TooltipLabel = styled.div`
  color: #fff;
  padding: 6px 16px 8px;
  &.longText {
    padding: 16px 20px 18px;
    word-break: break-all;
    max-width: calc(50ch + 32px);
  }
`;
