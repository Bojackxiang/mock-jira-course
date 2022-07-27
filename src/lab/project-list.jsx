import React, { useState, useEffect } from "react";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [input, setInput] = useState("");
  const [manager, setManager] = useState("");
  const [managers, setManagers] = useState([]);

  /**
   * Initialization the project and fetch user ana project data
   * @param {*} managerId
   */
  useEffect(() => {
    fetch("http://localhost:3001/projects")
      .then((res) => res.json())
      .then(setProjects);
  }, []);
  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then(setManagers);
  }, []);

  /**
   * triggered when user change the select
   * @param {*} managerId
   */
  const filterProjectsByManagerId = (managerId) => {
    setInput("");
    fetch(
      `http://localhost:3001/projects?${
        managerId ? "managerId=" + managerId : ""
      }`
    )
      .then((res) => res.json())
      .then(setProjects)
      .then(() => {
        setManager(managerId);
      });
  };

  /**
   * triggered when user change the input
   * @param {*} input
   */
  const filterProjectsByProjectName = (input) => {
    setInput(input);
    if (input === "") {
      setManager("");
    }

    fetch(`http://localhost:3001/projects?${input ? "name=" + input : ""}`)
      .then((res) => res.json())
      .then((json) => {
        setProjects(json);
        return json;
      })
      .then((json) => {
        const manager = json[0]?.managerId;
        if (manager && input !== "") {
          setManager(manager);
        } else {
          setManager("");
        }
      });
  };

  return (
    <div>
      {/* input field */}
      <input
        onChange={(e) => {
          filterProjectsByProjectName(e.target.value);
        }}
        value={input}
        placeholder="项目名称"
      />

      <select
        onChange={(e) => {
          setManager(e.target.value);
          filterProjectsByManagerId(e.target.value);
        }}
        value={manager}
      >
        <option value="">负责人</option>
        {managers.map((manager) => {
          return (
            <option value={manager.id} key={manager.id}>
              {manager.name}
            </option>
          );
        })}
      </select>
      {/* table  */}
      {projects.length}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>
                {
                  managers.find((manager) => manager.id === project.managerId)
                    .name
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
