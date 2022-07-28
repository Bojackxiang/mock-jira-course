import React from "react";
import { useAuth } from "context/auth-context";

const LoginScreen = () => {
  const { login: ctxLogin, user: ctxUser } = useAuth();
  /**
   * Login function
   * @param {*} username
   * @param {*} password
   */
  const login = ({ username, password }) => {
    return ctxLogin({ username, password });
    // fetch(`${baseUrl}/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username,
    //     password,
    //   }),
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     return data;
    //   });
  };

  /**
   * handle input submit
   * @param {*} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.elements[0].value;
    const password = event.target.elements[1].value;
    login({ username, password });
  };

  return (
    <div>
      {ctxUser ? ctxUser.username : "No user"}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input type="text" id="username" />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="text" id="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginScreen;
