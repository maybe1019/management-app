import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().trim().required('Name is a required field'),
  data: yup.object().shape(
    {
      access_key_id: yup
        .string()
        .trim()
        .when('role_arn', {
          is: role => !role,
          then: yup
            .string()
            .trim()
            .required('Access key ID is a required field'),
          otherwise: yup.string().trim(),
        }),
      role_arn: yup
        .string()
        .trim()
        .when('access_key_id', {
          is: accessKey => !accessKey,
          then: yup
            .string()
            .trim()
            .required('Role ARN key is a required field'),
          otherwise: yup.string().trim(),
        }),
      secret_access_key: yup
        .string()
        .trim()
        .when('role_arn', {
          is: role => !role,
          then: yup
            .string()
            .trim()
            .required('Secret access key is a required field'),
          otherwise: yup.string().trim(),
        }),
      regions: yup
        .array()
        .min(1, 'Regions is a required field')
        .required('Regions is a required field'),
    },
    [['role_arn', 'access_key_id']]
  ),
});
