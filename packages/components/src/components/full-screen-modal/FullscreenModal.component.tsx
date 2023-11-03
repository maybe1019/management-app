import React from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/react';
import { AppBar } from '../app-bar';
import { LoadingOverlay } from '../loading-overlay/LoadingOverlay.component';
import { FullscreenModalProps } from './FullscreenModal.types';
import { FullPageModalContent } from './FullscreenModal.styled';

export const FullscreenModal: React.FC<FullscreenModalProps> = ({
  isLoading,
  title,
  children,
  onClose,
  backToLink,
  tag,
}) => {
  const history = useHistory();

  /**
   * Handle close resolution:
   * 1. Both `onClose` and `backToLink` defined, run onClose, then navigate
   * 2. Only `backToLink` defined, navigate there
   * 3. Only `onClose` defined, execute that function
   * 4. Neither defined: Fallback to /overview dashboard
   */
  const handleClose = () => {
    if (onClose && backToLink) {
      onClose();
      history.push(backToLink);
    } else if (backToLink) {
      history.push(backToLink);
    } else if (onClose) {
      onClose();
    } else {
      history.push('/');
    }
  };

  return (
    <Flex h="100dvh" flexDirection="column" overflowY="auto">
      <AppBar title={title} onClose={handleClose} tag={tag} />
      <FullPageModalContent>
        {isLoading ? (
          <Box h="100%" w="100%" position="relative">
            <LoadingOverlay view="component" />
          </Box>
        ) : (
          children
        )}
      </FullPageModalContent>
    </Flex>
  );
};
