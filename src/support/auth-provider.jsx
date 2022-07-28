const localStorageKey = "__auth_provider_token__";

const baseUrl = process.env.REACT_APP_MOCK_URL;

/**
 * get token from local storage
 * @returns
 */
export const getToken = () => {
  return localStorage.getItem(localStorageKey);
};

/**
 * set token to local storage
 * @param {{token: string}} user
 */
export const handleUserResponse = (user) => {
  window.localStorage.setItem(localStorageKey, user.token ?? "");
  return user;
};

/**
 * user login
 * @param {user:{username: string, password: string}} Object
 */
export const login = (user) => {
  return fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  }).then(async (response) => {
    if (response.ok) {
      const data = await response.json();
      return handleUserResponse(data.user);
    } else {
      console.log("log in failure");
      return Promise.reject(await response.json());
    }
  });
};

/**
 * User register
 * @param {user:{username: string, password: string}} Object
 */
export const register = (user) => {
  return fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    }
  });
};

/**
 * Logout
 */
export const logout = async () => {
  window.localStorage.removeItem(localStorageKey);
};
