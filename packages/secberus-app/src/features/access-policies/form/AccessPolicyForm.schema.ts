import * as yup from 'yup';
import { CreateAccessPolicyApiArg } from '@secberus/services';
const requiredMessage = 'This is required';

export const createUpdateAccessPolicySchema: yup.SchemaOf<
  CreateAccessPolicyApiArg['createAccessPolicy']
> = yup.object({
  name: yup.string().required(requiredMessage),
  description: yup.string().required(requiredMessage),
  logic: yup.string().required(requiredMessage),
});
