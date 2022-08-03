import { useHttp } from "utils/http";
import { useAsync } from "./useAsync";

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();

  /**
   *
   * @param {
   *  projectId: string;
   *  payload: {isPin: boolean}} params
   */
  const mutate = (params) => {
    return run(
      client(`projects/${params.id}`, {
        data: param.payload,
        method: "POST",
      })
    );
  };

  return { mutate, ...asyncResult };
};
