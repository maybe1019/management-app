import React from 'react';
import { FadeScrollContainer, FadeLeft, FadeBottom } from './FadeScroll.styled';
import { FadeScrollProps } from './FadeScroll.types';

// allow some buffer in case children very little scroll capacity
const BUFFER = 4;

export const FadeScroll: React.FC<FadeScrollProps> = ({
  fadeLeft,
  className,
  children,
  dataTip,
  dataFor,
  fadeBottom,
  trigger,
}) => {
  const [hideFadeLeft, setHideFadeLeft] = React.useState(true);
  const [hideFadeBottom, setHideFadeBottom] = React.useState(true);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      const { scrollHeight, clientHeight, scrollWidth, clientWidth } =
        ref.current;
      if (fadeLeft && clientWidth <= scrollWidth - BUFFER)
        setHideFadeLeft(false);
      if (fadeBottom && clientHeight <= scrollHeight - BUFFER)
        setHideFadeBottom(false);
    }
  }, [fadeLeft, fadeBottom, trigger]);

  const handleVerticalScroll = (e: React.MouseEvent<HTMLDivElement>) => {
    const { scrollHeight, clientHeight, scrollTop } = e.currentTarget;
    const hasScrolledToBottom =
      scrollTop + clientHeight >= scrollHeight - BUFFER;
    setHideFadeBottom(hasScrolledToBottom);
  };

  const handleHorizontalScroll = (e: React.MouseEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    const hasScrolledToRight = scrollLeft + clientWidth >= scrollWidth - BUFFER;
    setHideFadeLeft(hasScrolledToRight);
  };

  return (
    <FadeScrollContainer
      ref={ref}
      className={className}
      onScroll={fadeLeft ? handleHorizontalScroll : handleVerticalScroll}
      data-tip={dataTip}
      data-for={dataFor}
    >
      {children}
      {fadeLeft && !hideFadeLeft && <FadeLeft />}
      {fadeBottom && !hideFadeBottom && <FadeBottom />}
    </FadeScrollContainer>
  );
};
