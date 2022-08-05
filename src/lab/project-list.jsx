import React, { useState, useEffect, useMemo } from "react";
import { Form, Input } from "antd";
import { useUsers } from "customized-hooks/useUsers";
import { useProjects, useProjectsQuery } from "customized-hooks/userProjects";
import { useUrlQueryParam } from "utils/routeUtils";
import IdSelector from "components/IdSelector";
import ProjectListTable from "./project-list-table";

const ProjectList = () => {
  // useUrlQueryParam 返回的是一个单纯的 obj A
  // 刚好 这个 A 又是 useDebounce 的dependency
  // 所以会造成无限循环
  // 解决： 就是将 返回的value 用 useMemo 进行包裹，
  const urlParams = useMemo(() => ["name", "managerId"], []);
  const [formValue, setFormaValue] = useUrlQueryParam(urlParams);
  const debouncedFormValue = useDebounce(formValue, 1000);
  const { users: managers, isLoading: userLoading } = useUsers();
  // const { projects: projectsData, isLoading: projectLoading } =
  //   useProjects(debouncedFormValue);
  const {
    data: projectsData,
    isLoading: projectLoading,
    isError,
    refetch,
  } = useProjectsQuery(debouncedFormValue);

  const isLoading = userLoading && projectLoading;

  return (
    <>
      {!isLoading ? (
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
              <IdSelector
                value={formValue.managerId}
                style={{ width: 120 }}
                options={managers}
                defaultOption={"负责人"}
                onChange={(value) => {
                  setFormaValue({
                    ...formValue,
                    managerId: value,
                  });
                }}
              />
            </Form.Item>
          </Form>
          <div>
            <ProjectListTable
              projectsData={projectsData}
              managers={managers}
              refetch={refetch}
            />
          </div>
        </div>
      ) : (
        <LoadingComponent />
      )}
    </>
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
