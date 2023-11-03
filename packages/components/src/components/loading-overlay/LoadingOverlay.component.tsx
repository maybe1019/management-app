import React from 'react';
import styled, { css } from 'styled-components';
import { Wavyloader } from '../wavy-loader/WavyLoader.component';

export type View = 'component' | 'screen';

export interface LoadingOverlayProps {
  view?: View;
  className?: string;
  backgroundColor?: string | false;
}

export const Overlay = styled.div<{
  view: View;
  backgroundColor: string | null;
}>`
  ${({ view }) => css`
    ${view === 'screen'
      ? 'height: 100vh; width: 100vw; position: fixed;'
      : 'height: 100%; width: 100%; position: absolute;'}
  `}
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  background-color: ${({ backgroundColor }) => backgroundColor};
  z-index: 999;
`;

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  view = 'component',
  className,
  backgroundColor = 'rgb(0 0 0 / 35%)',
}) => (
  <Overlay
    view={view}
    className={className}
    backgroundColor={backgroundColor ? backgroundColor : null}
  >
    <Wavyloader />
  </Overlay>
);
