import * as yup from 'yup';
import { AccessRole, CreateRole } from '@secberus/services';

const requiredMessage = 'This is required';

export const createRoleSchema: yup.SchemaOf<
  Pick<CreateRole, 'name' | 'policy_ids'>
> = yup.object({
  name: yup.string().required(requiredMessage),
  policy_ids: yup.array().required(requiredMessage),
});

export const updateRoleSchema: yup.SchemaOf<Pick<AccessRole, 'name'>> =
  yup.object({
    name: yup.string().required(requiredMessage),
  });
