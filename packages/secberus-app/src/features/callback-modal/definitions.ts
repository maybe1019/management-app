import { ConfirmModalProps } from '@secberus/components';

export type CallbackModalType = 'confirm';

export interface CallBackModalRenderedModalProps {
  onClose: () => void;
  modalProps?: Partial<ConfirmModalProps>;
  open: boolean;
}

export type UseCallbackModalProps = {
  type?: CallbackModalType;
  onClose?: (...args: any) => void;
  renderModal?: React.ElementType<CallBackModalRenderedModalProps>;
  modalProps?: Partial<ConfirmModalProps>;
};

export interface CallBackModalProps
  extends Pick<
    UseCallbackModalProps,
    'modalProps' | 'renderModal' | 'type' | 'onClose'
  > {
  visible: boolean;
}
