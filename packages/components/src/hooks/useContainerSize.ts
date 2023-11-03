import React from 'react';

interface ElementSizeProps {
  width: number | undefined;
  height: number | undefined;
}

export const useContainerSize: (node?: HTMLElement) => ElementSizeProps =
  node => {
    const [size, setSize] = React.useState<ElementSizeProps>({
      width: undefined,
      height: undefined,
    });
    React.useEffect(() => {
      const handleResize = () => {
        setSize({
          width: node?.offsetWidth ?? 0,
          height: node?.offsetHeight ?? 0,
        });
      };
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }, [node]);

    return size;
  };
