import * as yup from 'yup';
import { PolicyCategory } from '@secberus/services';

const requiredMessage = 'This is required';

export const createPolicyCategoryFormSchema: yup.SchemaOf<
  Pick<PolicyCategory, 'name'>
> = yup.object({
  name: yup.string().trim().required(requiredMessage),
});
