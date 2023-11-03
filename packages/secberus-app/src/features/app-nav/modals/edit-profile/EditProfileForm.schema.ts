import * as yup from 'yup';
import { UpdateUser } from '@secberus/services';

const requiredMessage = 'This is required';

export const updateUserProfileSchema: yup.SchemaOf<
  Pick<UpdateUser, 'name' | 'family_name'>
> = yup.object({
  name: yup.string().required(requiredMessage),
  family_name: yup.string().required(requiredMessage),
});
