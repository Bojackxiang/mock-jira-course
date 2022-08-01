import { objectClean } from "lab/utils";
import React, { useEffect } from "react";
import { useHttp } from "utils/http";
import { useAsync } from "./useAsync";

export const useProjects = (params = {}) => {
  const [projects, setProjects] = React.useState([]);
  console.log({ projects });

  const client = useHttp();
  const { isError, isLoading, isSuccess, run } = useAsync();

  useEffect(() => {
    run(client("projects", { data: objectClean(params) })).then(setProjects);
    // eslint-disable-next-line
  }, [params]);

  return {
    projects,
    isError,
    isLoading,
    isSuccess,
  };
};
