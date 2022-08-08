import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { objectClean } from "lab/utils";
import React, { useMemo, useEffect } from "react";

import { useHttp } from "utils/http";
import { useAsync } from "../useAsync";

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();

  const mutate = (params) => {
    return run(
      client(`projects/${params.id}`, {
        data: params.payload,
        method: "POST",
      })
    );
  };

  return { mutate, ...asyncResult };
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();

  const mutate = (projectId, payload) => {
    return run(
      client(`projects/${projectId}`, {
        data: payload,
        method: "PATCH",
      })
    );
  };

  return { mutate, ...asyncResult };
};

export const useProjects = (params) => {
  const [projects, setProjects] = React.useState([]);

  const client = useHttp();
  const { isError, isLoading, isSuccess, run, refetch } = useAsync();
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
    refetch,
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
