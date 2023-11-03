import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().trim().required('Name is a required field'),
  data: yup.object().shape({
    client_id: yup.string().trim().required('Client ID is a required field'),
    client_secret: yup
      .string()
      .trim()
      .required('Secret Key is a required field'),
    tenant_id: yup.string().trim().required('Tenant ID is a required field'),
    subscription_id: yup
      .string()
      .trim()
      .required('Subscription ID is a required field'),
  }),
});
