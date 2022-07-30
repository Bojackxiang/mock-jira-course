import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";

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
      {ctxUser ? ctxUser.username : "No user"}
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
          <Button type="primary" htmlType="submit">
            login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginScreen;
