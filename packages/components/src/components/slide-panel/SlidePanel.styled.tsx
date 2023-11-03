import styled from 'styled-components';
import { Box, BoxProps } from '@chakra-ui/react';
import { styledOnHoverScrollbar } from '../../css';
import { SlidePanelToggleBoxProps } from './SlidePanel.types';

export const ModalOverlay = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: ${({ theme }) => theme.transparent.mid.dark};
  z-index: 1000;
`;

export const StyledPanel = styled.div`
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0;
  z-index: 1001;
`;

export const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  overflow: hidden;
  z-index: 1001;
`;

export const SlidePanelContent = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: column;
  width: ${({ width = 784 }) => `${width}px`};
  height: 100vh;
  overflow-y: hidden;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const SlidePanelHeader = styled(Box)<
  BoxProps & { noMinHeight?: boolean }
>`
  position: relative;
  ${({ noMinHeight }) => noMinHeight && { minHeight: '204px' }};
  height: auto;
  padding: 40px 40px 32px 40px;
  background-color: ${({ theme }) => theme.colors['light-gray']};
`;

export const SlidePanelHeaderControls = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 16px;
  right: 24px;
  z-index: 200;

  .position {
    margin-right: 16px;
  }

  .close-icon {
    margin-left: 24px;
  }
`;

export const SlidePanelBody = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: hidden;
`;

export const SlidePanelScrollbox = styled.div`
  ${styledOnHoverScrollbar()};
  padding: 0 40px 30px;
  height: inherit;
  overflow: auto;
`;

export const SlidePanelMetaTextContainer = styled.div`
  display: flex;
  grid-gap: 24px;
  margin-top: 4px;
`;

export const SlidePanelButtonContainer = styled.div`
  display: flex;
  grid-gap: 8px;
  margin-top: 24px;
`;

export const SlidePanelTitle = styled.h2`
  ${({ theme }) => theme.typography.small};
`;

export const StyledSlidePanelBlockSection = styled.div`
  margin-bottom: 8px;
`;

export const StyledSlidePanelSubtitleGroup = styled.h3`
  ${({ theme }) => theme.typography.xsmall};
  position: relative;
  margin-bottom: 16px;
  padding: 24px 0 16px;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors['light-gray']};
  }
`;

export const StyledSlidePanelGridRow = styled.div`
  display: grid;
  grid-template-columns: 156px 1fr;
  margin-bottom: 8px;
`;

export const SlidePanelToggleBoxTrigger = styled.p`
  ${({ theme }) => theme.typography['small-regular']};
  text-decoration: underline;
  text-decoration-thickness: 1px;
  cursor: pointer;
  user-select: none;
`;

export const SlidePanelToggleBox = styled.div<SlidePanelToggleBoxProps>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  padding-top: 16px;
  grid-column: ${({ gridColumn }) => gridColumn ?? '1 / span 2'};
`;
