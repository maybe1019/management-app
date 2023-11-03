import { AnyFn } from '@secberus/utils';

export interface FullscreenModalProps {
  title?: string;
  onClose?: AnyFn;
  isLoading?: boolean;
  backToLink?: string;
  tag?: string;
}
