import React, { useState, useEffect } from "react";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [input, setInput] = useState("");
  const [manager, setManager] = useState("");
  const [managers, setManagers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const filterProjectsByManagerId = (managerId) => {
    fetch("http://localhost:3001/projects?managerId=" + managerId)
      .then((res) => res.json())
      .then(setProjects)
      .then(() => {
        setManager(managerId);
      });
  };

  const filterProjectsByProjectName = (input) => {
    // ? 这边同时设置 project name 和 project 的时候有什么更好的方法吗 ？
    setInput(input);
    fetch("http://localhost:3001/projects?name=" + input)
      .then((res) => res.json())
      .then(setProjects)
      .then((data) => {
        const manager = data[0]?.manager;
        if (manager) {
          setManager(manager);
        } else {
          setManager("what");
        }
      });
  };

  // initialization the projects and users
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
              <td>{project.manager}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
