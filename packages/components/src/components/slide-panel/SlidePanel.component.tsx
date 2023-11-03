import React from 'react';
import ReactDom from 'react-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ClickAwayListener, Text } from '..';
import {
  ModalOverlay,
  StyledContainer,
  StyledPanel,
  StyledSlidePanelBlockSection,
  StyledSlidePanelGridRow,
  StyledSlidePanelSubtitleGroup,
} from './SlidePanel.styled';
import {
  SlidePanelBlockSectionProps,
  SlidePanelGridRowProps,
  SlidePanelProps,
} from './SlidePanel.types';

export const SlidePanelBlockSection = ({
  title,
  children,
}: SlidePanelBlockSectionProps) => (
  <StyledSlidePanelBlockSection>
    <StyledSlidePanelSubtitleGroup>{title}</StyledSlidePanelSubtitleGroup>
    {children}
  </StyledSlidePanelBlockSection>
);

export const SlidePanelGridRow = ({
  label,
  children,
}: SlidePanelGridRowProps) => (
  <StyledSlidePanelGridRow>
    <Text type="small-bold" color="gray">
      {label}
    </Text>
    {children}
  </StyledSlidePanelGridRow>
);

export const SlidePanel: React.FC<SlidePanelProps> = ({
  isVisible = false,
  onClose,
  unmount = false,
  children,
  clickaway = true,
  key = 'slide-panel',
}) => {
  //NOTE: prevents the ClickAwayListener from acting when the child components are not visible
  const [isActive, setIsActive] = React.useState(false);

  const overlayControls = useAnimation();
  const panelControls = useAnimation();

  React.useEffect(() => {
    if (isVisible) {
      panelControls.start({ x: '0' });
      overlayControls.start({ opacity: 1 });
    } else {
      overlayControls.start({ opacity: 0 });
      panelControls.start({ x: '100%' });
    }
  }, [isVisible, overlayControls, panelControls]);

  const handleClose = (e?: MouseEvent) => {
    setIsActive(false);
    onClose?.(e);
  };

  const ClickAway = clickaway ? ClickAwayListener : React.Fragment;
  const clickawayProps = {
    className: 'listen',
    onClickAway: (e?: MouseEvent) => {
      if (isActive && isVisible) {
        handleClose(e);
      }
      if (!isActive && isVisible) {
        return setIsActive(true);
      }
      return;
    },
  };

  return ReactDom.createPortal(
    <AnimatePresence>
      {(!unmount || isVisible) && (
        <div style={{ position: 'relative', zIndex: 1000 }}>
          <StyledContainer>
            {/* @ts-expect-error I don't know, but ts-ignore is worst than this. */}
            <ClickAway {...(clickaway ? clickawayProps : {})}>
              <motion.div
                key={`${key}-main`}
                initial={{ x: '100%' }}
                animate={panelControls}
                transition={{ duration: 0.5 }}
                exit={{ x: '0px', transition: { duration: 1 } }}
                style={{
                  position: 'fixed',
                  top: 0,
                  right: 0,
                  height: '100%',
                }}
              >
                <StyledPanel className="panel">
                  {React.cloneElement(children, { onClose: handleClose })}
                </StyledPanel>
              </motion.div>
            </ClickAway>
          </StyledContainer>
          {isVisible && (
            <motion.div
              key={`${key}-modal`}
              initial={{ opacity: 0 }}
              animate={overlayControls}
              exit={{ opacity: 0 }}
            >
              <ModalOverlay id="modal-overlay" />
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>,
    document.getElementById('modal') as HTMLElement
  );
};
