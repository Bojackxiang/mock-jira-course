import React, { useState } from "react";
import * as authUtils from "support/auth-provider";

export const AuthContext = React.createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /**
   *
   * @param {user: {username: string, password: string}} form
   */
  const login = (user) => {
    return authUtils.login(user).then((resUser) => {
      setUser(resUser);
    });
  };

  const register = (user) => {
    return authUtils.login(user);
  };

  const logout = () => {
    return authUtils.logout().then(() => setUser(null));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("Did not find the context");
  }

  return context;
};
