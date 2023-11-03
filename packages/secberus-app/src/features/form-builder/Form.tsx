import React, { PropsWithChildren } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Validation } from '@secberus/components';
import { useForm } from 'react-hook-form';
import { ComposeFormProps } from './';

/**
 * Any custom input that we want the form to handle
 * should be wrapped in react hook form controller
 * If a ref can be passed to it as a simple form, then you can use a generic
 * field. Otherwise, make sure to wrap your input in a controller
 */
export const Form = <Schema,>({
  defaultValues,
  children,
  onSubmit,
  schema,
  id,
  gridProps,
}: PropsWithChildren<ComposeFormProps<Schema>>) => {
  const { handleSubmit, control, errors, register, reset } = useForm({
    defaultValues: defaultValues as any,
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={e => {
        handleSubmit(onSubmit)(e);
        e.stopPropagation();
      }}
      id={id}
    >
      <Grid {...gridProps}>
        {React.Children.map(children, (child: any) => {
          if (!child) {
            return null;
          }
          const InputWrapper = child.props.gridItemOpts
            ? GridItem
            : React.Fragment;
          const inputWrapperProps = child.props.gridItemOpts
            ? child.props.gridItemOpts
            : {};
          return (
            <InputWrapper {...inputWrapperProps} key={child.props.name}>
              <Validation noMargin error={(errors as any)[child.props.name]}>
                {child.props.render || child.props.as // as prop will be deprecated
                  ? React.createElement(child.type, {
                      ...{
                        ...child.props,
                        control: control,
                        key: child.props.name,
                      },
                    })
                  : child.props?.name
                  ? React.createElement(child.type, {
                      ...{
                        ...child.props,
                        ref: register,
                        key: child.props.name,
                      },
                    })
                  : child}
              </Validation>
            </InputWrapper>
          );
        })}
      </Grid>
    </form>
  );
};
