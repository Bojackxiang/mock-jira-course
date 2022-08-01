import React, { useState } from "react";
import { useAuth } from "context/auth-context";
import { Form, Input, Button, Typography } from "antd";
import styled from "@emotion/styled";
import { useAsync } from "customized-hooks/useAsync";

const LoginScreen = () => {
  const { login: ctxLogin } = useAuth();
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const { isLoading, run } = useAsync();
  /**
   * Login function
   * @param {*} username
   * @param {*} password
   */
  const login = ({ username, password }) => {
    return ctxLogin({ username, password });
  };

  /**
   * handle input submit
   * @param {*} event
   */
  const handleSubmit = ({ username, password }) => {
    run(login({ username, password })).catch((err) => {
      setLoginErrorMsg(err.message);
    });
  };

  return (
    <div>
      {loginErrorMsg && (
        <div>
          <Typography.Text type="danger">{loginErrorMsg}</Typography.Text>
        </div>
      )}
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="username" type="text" id="username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input placeholder="password" type="text" id="password" />
        </Form.Item>
        <Form.Item>
          <LongButton type="primary" htmlType="submit" loading={isLoading}>
            login
          </LongButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginScreen;

const LongButton = styled(Button)`
  width: 100%;
`;
