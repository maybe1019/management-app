import { AnyObjectSchema } from 'yup';
import Lazy from 'yup/lib/Lazy';
import { AccessRole } from '@secberus/services';

export interface RoleFormProps {
  isEdit?: boolean;
  onClose?: () => void;
  onSubmit?: (...args: any) => void;
  schema?: AnyObjectSchema | Lazy<any, any>;
  roleId?: AccessRole['id'];
  fields?: Partial<keyof AccessRole>[];
}
