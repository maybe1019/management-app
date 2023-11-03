import * as yup from 'yup';

const reqMessage = 'Required field';

export const validationSchema = yup.object().shape({
  name: yup.string().trim().required(reqMessage),
  data: yup.object().shape({
    pastedJSON: yup
      .string()
      .when(
        [
          'creds.type',
          'creds.project_id',
          'creds.private_key_id',
          'creds.private_key',
          'creds.client_email',
          'creds.client_id',
          'creds.auth_uri',
          'creds.token_uri',
          'creds.auth_provider_x509_cert_url',
          'creds.client_x509_cert_url',
        ],
        {
          is: (...args) => args.some(a => !a),
          then: yup.string().trim().required(reqMessage),
          otherwise: yup.string().trim(),
        }
      ),
    projects: yup.string().trim().required(reqMessage),
    creds: yup.object({
      type: yup.string().trim().required(reqMessage),
      project_id: yup.string().trim().required(reqMessage),
      private_key_id: yup.string().trim().required(reqMessage),
      private_key: yup.string().trim().required(reqMessage),
      client_email: yup.string().trim().required(reqMessage),
      client_id: yup.string().trim().required(reqMessage),
      auth_uri: yup.string().trim().required(reqMessage),
      token_uri: yup.string().trim().required(reqMessage),
      auth_provider_x509_cert_url: yup.string().trim().required(reqMessage),
      client_x509_cert_url: yup.string().trim().required(reqMessage),
    }),
  }),
});
