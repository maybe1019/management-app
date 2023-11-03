import { AnyObjectSchema } from 'yup';
import Lazy from 'yup/lib/Lazy';
import { User } from '@secberus/services';

export interface UserFormProps {
  onClose?: () => void;
  onSubmit?: (user: User) => void;
  data?: Partial<User>;
  fields?: Partial<keyof User>[];
  schema?: AnyObjectSchema | Lazy<any, any>;
  userId?: string;
  className?: string;
  overlayZIndex?: number;
  showDelete?: boolean;
}
