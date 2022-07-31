import React, { useState, useEffect } from "react";
import { objectClean } from "./utils";
import { useHttp } from "utils/http";
import { useMounted } from "customized-hooks/useMounted";
import { Input, Select, Table } from "antd";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [managers, setManagers] = useState([]);
  const [formValue, setFormaValue] = useState({
    name: "",
    managerId: "",
  });
  const debouncedFormValue = useDebounce(formValue, 2000);
  const client = useHttp();
  /**
   * Initialization the project and fetch user ana project data
   * @param {*} managerId
   */
  useEffect(() => {
    const cleanedFormValue = objectClean(debouncedFormValue);

    client("projects", {
      data: cleanedFormValue,
    })
      .then((data) => {
        return data;
      })
      .then(setProjects);
    // eslint-disable-next-line
  }, [debouncedFormValue]);

  /**
   * initialization the component
   */
  useMounted(() => {
    client("users").then(setManagers);
  });

  return (
    <div>
      {/* input field */}
      <Input
        onChange={(event) => {
          const name = event.target.value;
          setFormaValue({
            ...formValue,
            name,
          });
        }}
        value={formValue.projectName}
        placeholder="项目名称"
      />

      {managers.length && (
        <Select
          style={{ width: 120 }}
          onChange={(value) => {
            console.log(value);
            setFormaValue({
              ...formValue,
              managerId: value,
            });
          }}
          defaultValue={"负责人"}
          value={formValue.projectManagerId}
        >
          <Select.Option value="0" key={0}>
            负责人
          </Select.Option>
          {managers.map((manager) => {
            return (
              <Select.Option value={manager.id} key={manager.id}>
                {manager.name}
              </Select.Option>
            );
          })}
        </Select>
      )}
      {/* table  */}
      {managers.length && projects.length && (
        <Table
          pagination={false}
          rowKey={(record) => record.id}
          columns={[
            {
              title: "project name",
              dataIndex: "name",
              sorter(a, b) {
                // local compare 可以排序中文字符
                return a.name.localeCompare(b.name);
              },
            },
            {
              title: "Manager name",
              render(value, project) {
                return (
                  <span>
                    {managers.find(
                      (manager) => manager.id === project.managerId
                    ).name ?? "Unknown"}
                  </span>
                );
              },
            },
          ]}
          dataSource={projects}
        ></Table>
      )}
    </div>
  );
};

export default ProjectList;

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
