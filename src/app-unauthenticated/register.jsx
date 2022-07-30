import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";
import styled from "@emotion/styled";

const RegisterScreen = () => {
  const { register: ctxRegister } = useAuth();
  /**
   * Login function
   * @param {*} username
   * @param {*} password
   */
  const register = ({ username, password }) => {
    return ctxRegister({ username, password });
  };

  /**
   * handle input submit
   * @param {*} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.elements[0].value;
    const password = event.target.elements[1].value;
    register({ username, password });
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
            Register
          </LongButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterScreen;

const LongButton = styled(Button)`
  width: 100%;
`;
