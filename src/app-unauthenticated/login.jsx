import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";
import styled from "@emotion/styled";

const LoginScreen = () => {
  const { login: ctxLogin, user: ctxUser } = useAuth();
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
    login({ username, password });
  };

  return (
    <div>
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
          <LongButton type="primary" htmlType="submit">
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
