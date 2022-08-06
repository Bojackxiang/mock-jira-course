import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { objectClean } from "lab/utils";
import React, { useEffect, useMemo } from "react";
import { useHttp } from "utils/http";
import { useAsync } from "./useAsync";
import axios from "axios";

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
  const request = useHttp();
  const memorizedParams = useMemo(() => params, [params]);
  const { invalidateQueries } = useQueryClient();
  const projectsQuery = useQuery(
    ["projects"],
    () => request("projects", { data: objectClean(memorizedParams) }),
    {
      enabled: false,
    }
  );

  const mutation = useMutation(
    (params) => {
      console.log({ params });
      request(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      });
    },
    {
      onSuccess: () => {
        return invalidateQueries("projects");
      },
    }
  );

  return {
    data: projectsQuery.data,
    isLoading: projectsQuery.isLoading,
    isError: projectsQuery.isError,
    refetch: () => projectsQuery.refetch(),
    mutate: (project) => mutation.mutate(project),
  };
};

export const useProjectsEditQuery = () => {
  const client = useHttp();

  const { invalidateQueries } = useQueryClient();
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
