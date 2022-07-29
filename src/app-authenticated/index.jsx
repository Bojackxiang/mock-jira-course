import React from "react";
import ProjectList from "lab/project-list";
import { useAuth } from "context/auth-context";

const AppAuthenticated = () => {
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <ProjectList />
    </div>
  );
};

export default AppAuthenticated;
