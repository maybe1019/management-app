import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

export interface ClickAwayProps {
  onClickAway: (event?: MouseEvent) => void;
  className?: string;
  fullWidth?: boolean;
}

export const ClickAwayListener: React.FC<ClickAwayProps> = ({
  onClickAway,
  children,
  className,
  fullWidth,
}) => {
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEvents = (event: MouseEvent): void => {
      if (node.current && node.current.contains(event.target as Node)) {
        return;
      }
      onClickAway(event);
    };
    document.addEventListener('click', handleEvents);
    return () => {
      document.removeEventListener('click', handleEvents);
    };
  }, [onClickAway]);

  return (
    <Box className={className} ref={node} w={fullWidth ? '100%' : 'unset'}>
      {children}
    </Box>
  );
};
