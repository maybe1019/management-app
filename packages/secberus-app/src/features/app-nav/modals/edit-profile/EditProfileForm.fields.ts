import { User } from '@secberus/services';
import { ComposedFormFields } from '../../../form-builder';

export const useFormFields = (): ComposedFormFields<User> => [
  {
    inputType: 'field',
    name: 'name',
    label: 'First name',
    placeholder: 'Johnny',
  },
  {
    inputType: 'field',
    name: 'family_name',
    label: 'Family name',
    placeholder: 'Applesprout',
  },
];
