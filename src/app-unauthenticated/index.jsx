import React, { useState } from "react";
import { useAuth } from "context/auth-context";
import RegisterScreen from "./register";
import LoginScreen from "./login";

const AppUnauthenticated = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const onSwitch = () => {
    setIsRegistered(!isRegistered);
  };

  return (
    <div>
      {isRegistered ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={onSwitch}>switch</button>
    </div>
  );
};

export default AppUnauthenticated;
