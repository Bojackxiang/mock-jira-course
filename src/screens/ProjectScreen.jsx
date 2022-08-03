import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { Link } from "react-router-dom";

import EpicScreen from "./EpicScreen";
import KanbanScreen from "./KanbanScreen";

const ProjectScreen = () => {
  return (
    <div>
      <div>ProjectScreen</div>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>

      <Routes>
        {/* /projects/:projectId/kanban */}
        <Route path="/kanban" element={<KanbanScreen />} />
        {/* /projects/:projectId/epic */}
        <Route path="/epic" element={<EpicScreen />} />
        {/* 进来这个页面之后直接就先试看板 */}
        <Route
          path="*"
          element={<Navigate to={window.location.pathname + "/kanban"} />}
        />
      </Routes>
    </div>
  );
};

export default ProjectScreen;
