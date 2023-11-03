import React from 'react';
import { Flex } from '@chakra-ui/react';
import styled from 'styled-components';
import { forceRefreshToken } from '@secberus/services';
import { BaseModal, Text, Button } from '@secberus/components';
import { signOut } from '@secberus/services';
import { useSession } from '../../../utils/wrappers/SessionProvider';
import { useCountDown, UseCountDownProps } from '../../../utils/useCountDown';
import { useFocusListener } from '../../../hooks/useFocusListener';

const StyledModal = styled(BaseModal)`
  width: 490px;
  min-height: 312px;
  background-color: #ffffff;
`;

export const SessionTimeoutModal = () => {
  const {
    showModal,
    hideModal,
    sessionState: { isVisible },
  } = useSession();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [deadline, setDeadline] = React.useState<UseCountDownProps['deadline']>(
    Date.now() + 180000
  );

  const { timeLeft } = useCountDown({
    start: modalOpen,
    deadline: deadline,
  });
  const { resetTimer } = useFocusListener(
    isVisible,
    setModalOpen,
    showModal,
    setDeadline
  );
  const logoutTime = 180000;

  const continueSession = () => {
    (async () => {
      await forceRefreshToken();
      hideModal();
      resetTimer();
      setModalOpen(false);
    })();
  };

  const logout = React.useCallback(() => {
    setModalOpen(false);
    hideModal();
    signOut({});
  }, [hideModal, setModalOpen]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (isVisible) {
        logout();
      }
    }, logoutTime);

    return () => clearTimeout(timeout);
  }, [isVisible, logout]);

  return (
    <StyledModal
      title="Session timeout"
      isVisible={modalOpen}
      options={{
        closeIcon: false,
        fixedOverScreen: true,
        useBackground: true,
        useAnimation: true,
      }}
      variant="light"
    >
      <Text type="small-regular">
        You’ve been inactive for awhile. For your security, we’ll automatically
        log you out in approximately <b>{timeLeft}. </b>
        You may choose “Continue session” to stay logged in or logout if you’re
        done.
      </Text>
      <Flex marginTop="48px" gridGap="8px">
        <Button variant="primary" onClick={() => continueSession()}>
          Continue session
        </Button>
        <Button variant="secondary" onClick={() => logout()}>
          Logout
        </Button>
      </Flex>
    </StyledModal>
  );
};
