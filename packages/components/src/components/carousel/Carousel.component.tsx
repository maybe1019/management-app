import React from 'react';
import { ChevronLeft, ChevronRight } from '@secberus/icons';
import { Flex } from '@chakra-ui/react';
import { clone } from 'lodash';
import { Button } from '../button';
import {
  CarouselProps,
  CarouselReducer,
  CarouselContainer,
  CarouselControlContainer,
} from '.';

export function Carousel({ items, flexProps }: CarouselProps) {
  function reducer(
    state: CarouselReducer['state'],
    action: CarouselReducer['action']
  ) {
    const cloneState = clone(state);
    let cursor: React.ReactNode | React.ReactNode[];
    switch (action.type) {
      case 'RECONCILE':
        return action.value;
      case 'FORWARD':
        cursor = cloneState.shift();
        cloneState.push(cursor);
        break;
      case 'BACK':
        cursor = cloneState.pop();
        cloneState.unshift(cursor);
        break;
      default:
        break;
    }
    return cloneState;
  }
  const [components, dispatch] = React.useReducer<
    (
      prevState: CarouselReducer['state'],
      action: CarouselReducer['action']
    ) => CarouselReducer['state']
  >(reducer, items);

  /**
   * Rerender whenever parent items change
   */
  React.useEffect(() => {
    if (Array.isArray(items) && items.length) {
      dispatch({
        type: 'RECONCILE',
        value: items,
      });
    }
  }, [items]);

  /**
   * @description Automatically detects discrepancies
   * (an item has dropped from the virtual DOM).
   * If items are less than the reducers component length,
   * reconcile by replacing with the current components
   */
  React.useEffect(() => {
    if (items.length !== components.length) {
      dispatch({
        type: 'RECONCILE',
        value: items,
      });
    }
  }, [items, components]);

  return (
    <Flex
      flexDirection="row"
      {...flexProps}
      width="100%"
      className="outer-carousel-container"
    >
      <CarouselContainer>{components}</CarouselContainer>
      <CarouselControlContainer>
        <Button
          variant="tertiary"
          size="small"
          onClick={() => dispatch({ type: 'BACK' })}
          icon
          aria-label="Move carousel backward"
          className="carousel-button left-button"
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="tertiary"
          size="small"
          onClick={() => dispatch({ type: 'FORWARD' })}
          icon
          aria-label="Move carousel forward"
          className="carousel-button right-button"
        >
          <ChevronRight />
        </Button>
      </CarouselControlContainer>
    </Flex>
  );
}
