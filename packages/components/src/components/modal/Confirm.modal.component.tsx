import React from 'react';
import { Text } from '../text/Text.component';
import { Button } from '../button/Button.component';
import { BaseModal } from './Base.Modal.component';
import { ConfirmModalProps } from './Confirm.modal.types';
import { ButtonContainer, InnerContainer } from './Confirm.modal.styled';

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  isVisible,
  handleClose,
  children,
  allowCancel = true,
  btnOpts,
  btnText = 'Delete',
  useTitle = true,
  align = 'left',
  className,
  ...restBaseModalProps
}) => (
  <BaseModal
    isVisible={isVisible}
    title={useTitle ? title || 'Confirm Delete' : ''}
    handleClose={() => handleClose?.(false)}
    className={className}
    {...restBaseModalProps}
  >
    <InnerContainer align={align}>
      <div className="innerContainerDiv">
        <Text type="regular">{children}</Text>
        <ButtonContainer>
          <Button
            variant="destructive"
            type="button"
            onClick={() => handleClose?.(true)}
            {...btnOpts}
          >
            {btnText}
          </Button>
          {allowCancel && (
            <Button
              variant="secondary"
              type="button"
              onClick={() => handleClose?.(false)}
            >
              Cancel
            </Button>
          )}
        </ButtonContainer>
      </div>
    </InnerContainer>
  </BaseModal>
);
