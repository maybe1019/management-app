import React from 'react';
import { useTypedSelector } from '../../store';
import { SessionTimeoutModal } from '../../features/auth/components/SessionTimeoutModal';
import { selectIsAuthenticated } from '@secberus/services';

type SessionContext = {
  showModal: (isVisible: boolean, modalProps?: any) => void;
  hideModal: () => void;
  sessionState: any;
};

const initalState: SessionContext = {
  showModal: () => {},
  hideModal: () => {},
  sessionState: {},
};

export const SessionContext = React.createContext(initalState);
export const useSession = () => React.useContext(SessionContext);

export const SessionProvider: React.FC = ({ children }) => {
  const initialStore = {
    isVisible: false,
    modalProps: {},
  };
  const [sessionState, setSessionState] = React.useState(initialStore);
  const isAuth = useTypedSelector(selectIsAuthenticated);

  const showModal = (isVisible: boolean, modalProps: any = {}) => {
    setSessionState({
      ...sessionState,
      isVisible,
      modalProps,
    });
  };

  const hideModal = React.useCallback(() => {
    setSessionState(initialStore);
  }, []);

  const renderComponent = () => {
    return isAuth && <SessionTimeoutModal />;
  };

  return (
    <SessionContext.Provider value={{ sessionState, showModal, hideModal }}>
      {renderComponent()}
      {children}
    </SessionContext.Provider>
  );
};
