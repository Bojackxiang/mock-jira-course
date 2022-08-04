import { projectListActions } from "lab/project-list.slice";
import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useUrlQueryParam } from "utils/routeUtils";

export const useProjectModal = () => {
  const dispatch = useDispatch();
  const keys = useMemo(() => ["projectCreate"], []);
  const [{ projectCreate }, setParameters] = useUrlQueryParam([keys]);

  const open = () => {
    setParameters({ projectCreate: true });
    dispatch(projectListActions.openProjectModal());
  };
  const close = () => {
    setParameters({ projectCreate: false });
    dispatch(projectListActions.closeProjectModal());
  };

  useEffect(() => {
    if (projectCreate === "true") open();
  }, [projectCreate, dispatch]);

  return {
    open,
    close,
  };
};
