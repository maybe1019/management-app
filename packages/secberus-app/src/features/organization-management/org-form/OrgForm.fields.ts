import { Org } from '@secberus/services';
import { ComposedFormFields } from '../../form-builder';

export const useCreateOrgFormFields = (): ComposedFormFields<Org> => [
  {
    name: 'name',
    inputType: 'field',
    label: 'Name',
    placeholder: 'ACME Global',
  },
];
