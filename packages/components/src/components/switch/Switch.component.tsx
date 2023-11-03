import React from 'react';
import classNames from 'classnames';
import { Spinner } from '@chakra-ui/react';
import { SwitchProps } from './Switch.types';
import {
  InnerDash,
  Input,
  SliderBall,
  SliderContainer,
  SwitchContainer,
} from './Switch.styled';

/**
 * The <Switch /> component manages its own state and acts as somewhat of an
 * uncontrolled component. It now does optimistic updates so that the user
 * interaction is greatly improved by being responsive instead of waiting for
 * a backend response. There are two ways to use this component, (1) simply
 * listening for changes; and (2) listening and syncing state with changes.
 *
 * 1. Listening for changes
 * Simply use the `onChange` function, and it will call a function when the
 * switch is toggled, reporting its value.
 *
 * 2.Syncing state with changes
 * Use the `updateCheckboxState` and return a promise that resolves or reject.
 * If resolved, you may pass the value to resolve to, if none, the predictive
 * state is used which is the intended state. If void Promise is used, it will
 * resolve to the predictive state. If promise is rejected, it rolls back to previous
 * switch state.
 */
export const Switch = React.forwardRef<
  HTMLInputElement,
  SwitchProps & React.InputHTMLAttributes<HTMLInputElement>
>(
  (
    {
      disabled,
      initialChecked,
      initialLoading,
      updateCheckboxState,
      className,
      onChange,
      ...rest
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = React.useState(!!initialLoading);
    const [tempChecked, setTempChecked] = React.useState(!!initialChecked);
    const [checked, setChecked] = React.useState(!!initialChecked);

    const handleCheckboxChange = React.useCallback(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isLoading) return; // Ignore clicks while loading

        setIsLoading(true);
        setTempChecked(prevState => !prevState);
        onChange?.(e, tempChecked);

        try {
          if (updateCheckboxState) {
            /*
             Await promise result if function is defined and use value
             as the new state. If no value, use predictive state.
            */
            setChecked(
              (await updateCheckboxState(e, tempChecked)) ?? tempChecked
            );
          }
        } catch (e) {
          // If fails, rollback the temp state to previous state
          setTempChecked(checked);
        }

        setIsLoading(false);
      },
      [checked, isLoading, onChange, tempChecked, updateCheckboxState]
    );

    return (
      <SwitchContainer
        className={classNames(className, { loading: isLoading })}
        onClick={e => e.stopPropagation()}
      >
        <Input
          type="checkbox"
          ref={ref}
          disabled={disabled}
          checked={tempChecked}
          onChange={handleCheckboxChange}
        />
        <SliderContainer>
          <SliderBall className={classNames({ loading: isLoading })}>
            <InnerDash />
            {isLoading && (
              <Spinner color="#ffffff" width="18px" height="18px" />
            )}
          </SliderBall>
        </SliderContainer>
      </SwitchContainer>
    );
  }
);
