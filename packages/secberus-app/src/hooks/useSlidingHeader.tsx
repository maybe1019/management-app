import React from 'react';
import { debounce } from 'lodash';

interface IhandleScroll {
  scrollOffset: number;
}

const useSlidingHeader = () => {
  const [lastScrollPos, setLastScrollPos] = React.useState<
    number | undefined
  >();
  const [visible, setVisible] = React.useState(true);

  const handleScroll = debounce(({ scrollOffset }: IhandleScroll) => {
    setLastScrollPos(scrollOffset);
    if (typeof lastScrollPos === 'undefined') return setVisible(true);
    if (lastScrollPos > scrollOffset) return setVisible(true);
    return setVisible(false);
  }, 10);

  return { handleScroll, visible };
};

export default useSlidingHeader;
