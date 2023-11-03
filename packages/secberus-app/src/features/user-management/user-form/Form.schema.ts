import * as yup from 'yup';
import { User } from '@secberus/services';

const requiredMessage = 'This is required';

export const createUserFormSchema: yup.SchemaOf<
  Pick<User, 'family_name' | 'name' | 'username'>
> = yup.object({
  username: yup.string().email().required(requiredMessage),
  name: yup.string().required(requiredMessage),
  family_name: yup.string().required(requiredMessage),
});

export const updateUserFormSchema: yup.SchemaOf<
  Pick<User, 'family_name' | 'name'>
> = yup.object({
  name: yup.string().required(requiredMessage),
  family_name: yup.string().required(requiredMessage),
});

export const orgsSchema = yup.object().shape({
  user_count: yup.number().optional(),
  datasource_count: yup.number().optional(),
  name: yup.string().required('Org name is required'),
  description: yup.string().optional(),
  id: yup.string().required('Org id is required'),
});

export const rolesSchema = yup.object().shape({
  secberus_managed: yup.boolean().required(),
  name: yup.string().required('Role name is required'),
  id: yup.string().required('Role id is required'),
});
