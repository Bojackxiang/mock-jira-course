import { projectListActions } from "lab/project-list.slice";
import { useEffect, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useUrlQueryParam } from "utils/routeUtils";

export const useProjectModal = () => {
  const dispatch = useDispatch();
  const keys = useMemo(() => ["modalOpen"], []);
  const [{ modalOpen, projectId }, setParameters] = useUrlQueryParam([keys]);

  const open = () => {
    dispatch(projectListActions.openProjectModal());
  };

  const close = () => {
    setParameters({ modalOpen: undefined, projectId: undefined });
    dispatch(projectListActions.closeProjectModal());
  };

  useEffect(() => {
    if (modalOpen === "true" && projectId) open();
  }, [modalOpen, dispatch]);

  return {
    open,
    close,
  };
};
