import React from 'react';
import { ConfirmModal, Text } from '@secberus/components';
import { selectIsAuthenticated, signOut } from '@secberus/services';
import { REACT_APP_VERSION } from '../../constants/general';
import { setHardLoading } from '../../store';
import { useAppDispatch, useTypedSelector } from '../../store/RootStateType';
import { useCallbackModal } from '../callback-modal';
import { CallBackModalRenderedModalProps } from '../callback-modal/definitions';

const CacheBustConfirmModal: React.FC<CallBackModalRenderedModalProps> = ({
  onClose,
  open,
}) => (
  <ConfirmModal
    title="User session invalid"
    handleClose={onClose}
    isVisible={open}
    allowCancel={false}
    btnText="Confirm"
    btnOpts={{ color: 'black' }}
  >
    <Text type="bold">
      We're sorry, changes have been detected that will affect your user
      session. You will be redirected to sign in again.
    </Text>
  </ConfirmModal>
);

export const CacheBuster: React.FC<{ enable: boolean }> = ({
  enable = false,
}) => {
  const cachedAppVersion = localStorage.getItem('appVersion');
  const dispatch = useAppDispatch();
  const isAuth = useTypedSelector(selectIsAuthenticated);

  const { RenderCallbackModal, showCallbackModal } = useCallbackModal({
    onClose: () => {
      dispatch(setHardLoading(true));
      // @ts-expect-error don't need args
      dispatch(signOut());
    },
    renderModal: CacheBustConfirmModal,
  });

  React.useEffect(() => {
    if (!isAuth || !cachedAppVersion || !enable) return;
    if (cachedAppVersion !== REACT_APP_VERSION) showCallbackModal();
  }, [cachedAppVersion, enable, isAuth, showCallbackModal]);

  React.useEffect(() => {
    localStorage.setItem('appVersion', REACT_APP_VERSION || '');
  });

  return <RenderCallbackModal />;
};
