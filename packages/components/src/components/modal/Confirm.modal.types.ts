import { ButtonProps } from '../button';
import { BaseModalProps } from './Base.Modal.types';

export interface ConfirmModalProps extends BaseModalProps {
  message?: string;
  allowCancel?: boolean;
  btnOpts?: ButtonProps;
  btnText?: string;
  useTitle?: boolean;
  align?: 'left' | 'center' | 'right';
}
