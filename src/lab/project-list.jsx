import React, { useState, useEffect } from "react";
import qs from "qs";
import { objectClean } from "./utils";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [managers, setManagers] = useState([]);
  const [formValue, setFormaValue] = useState({
    name: "",
    managerId: "",
  });
  const debouncedFormValue = useDebounce(formValue, 2000);

  /**
   * Initialization the project and fetch user ana project data
   * @param {*} managerId
   */
  useEffect(() => {
    const cleanedFormValue = objectClean(debouncedFormValue);
    const stringifiedValue = qs.stringify(cleanedFormValue);

    fetch("http://localhost:3001/projects?" + stringifiedValue)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .then(setProjects);
  }, [debouncedFormValue]);

  /**
   * initialization the component
   */
  useMounted(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then(setManagers);
  });

  return (
    <div>
      {/* input field */}
      <input
        onChange={(e) => {
          const name = e.target.value;
          setFormaValue({
            ...formValue,
            name,
          });
        }}
        value={formValue.projectName}
        placeholder="项目名称"
      />

      <select
        onChange={(e) => {
          const managerId = e.target.value;
          setFormaValue({
            ...formValue,
            managerId,
          });
        }}
        value={formValue.projectManagerId}
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
      <table>
        <thead>
          <tr>
            {/* <th>Name</th>
            <th>Description</th> */}
          </tr>
        </thead>
        <tbody>
          {/* projects.length 在这边不能直接用，要是用 Boolean wrap 一下 */}
          {Boolean(projects.length) &&
            Boolean(managers.length) &&
            projects.map((project) => (
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

/**
 * 在页面钢架在的时候执行一个函数
 */
const useMounted = (callback) => {
  useEffect(() => {
    callback();
    // trying to initialize the component, do not add call back as dependency
    // eslint-disable-next-line
  }, []);
};

// Hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};
