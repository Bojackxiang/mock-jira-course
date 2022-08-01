import React, { useEffect } from "react";
import { useHttp } from "utils/http";
import { useAsync } from "./useAsync";

export const useUsers = (params) => {
  const [users, setUsers] = React.useState([]);

  const client = useHttp();
  const { isError, isLoading, isSuccess, run } = useAsync();

  useEffect(() => {
    run(client("users")).then(setUsers);
    // eslint-disable-next-line
  }, []);

  return {
    users,
    isError,
    isLoading,
    isSuccess,
  };
};
