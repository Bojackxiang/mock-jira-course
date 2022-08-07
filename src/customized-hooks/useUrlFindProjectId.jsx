import { useLocation } from "react-router";

export const useUrlFindProjectId = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/\/projects\/(\d+)/)?.[1];
  return Number(id);
};
