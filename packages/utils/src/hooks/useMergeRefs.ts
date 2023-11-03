/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';

type ReactRef<T> = React.Ref<T> | React.MutableRefObject<T>;

export function assignRef<T = any>(ref: ReactRef<T> | undefined, value: T) {
  if (ref == null) return;

  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  try {
    // @ts-expect-error "cannot assign to 'current' because it is a read-only property.". Yes we can.
    ref.current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
}

/**
 * React hook that merges react refs into a single memoized function
 *
 * @example
 * import React from "react";
 * import { useMergeRefs } from `@secberus/utils`;
 *
 * const Component = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef();
 *   const refs = useMergeRefs(internalRef, ref)
 *   return <div {...props} ref={refs} />;
 * });
 */
export function useMergeRefs<T>(...refs: (ReactRef<T> | undefined)[]) {
  return React.useMemo(() => {
    if (refs.every(ref => ref == null)) {
      return null;
    }
    return (node: T) => {
      refs.forEach(ref => {
        if (ref) assignRef(ref, node);
      });
    };
  }, refs);
}
