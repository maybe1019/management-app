import React from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';
import { CaretDown, CaretUp } from '@secberus/icons';
import { Offset } from '@restart/ui/usePopper';
import { List } from '../list';
import { ClickAwayListener } from '../click-away-listener/ClickAwayListener.component';
import { ButtonLoader } from '../button';
import {
  StyledButton,
  DropdownTrigger,
  SplitButtonBase,
} from './SplitButton.styled';
import { SplitButtonProps } from './SplitButton.types';

interface MenuPortalProps {
  appendTo?: Element;
  controlElement?: string;
  placement?: string;
  children?: React.ReactNode;
  referenceElementRef?: HTMLButtonElement | null;
  containerProps?: any;
}

/**
 * Simplified version of the MenuPortal component that exists in the app.
 * That old component will eventually be replaced with this one along with the hook to
 * automatically handle positioning of all menu dropdowns.
 */
const MenuPortal = React.forwardRef<HTMLDivElement, MenuPortalProps>(
  ({ children, appendTo, containerProps }, ref) => {
    const Element = (
      <div ref={ref} {...containerProps}>
        {children}
      </div>
    );

    return appendTo ? createPortal(Element, appendTo) : Element;
  }
);

export interface UseMenuPortalProps {
  placement?: Placement;
  offset?: Offset;
}

const useMenuPortal = ({
  placement = 'auto',
  offset = [0, 0],
}: UseMenuPortalProps) => {
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset,
        },
      },
    ],
  });

  return {
    styles,
    attributes,
    Component: MenuPortal,
    setReferenceElement,
    setPopperElement,
    containerProps: {
      ref: setPopperElement,
      style: { ...styles.popper, zIndex: 9999 },
      ...attributes.popper,
    },
  };
};

export const SplitButton: React.FC<SplitButtonProps> = ({
  children,
  id,
  disabled,
  onClick,
  variant = 'primary',
  className,
  isLoading,
  type = 'button',
  color,
  background,
  endIcon,
  icon,
  to,
  size = 'default',
  desc,
  options = [],
  ...rest
}) => {
  const buttonId = id ?? uuid();
  const [showDropdown, setShowDropdown] = React.useState(false);

  const { setPopperElement, containerProps, Component, setReferenceElement } =
    useMenuPortal({ placement: 'bottom-end' });

  const buttonStyleProps = {
    className: classNames(
      variant,
      size,
      {
        disabled: disabled || isLoading,
        loading: isLoading,
        endIcon,
        icon,
      },
      className
    ),
    disabled,
    color,
    background,
  };

  const Icon = showDropdown ? CaretUp : CaretDown;

  return (
    <>
      <SplitButtonBase id={buttonId} data-tip={desc} data-for={buttonId}>
        <StyledButton {...buttonStyleProps} onClick={onClick} {...rest}>
          {isLoading && <ButtonLoader size={size} />}
          {children}
        </StyledButton>
        <DropdownTrigger
          {...buttonStyleProps}
          ref={setReferenceElement}
          onClick={e => {
            e.stopPropagation();
            setShowDropdown(prev => !prev);
          }}
        >
          <Icon width="24px" height="24px" />
        </DropdownTrigger>
      </SplitButtonBase>
      {showDropdown && (
        <Component ref={setPopperElement} containerProps={containerProps}>
          <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
            <List elevation borderRadius={24} options={options} />
          </ClickAwayListener>
        </Component>
      )}
    </>
  );
};
