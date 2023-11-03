import React from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import classNames from 'classnames';
import { TimesLight } from '@secberus/icons';
import { Spinner } from '@chakra-ui/react';
import { Button } from '../button/Button.component';
import { BaseModalProps } from './Base.Modal.types';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalContent,
} from './Base.Modal.styled';

const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  left: 0;
  top: 0;
  position: absolute;
  height: 100%;
  align-items: center;
  background: rgb(0 0 0 / 15%);
  border-radius: 16px 16px 0px 0px;
`;

const modalRoot = document.getElementById('modal') as HTMLElement;

export const ModalPortal: React.FC<{ portal?: boolean; root?: string }> = ({
  children,
  portal = true,
  root = 'modal',
}) => {
  if (!modalRoot || !portal) return <>{children}</>;
  return ReactDom.createPortal(
    children,
    document.getElementById(root) as HTMLElement
  );
};

export const BaseModal: React.FC<BaseModalProps> = ({
  children,
  root,
  title,
  options = {
    closeIcon: true,
    fixedOverScreen: true,
    useBackground: true,
    useAnimation: true,
    portal: true,
  },
  isVisible = true,
  variant = 'default',
  handleClose,
  className,
  loading,
  overlayZIndex,
}) => {
  return (
    <ModalPortal portal={options.portal} root={root}>
      <ModalOverlay
        className={`${
          options?.useAnimation ? 'modalAnimateOverlay' : ''
        } modal-overlay`}
        isVisible={isVisible}
        options={options}
        overlayZIndex={overlayZIndex}
      >
        <ModalContainer
          className={classNames(
            className,
            {
              modalIsVisible: isVisible && !!options.useAnimation,
              hasTitle: !!title,
            },
            variant
          )}
          fixedOverScreen={options.fixedOverScreen}
        >
          {title && (
            <ModalHeader className="modal-header">
              <ModalTitle className="modal-container">{title}</ModalTitle>
              {options.closeIcon && (
                <Button
                  icon
                  variant="tertiary"
                  onClick={handleClose}
                  data-test-id="closeModalButton"
                >
                  <TimesLight />
                </Button>
              )}
            </ModalHeader>
          )}
          <ModalContent className="modal-content">
            {children}
            {loading && (
              <SpinnerContainer>
                <Spinner />
              </SpinnerContainer>
            )}
          </ModalContent>
        </ModalContainer>
      </ModalOverlay>
    </ModalPortal>
  );
};
