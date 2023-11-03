import React from 'react';
import ReactDOM from 'react-dom';

const coercePlacement = (p: string) => (p === 'auto' ? 'bottom' : p);

function getBoundingClientObj(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width,
  };
}

const menuPortalCSS = ({ rect, offset, position }: any) => ({
  left: rect.left,
  position: position,
  top: offset,
  width: rect.width,
  zIndex: 9999,
});

export const MenuPortal = ({
  appendTo,
  controlElement,
  menuPlacement = 'auto',
  menuPosition: position = 'absolute',
  children,
}: any) => {
  const isFixed = position === 'fixed';

  // bail early if required elements aren't present
  if ((!appendTo && !isFixed) || !controlElement) {
    return null;
  }

  const placement = coercePlacement(menuPlacement);
  const rect = getBoundingClientObj(controlElement) as any;

  const scrollDistance = isFixed ? 0 : window.pageYOffset;
  const offset = rect[placement] + scrollDistance;
  const state = { offset, position, rect };

  return appendTo ? (
    ReactDOM.createPortal(
      <div className="menu-portal" style={menuPortalCSS(state)}>
        {children}
      </div>,
      appendTo
    )
  ) : (
    <>{children}</>
  );
};
