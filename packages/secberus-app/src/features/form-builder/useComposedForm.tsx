import React from 'react';
import _ from 'lodash';
import { UseComposedForm, Form, FormInput } from './';

export const useComposedForm = <Schema,>({
  fields,
  formProps,
}: UseComposedForm<Schema>) => {
  const ComposedForm: React.FC = () => (
    <Form<Schema> {...formProps}>
      {fields.map(({ name, label, placeholder, ...rest }) => (
        <FormInput
          name={name}
          label={label ?? _.startCase(_.camelCase(name))}
          placeholder={placeholder ?? _.startCase(_.camelCase(name))}
          noMargin
          gridItemOpts={{ colSpan: 1, rowSpan: 2 }}
          {...rest}
        />
      ))}
    </Form>
  );

  return { ComposedForm };
};
