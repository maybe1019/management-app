import React from 'react';
import ReactDOM from 'react-dom';
import { createEnvAwareLogger } from '@secberus/utils';
import { ToolTipProps } from '../Tooltip.types';

const logger = createEnvAwareLogger();

/**
 * Creates and returns a portal for the tooltip. By default the portal will
 * attempt to render the HTML element with into a container with the id of `tooltip`.
 * If the element is undefined, the tooltip is rendered normally in the DOM tree.
 * @param children
 * @param usePortal
 * @param portalElementId
 * @constructor
 */
export const TooltipPortal: React.FC<
  Pick<ToolTipProps, 'usePortal' | 'portalElementId'>
> = ({ children, usePortal, portalElementId = 'tooltip' }) => {
  const tooltipRoot = document.getElementById(portalElementId) as HTMLElement;
  if (usePortal && !tooltipRoot) {
    logger.log(
      `Tooltip attempting to portal into element (${portalElementId}), but the element doesn't exist. Rendered as normal child in DOM tree.`
    );
  }
  if (!usePortal || !tooltipRoot) return <>{children}</>;
  return ReactDOM.createPortal(children, tooltipRoot);
};
