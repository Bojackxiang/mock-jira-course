import React, { useState, useEffect, useMemo } from "react";
import { Form, Input } from "antd";
import { useUsers } from "customized-hooks/useUsers";
import { useProjects, useProjectsQuery } from "customized-hooks/userProjects";
import { useUrlQueryParam } from "utils/routeUtils";
import IdSelector from "components/IdSelector";
import ProjectListTable from "./project-list-table";

const ProjectList = () => {
  const urlParams = useMemo(() => ["name", "managerId"], []);
  const [formValue, setFormaValue] = useUrlQueryParam(urlParams);
  const debouncedFormValue = useDebounce(formValue, 1000);

  const { users: managers, isLoading: userLoading } = useUsers();

  // get project data
  const {
    data: projectsData,
    isLoading: projectLoading,
    isError,
    refetch,
  } = useProjectsQuery(debouncedFormValue);

  // check loading status
  const isLoading = userLoading && projectLoading;
  // 这边subscribe to utl 一定要用 useMemo 包裹
  const staticModal = useMemo(() => {
    return ["modalOpen"];
  }, []);
  const [modalOpenUrlParam] = useUrlQueryParam(staticModal);

  useEffect(() => {
    console.log("refetch");
    refetch();
  }, [modalOpenUrlParam]);

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
