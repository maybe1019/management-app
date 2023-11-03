import styled, { keyframes, css } from 'styled-components';
import {
  BaseModalOverlayProps,
  BaseModalContainerProps,
} from './Base.Modal.types';

const fadeIn = keyframes`
  0% {
    opacity: 0.2;
    transform: translate(-50%, -400%);  }
  100% {
    opacity: 1;
    transform: translateY(-50%, 30%)
  }
`;

const fadeInBackgroundOverlay = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const ModalOverlay = styled.div<BaseModalOverlayProps>`
  ${({
    options: { fixedOverScreen } = {
      fixedOverScreen: false,
      useBackground: true,
    },
  }) => {
    if (fixedOverScreen === true) {
      return {
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        overflowY: 'auto',
        top: '0px',
        left: '0px',
        justifyContent: '',
        alignItems: 'top',
      };
    }
    return '';
  }}
  background: ${({
    theme,
    options: { useBackground } = { useBackground: false },
  }) => (useBackground ? theme.transparent.mid.dark : 'transparent')};
  &.modalAnimateOverlay {
    animation: 0.5s ${fadeInBackgroundOverlay};
    animation-iteration-count: 1;
  }
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  z-index: ${({ options, overlayZIndex }) =>
    overlayZIndex ? overlayZIndex : options?.useBackground ? 1000 : 100};
`;

export const ModalContainer = styled.div<BaseModalContainerProps>`
  display: grid;
  grid-template-rows: min-content;
  &.hasTitle {
    grid-template-rows: 80px min-content;
  }
  max-width: 100%;
  max-height: 100%;
  height: fit-content;
  border-radius: 16px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);
  min-height: 108px;
  ${({ fixedOverScreen }) =>
    fixedOverScreen &&
    css`
      position: absolute;
      left: 50%;
      top: 30%;
      transform: translate(-50%, -30%);
    `};
  background: ${({ theme }) => theme.colors['white']};
  &.modalIsVisible {
    animation: 0.5s ${fadeIn};
    animation-iteration-count: 1;
  }
  &.light {
    background: ${({ theme }) => theme.colors.white};
  }
  z-index: 1001;
`;

export const ModalHeader = styled.div`
  background: ${({ theme }) => theme.colors['medium-gray']};
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px 16px 0px 0px;
`;

export const ModalTitle = styled.h2`
  ${({ theme }) => theme.typography.bold}
`;

export const ModalContent = styled.div`
  padding: 24px;
  max-height: 90vh;
  overflow: auto;
  height: 100%;
`;
