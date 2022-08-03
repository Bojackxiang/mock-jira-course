import React, { useState, useEffect } from "react";
import { Form, Input, Select, Table } from "antd";
import { useUsers } from "customized-hooks/useUsers";
import { useProjects } from "customized-hooks/userProjects";
import { Link } from "react-router-dom";
import { useUrlQueryParam } from "utils/routeUtils";

const ProjectList = () => {
  // useUrlQueryParam 返回的是一个单纯的 obj A
  // 刚好 这个 A 又是 useDebounce 的dependency
  // 所以会造成无限循环
  const [formValue, setFormaValue] = useUrlQueryParam(["name", "managerId"]);
  const debouncedFormValue = useDebounce(formValue, 2000);
  const { users: managers, isLoading: userLoading } = useUsers();
  const { projects: projectsData, isLoading: projectLoading } =
    useProjects(debouncedFormValue);

  return (
    <div>
      {!(userLoading && projectLoading) ? (
        <div>
          <Form layout="inline">
            <Form.Item style={{ flex: 1 }}>
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
            </Form.Item>
            <Form.Item>
              {managers.length && (
                <Select
                  style={{ width: 120 }}
                  onChange={(value) => {
                    if (value === "0") {
                      setFormaValue({
                        ...formValue,
                        managerId: "",
                      });
                    } else {
                      setFormaValue({
                        ...formValue,
                        managerId: value,
                      });
                    }
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
            </Form.Item>
          </Form>
          <div>
            {/* table  */}
            {projectsData.length && (
              <Table
                pagination={false}
                rowKey={(record) => record.id}
                columns={[
                  {
                    title: "project name",
                    dataIndex: "name",
                    render(_, project) {
                      return <Link to={`${project.id}`}>{project.name}</Link>;
                    },
                    sorter(a, b) {
                      // local compare 可以排序中文字符
                      return a.name.localeCompare(b.name);
                    },
                  },
                  {
                    title: "Manager name",
                    render(project) {
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
                dataSource={projectsData || []}
              ></Table>
            )}
          </div>
        </div>
      ) : (
        <LoadingComponent />
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

const LoadingComponent = () => {
  return <div>Loading...</div>;
};
