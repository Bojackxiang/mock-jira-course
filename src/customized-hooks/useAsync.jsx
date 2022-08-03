import { useCallback, useState } from "react";
import { useMountedHook } from "./useMountedHook";

const IDLE = "idle";
const LOADING = "loading";
const SUCCESS = "success";
const ERROR = "error";
const DEFAULT_STATE = IDLE; // idle, loading, error, success

const defaultState = {
  status: DEFAULT_STATE,
  data: null,
  error: null,
};

export const useAsync = (inputState = defaultState) => {
  const [state, setState] = useState({ ...inputState });
  const mountedRef = useMountedHook();

  /**
   * update the data in the state
   * @param {*} data
   */
  const setData = useCallback((data) => {
    setState((preState) => ({
      ...preState,
      data,
      status: SUCCESS,
    }));
  }, []);

  /**
   *
   * @param {*} error
   */
  const setError = useCallback((error) => {
    setState((preState) => ({
      ...preState,
      status: ERROR,
      error,
    }));
  }, []);

  /**
   * 出发异步请求
   * @param {*} promise
   */
  const run = useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error("The promise is not a valid promise");
      }
      setState((preState) => ({
        ...preState,
        status: LOADING,
      }));
      return promise
        .then((data) => {
          if (mountedRef) {
            setData((preState) => ({
              ...preState,
              status: SUCCESS,
              data,
            }));
          }

          return data;
        })
        .catch((error) => {
          setError(error);
          return Promise.reject(error);
        });
    },
    [mountedRef, setData, setError]
  );

  return {
    isIdle: state.status === IDLE,
    isLoading: state.status === LOADING,
    isSuccess: state.status === SUCCESS,
    isError: state.status === ERROR,
    data: state.data,
    setData,
    error: state.error,
    run,
    state,
  };
};
