import { objectClean } from "lab/utils";
import React, { useEffect } from "react";
import { useHttp } from "utils/http";
import { useAsync } from "./useAsync";

export const useProjects = (params = {}) => {
  const [projects, setProjects] = React.useState([]);

  const client = useHttp();
  const { isError, isLoading, isSuccess, run } = useAsync();

  useEffect(() => {
    run(client("projects", { data: objectClean(params) })).then(setProjects);
  }, [params, run, client]);

  return {
    projects,
    isError,
    isLoading,
    isSuccess,
  };
};
