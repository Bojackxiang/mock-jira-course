import { objectClean } from "lab/utils";
import React, { useEffect, useMemo } from "react";
import { useHttp } from "utils/http";
import { useAsync } from "./useAsync";

// params 的初始值不能设置为 的fault {}, 否则放到 deps 终究会引起无限渲染
export const useProjects = (params) => {
  const [projects, setProjects] = React.useState([]);

  const client = useHttp();
  const { isError, isLoading, isSuccess, run } = useAsync();
  const staticParams = useMemo(() => params, [params]);

  useEffect(() => {
    run(client("projects", { data: objectClean(staticParams) })).then(
      setProjects
    );
  }, [run, client, staticParams]);

  return {
    projects,
    isError,
    isLoading,
    isSuccess,
  };
};
