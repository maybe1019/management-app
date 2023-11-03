import * as yup from 'yup';

const requiredMessage = 'This is required';

//Type '{}' is missing the following properties from type 'AddSsoProvider': name, email_domains, client_id, client_secret, issuer_urlt
export const schema = yup.object().shape({
  // sso_enabled: yup.boolean(),
  name: yup
    .string()
    .trim()
    .when('sso_enabled', {
      is: true,
      then: yup.string().required(requiredMessage),
    }),
  email_domains: yup
    .string()
    .trim()
    .when('sso_enabled', {
      is: true,
      then: yup.string().required(requiredMessage),
    }),
  client_id: yup
    .string()
    .trim()
    .when('sso_enabled', {
      is: true,
      then: yup.string().required(requiredMessage),
    }),
  client_secret: yup
    .string()
    .trim()
    .when('sso_enabled', {
      is: true,
      then: yup.string().required(requiredMessage),
    }),
  issuer_url: yup
    .string()
    .trim()
    .when('sso_enabled', {
      is: true,
      then: yup.string().required(requiredMessage),
    }),
});
