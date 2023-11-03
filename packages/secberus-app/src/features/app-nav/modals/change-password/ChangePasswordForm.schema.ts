import * as yup from 'yup';

export const changePasswordFormSchema = yup.object().shape({
  oldPassword: yup.string().required().label('Old password'),
  newPassword: yup
    .string()
    .required()
    .label('New password')
    .min(8, 'Must be at least 8 characters')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[!@#$%^&*?]/, 'Must contain at least one special character'),
  confirmPassword: yup
    .string()
    .required()
    .label('Confirm password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});
