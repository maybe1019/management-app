import React from 'react';
import classNames from 'classnames';
import {
  StyledCheckbox,
  Label,
  CheckboxInput,
  Checkmark,
} from './Checkbox.styled';
import { CheckboxProps } from './Checkbox.types';

/**
 * @remarks
 *
 * One of `name`, `id`, or `ref` is required
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      label,
      labelType = 'regular',
      name,
      disabled,
      checked,
      onChange,
      children,
      defaultChecked,
      className,
      indeterminate,
      gutterBottom = true,
      ...rest
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent) => e.stopPropagation();
    return (
      <StyledCheckbox
        className={classNames(className, {
          disabled,
          indeterminate,
          gutterBottom,
        })}
        tabIndex={0}
        onClick={handleClick}
        id={`${id || name}_wrapper`}
      >
        <CheckboxInput
          id={id || name}
          ref={ref}
          type="checkbox"
          disabled={disabled}
          tabIndex={-1}
          onChange={onChange}
          name={name}
          checked={checked}
          defaultChecked={defaultChecked}
          {...rest}
        />
        <Label htmlFor={id || name} labelType={labelType}>
          <Checkmark className={classNames({ disabled, indeterminate })} />
          {label || children}
        </Label>
      </StyledCheckbox>
    );
  }
);
