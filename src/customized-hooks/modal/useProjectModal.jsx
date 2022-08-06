import { projectListActions } from "lab/project-list.slice";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useUrlQueryParam } from "utils/routeUtils";
import { useCallback } from "react";

export const useProjectModal = () => {
  const dispatch = useDispatch();
  const keys = useMemo(() => {
    return ["modalOpen", "projectId"];
  }, []);
  const [params, setParameters] = useUrlQueryParam(keys);

  const open = useCallback(() => {
    dispatch(projectListActions.openProjectModal());
  }, [dispatch]);

  const close = useCallback(() => {
    setParameters({ modalOpen: undefined, projectId: undefined });
    dispatch(projectListActions.closeProjectModal());
  }, [dispatch, setParameters]);

  useEffect(() => {
    // edit mode
    if (params.modalOpen === "true" && params.projectId) {
      open();
    }
    // create mode
    if (params.modalOpen === "true") {
      open();
    }
  }, [params, open]);

  return {
    open,
    close,
    modalOpen: params.modalOpen,
    projectId: params.projectId,
  };
};
