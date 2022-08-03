import { useAuth } from "context/auth-context";
import qs from "qs";
import { logout } from "support/auth-provider";

const baseUrl = process.env.REACT_APP_MOCK_URL;
const fetch = window.fetch;

// wrapper for fetch
/**
 *
 * @param {*} url
 * @param {data: object, token: string, headers: object} options
 */
export const http = (url, options) => {
  const { method, token, data, ...restHeaders } = options;
  const config = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": data ? "application/json" : "",
      Authorization: token ? `Bearer ${token}` : "",
      ...restHeaders,
    },
  };

  if (!options?.method?.toUpperCase()) {
    url += `?${qs.stringify(data)}`;
  } else {
    config.method = method.toUpperCase();
    config.body = JSON.stringify(data || {});
  }

  console.log(`{baseUrl}/{url}: , ${baseUrl}/${url}`);

  return fetch(`${baseUrl}/${url}`, config).then(async (response) => {
    if (response.status === 401) {
      await logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      // fetch 只有在断网的时候最后才会 被 catch 捕获，所以这边我们需要手动抛出异常，让外面的方法补货
      return Promise.reject(data);
    }
  });
};

/**
 * 直接获取token 来做 request
 * @param {*} url
 * @param {data: object, token: string, headers: object} options
 * @returns
 */
export const useHttp = () => {
  const { user } = useAuth();
  const token = user.token;
  return (url, options) => http(url, { ...options, token });
};
