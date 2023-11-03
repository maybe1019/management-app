import { AnyObjectSchema } from 'yup';
import Lazy from 'yup/lib/Lazy';
import { Org } from '@secberus/services';

export interface OrgFormProps {
  onClose?: (...args: any) => void;
  onSubmit?: (...args: any) => void;
  schema?: AnyObjectSchema | Lazy<any, any>;
  orgId?: Org['id'];
  fields?: Partial<keyof Org>[];
}
