import React from 'react';
import type { CognitoUser } from '@secberus/services';

interface AuthContextType {
  user: CognitoUser;
  setUser: any;
}

const defaultState = {};

export const AuthContext =
  React.createContext<Partial<AuthContextType>>(defaultState);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<CognitoUser>();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
