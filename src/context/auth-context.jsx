import { useEffect } from "react";
import React from "react";
import * as authUtils from "support/auth-provider";
import { http } from "utils/http";
import { useAsync } from "customized-hooks/useAsync";
import styled from "@emotion/styled";
import { Spin, Typography } from "antd";

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
  const {
    run,
    isLoading,
    isIdle,
    data: user,
    setData: setUser,
    isError,
  } = useAsync();

  useEffect(() => {
    run(bootstrapUser()).then((data) => {
      setUser(data);
    });
    // eslint-disable-next-line
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

  /**
   *
   * @param {*} user
   * @returns
   */
  const register = (user) => {
    return authUtils.login(user);
  };

  /**
   *
   * @returns
   */
  const logout = () => {
    return authUtils.logout().then(() => setUser(null));
  };

  // rendering
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  // rendering
  if (isError) {
    return <FullPageError />;
  }

  // rendering
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

const FullPage = styled.div`
  height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FullPageLoading = () => {
  return (
    <FullPage>
      <Spin size="large" />
    </FullPage>
  );
};

const FullPageError = (props) => {
  const { message } = props;
  return (
    <FullPage>
      <Typography.Text type="danger">
        {message ?? "Unknown error"}
      </Typography.Text>
    </FullPage>
  );
};
