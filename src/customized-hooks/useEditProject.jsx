import { useHttp } from "utils/http";
import { useAsync } from "./useAsync";

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();

  /**
   *
   * @param {
   *  projectId: string;
   *  payload: {isPin: boolean}} params
   */
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
