import React from 'react';
import type { FlexboxProps } from '@chakra-ui/react';

export type CarouselProps = {
  items: React.ReactNode[];
  flexProps?: FlexboxProps;
  steps?: number;
};

// Only allow the value property if you pass RECONCILE for a type
export type CarouselReducer = {
  action:
    | {
        type: 'FORWARD' | 'BACK';
      }
    | {
        type: 'RECONCILE';
        value: CarouselProps['items'];
      }
    | {
        type: 'JUMP';
        value: number;
      };
  state: CarouselProps['items'];
};
