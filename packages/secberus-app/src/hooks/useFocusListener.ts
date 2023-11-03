import { debounce } from 'lodash';
import React from 'react';
import { AnyFn } from '@secberus/utils';

const EVENTS = [
  'mousemove',
  'mousedown',
  'keypress',
  'DOMMouseScroll',
  'mousewheel',
  'touchmove',
  'MSPointerMove',
  'blur',
  'focus',
];

export const useFocusListener = (
  isVisible: boolean,
  setModalOpen: any,
  showModal: AnyFn,
  setDeadline: AnyFn
) => {
  const timeoutId = React.useRef<any>(); // todo: Type this in the future

  const resetTimer = () => {
    clearTimeout(timeoutId.current);
    startTimer();
  };

  const debounceEvent = debounce(resetTimer, 200);

  const setup = React.useCallback(() => {
    EVENTS.forEach(e => {
      if (e === 'blur' || e === 'focus') {
        window.addEventListener(e, debounceEvent);
      } else {
        document.addEventListener(e, debounceEvent);
      }
    });
  }, [debounceEvent]);

  const cleanUp = React.useCallback(() => {
    EVENTS.forEach(e => {
      if (e === 'blur' || e === 'focus') {
        window.removeEventListener(e, debounceEvent);
      } else {
        document.removeEventListener(e, debounceEvent);
      }
    });

    clearTimeout(timeoutId.current);
  }, [debounceEvent]);

  React.useEffect(() => {
    if (!isVisible) {
      setup();

      return () => {
        cleanUp();
        debounceEvent.cancel();
      };
    }
  }, [cleanUp, setup, isVisible, debounceEvent]);

  const startTimer = () => {
    timeoutId.current = setTimeout(goInactive, 1620000);
  };

  const goInactive = () => {
    setDeadline(Date.now() + 180000);
    showModal(true, {});
    setModalOpen(true);
  };

  return { resetTimer };
};
