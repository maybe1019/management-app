import styled, { css } from 'styled-components/macro';

const HoveredExpanderCellBeforePseudo = css`
  content: '';
  z-index: 5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) =>
    `linear-gradient(270deg, ${theme.colors['light-blue']} 27.14%, rgba(222, 238, 254, 0) 106.36%)`};
`;

const HoveredExpanderCellButton = css`
  display: flex;
  pointer-events: all;
`;

export const HoveredExpanderCell = css`
  .overlay-expander-cell {
    &::before {
      ${HoveredExpanderCellBeforePseudo};
    }
    .overlay-expander-cell-button {
      ${HoveredExpanderCellButton};
    }
  }
`;

// Use this if you have subtables
export const ScopedHoveredExpanderCell = css`
  & > .overlay-expander-cell {
    &::before {
      ${HoveredExpanderCellBeforePseudo};
    }
    .overlay-expander-cell-button {
      ${HoveredExpanderCellButton};
    }
  }
`;

export const StyledOverlayExpanderCell = styled.span`
  margin: 0;
  width: 100%;
  min-height: 100%;
  height: inherit;
  overflow: hidden;

  .overlay-expander-cell-button {
    z-index: 200;
    display: none;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
  }

  .with-icon {
    padding-left: 8px;
  }
`;
