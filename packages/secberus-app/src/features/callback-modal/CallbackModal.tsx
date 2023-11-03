import React from 'react';
import { ConfirmModal, Text } from '@secberus/components';
import {
  CallbackModalType,
  CallBackModalProps,
  CallBackModalRenderedModalProps,
} from './definitions';

const ConfirmModalComponent: React.FC<CallBackModalRenderedModalProps> = ({
  onClose,
  open,
  ...rest
}) => (
  <ConfirmModal
    title="Confirm"
    handleClose={onClose}
    isVisible={open}
    {...rest}
  >
    <Text type="bold">This action is non reversible.</Text>
  </ConfirmModal>
);

const getModalType = (type: CallbackModalType) => {
  switch (type) {
    case 'confirm':
      return ConfirmModalComponent;
  }
};

export const CallbackModal: React.FC<CallBackModalProps> = ({
  children,
  type = 'confirm',
  onClose = () => {},
  visible,
  renderModal,
  modalProps,
}) => {
  const ModalComponent = renderModal ?? getModalType(type);

  return (
    <ModalComponent open={visible} onClose={onClose} {...modalProps}>
      {children}
    </ModalComponent>
  );
};
