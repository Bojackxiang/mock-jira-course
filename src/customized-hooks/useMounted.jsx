import { useEffect } from "react";

export const useMounted = (callback) => {
  useEffect(() => {
    callback();
    // trying to initialize the component, do not add call back as dependency
    // eslint-disable-next-line
  }, []);
};
