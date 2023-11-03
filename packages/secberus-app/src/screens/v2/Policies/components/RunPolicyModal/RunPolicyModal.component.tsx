import React from 'react';
import styled from 'styled-components';
import { Flex } from '@chakra-ui/react';
import { BaseModal, Button, Text } from '@secberus/components';

interface RunPolicyModalProps {
  isLoading?: boolean;
  name?: string;
  open: boolean;
  onRequestClose: () => void;
}

export const StyledModal = styled(BaseModal)`
  min-width: 490px;
  max-width: 490px;
`;

export const RunPolicyModal = ({
  isLoading,
  name,
  open,
  onRequestClose,
}: RunPolicyModalProps) => (
  <>
    {open ? (
      <StyledModal
        //@ts-expect-error badly typed
        fixedOverScreen
        variant="light"
        title="Policy execution scheduled"
        handleClose={onRequestClose}
        isVisible={open}
        isLoading={isLoading}
      >
        <Text type="small-regular">
          The policy you requested to run has been scheduled{name ? ' for' : ''}
          <strong>{name ? ` ${name}` : ''}</strong>. The scan could take up to
          15 minutes. The Policy last run timestamp will update when the scan
          has finished. Please check back or refresh the screen to see the
          updates.
        </Text>
        <Flex pt="48px">
          <Button onClick={onRequestClose}>Close</Button>
        </Flex>
      </StyledModal>
    ) : null}
  </>
);
