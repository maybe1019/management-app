import React from 'react';
import { CallbackModal } from './CallbackModal';
import { UseCallbackModalProps } from './definitions';

export const useCallbackModal = ({
  type = 'confirm',
  onClose,
  renderModal,
  modalProps,
}: UseCallbackModalProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const showCallbackModal = () => setIsVisible(true);
  const hideCallbackModal = () => setIsVisible(false);

  const handleClose = (...args: any) => {
    hideCallbackModal();
    if (typeof onClose === 'function') onClose(...args);
  };

  const RenderCallbackModal: React.FC = ({ children }) => (
    <React.Fragment>
      {isVisible && (
        <CallbackModal
          onClose={handleClose}
          visible={isVisible}
          type={type}
          renderModal={renderModal}
          modalProps={modalProps}
        >
          {children}
        </CallbackModal>
      )}
    </React.Fragment>
  );

  return {
    showCallbackModal,
    hideCallbackModal,
    RenderCallbackModal,
  };
};
