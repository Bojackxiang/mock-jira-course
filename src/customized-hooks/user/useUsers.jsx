import { useAsync } from "customized-hooks/useAsync";
import React, { useEffect } from "react";
import { useHttp } from "utils/http";

export const useUsers = (params) => {
  const [users, setUsers] = React.useState([]);

  const client = useHttp();
  const { isError, isLoading, isSuccess, run } = useAsync();

  useEffect(() => {
    run(client("users")).then(setUsers);
  }, [run, client]);

  return {
    users,
    isError,
    isLoading,
    isSuccess,
  };
};
