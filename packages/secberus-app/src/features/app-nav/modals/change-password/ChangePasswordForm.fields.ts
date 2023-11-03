import { ComposedFormFields } from '../../../form-builder';

export interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const useFormFields = (): ComposedFormFields<ChangePasswordFormData> => [
  {
    inputType: 'field',
    name: 'oldPassword',
    label: 'Old password',
  },
  {
    inputType: 'field',
    name: 'newPassword',
    label: 'New password',
  },
  {
    inputType: 'field',
    name: 'confirmPassword',
    label: 'Confirm new password',
  },
];
