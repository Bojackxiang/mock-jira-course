import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { objectClean } from "lab/utils";
import React, { useEffect, useMemo } from "react";
import { useHttp } from "utils/http";
import { useAsync } from "./useAsync";
import axios from "axios";
import { useUrlQueryParam } from "utils/routeUtils";

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

export const useProjectsQuery = (params) => {
  const client = useHttp();
  const memorizedParams = useMemo(() => params, [params]);
  const queryClient = useQuery(
    ["projects"],
    () => client("projects", { data: objectClean(memorizedParams) }),
    {
      enabled: false,
    }
  );
  const [urlParams] = useUrlQueryParam(["modalOpen", "projectId"]);
  const memorizedUrlParam = useMemo(() => {
    console.log("urlParams", urlParams);
    return urlParams;
  }, [urlParams]);

  useEffect(() => {
    console.log("getting projects ==== ", urlParams);
    queryClient.refetch();
  }, [memorizedUrlParam]);

  return {
    data: queryClient.data,
    isLoading: queryClient.isLoading,
    isError: queryClient.isError,
    refetch: () => queryClient.refetch(),
  };
};

export const useProjectsEditQuery = () => {
  const client = useHttp();

  const { invalidateQueries, refetchQueries } = useQueryClient();
  return useMutation(
    (params) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => {
        return invalidateQueries("projects");
      },
    }
  );
};

export function usePosts() {
  return useQuery(["posts"], async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return data;
  });
}
