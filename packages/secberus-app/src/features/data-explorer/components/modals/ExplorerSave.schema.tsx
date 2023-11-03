import * as yup from 'yup';
import { secberusApi } from '@secberus/services';

const requiredMessage = 'This is required';

export const saveViewSchema: yup.SchemaOf<
  Pick<secberusApi.SaveView, 'name' | 'query'>
> = yup.object({
  name: yup.string().required(requiredMessage),
  // Validation solely for continuity, should NEVER validate.
  query: yup.string().required(requiredMessage),
});
