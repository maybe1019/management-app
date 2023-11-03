/* eslint-disable react/forbid-prop-types */
import * as yup from 'yup';

const requiredMessage = `This is required`;

const recursiveAny = o =>
  Object.values(o).some(v => v && (typeof v === 'boolean' || recursiveAny(v)));

export const schema = yup.object().shape({
  name: yup.string().trim().required(requiredMessage),
  isAllViolations: yup.boolean(),
  filters: yup.mixed().when('isAllViolations', {
    is: false,
    then: yup.mixed().test('required', requiredMessage, function () {
      const { filters: values } = this.parent;
      return recursiveAny(values ?? {});
    }),
  }),
  actions: yup.mixed().test('required', requiredMessage, function () {
    const { actions } = this.parent;
    return Object.values(actions ?? {}).some(Boolean);
  }),
});
