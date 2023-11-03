import { User } from '@secberus/services';
import { ComposedFormFields } from '../../form-builder';

interface FormFieldProps {
  isEdit: boolean;
  adminRoleId?: number;
}

export const useFormFields = ({
  isEdit,
}: FormFieldProps): ComposedFormFields<User> => [
  {
    name: 'given_name',
    inputType: 'field',
    label: 'First name',
    placeholder: 'John',
  },
  {
    name: 'username',
    inputType: 'field',
    label: 'Email',
    placeholder: 'johnny@acme.org',
    gridItemOpts: {
      colSpan: 4,
      rowSpan: 2,
    },
  },
  {
    name: 'name',
    inputType: 'field',
    label: 'First name',
    placeholder: 'Johnny',
  },
  {
    name: 'family_name',
    inputType: 'field',
    label: 'Family name',
    placeholder: 'Applesprout',
  },
  {
    name: 'email',
    inputType: 'field',
    placeholder: 'orga@acme.org',
    readOnly: isEdit,
    gridItemOpts: {
      colSpan: 4,
      rowSpan: 2,
    },
  },
  {
    name: 'account_owner',
    label: 'Role',
    inputType: 'radio',
    options: [
      {
        label: 'Admin',
        value: 'true',
        subtext: 'Access to all organizations and can add/remove team members',
      },
      {
        label: 'User',
        value: 'false',
        subtext:
          'Must be assigned organizations and has no administrative permissions',
      },
    ],
    gridItemOpts: {
      colSpan: 4,
      rowSpan: 2,
    },
  },
];
