import { useEffect } from "react";
import { useMounted } from "customized-hooks/useMounted";
import React, { useState } from "react";
import * as authUtils from "support/auth-provider";
import { http } from "utils/http";

export const AuthContext = React.createContext(undefined);

const bootstrapUser = async () => {
  let user = null;
  try {
    const token = authUtils.getToken();
    if (token) {
      const meInfo = await http("me", { token });
      user = meInfo.user;
    }
  } catch (error) {
    return user;
  } finally {
    return user;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("hello");
    bootstrapUser().then(setUser);
  }, []);

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
