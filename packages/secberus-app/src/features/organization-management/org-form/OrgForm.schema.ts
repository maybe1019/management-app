import * as yup from 'yup';
import { Org } from '@secberus/services';

const requiredMessage = 'This is required';

export const updateCreateOrgSchema: yup.SchemaOf<Pick<Org, 'name'>> =
  yup.object({
    name: yup.string().required(requiredMessage),
  });
