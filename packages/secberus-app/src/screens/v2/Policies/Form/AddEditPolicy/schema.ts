import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().trim().label('Name').required('Name is required'),
  label: yup.string().trim().label('ID').required('ID is required').min(3),
  policy_category_id: yup
    .string()
    .label('Category')
    .nullable()
    .required('Category is required'),
  description: yup
    .string()
    .label('Description')
    .trim()
    .required('Description is required'),
  enabled: yup.boolean().required(),
  remediation_steps: yup.string().trim().optional(),
  rationale: yup.string().trim().optional(),
  query: yup
    .string()
    .label('Policy logic')
    .required('Policy logic is required'),
});
