import React, { useState } from "react";
import RegisterScreen from "./register";
import LoginScreen from "./login";
import { Card } from "antd";

const AppUnauthenticated = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const onSwitch = () => {
    setIsRegistered(!isRegistered);
  };

  return (
    <div>
      <Card>
        {isRegistered ? <RegisterScreen /> : <LoginScreen />}
        <button onClick={onSwitch}>switch</button>
      </Card>
    </div>
  );
};

export default AppUnauthenticated;
