import { projectListActions } from "lab/project-list.slice";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useUrlQueryParam } from "utils/routeUtils";

export const useProjectModal = () => {
  const dispatch = useDispatch();
  const keys = useMemo(() => {
    return ["modalOpen", "projectId"];
  }, []);
  const [params, setParameters] = useUrlQueryParam(keys);

  const open = () => {
    dispatch(projectListActions.openProjectModal());
  };

  const close = () => {
    setParameters({ modalOpen: undefined, projectId: undefined });
    dispatch(projectListActions.closeProjectModal());
  };

  useEffect(() => {
    // edit mode
    if (params.modalOpen === "true" && params.projectId) {
      open();
    }
    // create mode
    if (params.modalOpen === "true") {
      open();
    }
  }, [params]);

  return {
    open,
    close,
    modalOpen: params.modalOpen,
    projectId: params.projectId,
  };
};
