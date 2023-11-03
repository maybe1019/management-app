import React from 'react';
import classNames from 'classnames';
import {
  ToggleButtonContainer,
  StyledButton,
  ToggleLink,
} from './ToggleButton.styled';
import { ToggleProps } from './ToggleButton.types';

export const ToggleButton = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ buttons, onChange, name, value, className }, ref) => {
    const [selected, setSelected] = React.useState(value);

    const handleChange = (id: string, onClick?: () => void) => {
      setSelected(id);
      if (onChange) onChange(id);
      if (onClick) onClick();
    };
    return (
      <ToggleButtonContainer
        className={classNames('toggleButton-container', className)}
      >
        <input id={name} ref={ref} name={name} value={selected} />
        {buttons.map(({ id, display, icon, onClick = () => {}, to = '' }) => {
          const ToggleWrapper: any = to ? ToggleLink : StyledButton;
          return (
            <ToggleWrapper
              key={display}
              className={classNames('toggleOption', {
                isActive: selected === id,
              })}
              to={to}
              onClick={() => handleChange(id, onClick)}
            >
              {icon} {display}
            </ToggleWrapper>
          );
        })}
      </ToggleButtonContainer>
    );
  }
);
