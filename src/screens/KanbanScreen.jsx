import { useUrlFindProjectId } from "customized-hooks/useUrlFindProjectId";
import React from "react";

const KanbanScreen = () => {
  const projectId = useUrlFindProjectId();
  console.log("projectId: ", projectId);
  return <div> kanban screen </div>;
};

export default KanbanScreen;
