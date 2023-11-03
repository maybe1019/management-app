import React from 'react';
import { omit } from 'lodash';
import { CustomizedActiveDotProps } from './CustomizedActiveDot.types';

export const CustomizedActiveDot = React.forwardRef<
  HTMLElement & SVGCircleElement,
  CustomizedActiveDotProps
>((props, ref) => {
  const cirlceProps = omit(props, 'show');
  if (!props.show) return null;
  return <circle ref={ref} {...cirlceProps} />;
});
