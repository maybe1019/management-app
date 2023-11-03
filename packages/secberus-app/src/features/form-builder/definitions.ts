import { PropsWithChildren } from 'react';
import {
  InputProps,
  RadioGroupProps,
  CheckboxProps,
  TextAreaProps,
} from '@secberus/components';
import { GridItemProps, GridProps } from '@chakra-ui/react';
import { AnyObjectSchema } from 'yup';
import Lazy from 'yup/lib/Lazy';

type InputType = 'field' | 'checkbox' | 'radio' | 'textarea';

export type BaseFieldProps<
  Schema,
  ComponentType extends InputType = InputType
> = {
  gridItemOpts?: GridItemProps;
  name: keyof Schema;
  inputType: ComponentType;
  tooltip?: string;
};

export type ComposedFormFields<Schema> = (
  | ComposedFormField<Schema, 'radio', RadioGroupProps>
  | ComposedFormField<Schema, 'field', InputProps>
  | ComposedFormField<Schema, 'checkbox', CheckboxProps>
  | ComposedFormField<Schema, 'textarea', TextAreaProps>
)[];

export type ComposedFormField<
  Schema,
  ComponentType extends InputType = InputType,
  ComponentProps = InputProps
> = BaseFieldProps<Schema, ComponentType> & ComponentProps;

export interface UseComposedForm<Schema> {
  fields: ComposedFormField<Schema>[];
  formProps: PropsWithChildren<ComposeFormProps<Schema>>;
}

export type ComposeFormProps<Schema> = {
  schema: AnyObjectSchema | Lazy<any, any>;
  onSubmit: (...args: any) => void;
  defaultValues?: Partial<Schema>;
  id?: string;
  gridProps?: GridProps;
};

export type InputGridItemProps = {
  gridItemOpts: GridItemProps;
};

export type ComposedFormInput<T> = T & InputGridItemProps;
