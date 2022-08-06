import React, { useState, useEffect, useMemo } from "react";
import { Form, Input } from "antd";
import { useUsers } from "customized-hooks/useUsers";
import { useProjectsQuery } from "customized-hooks/userProjects";
import { useUrlQueryParam } from "utils/routeUtils";
import IdSelector from "components/IdSelector";
import ProjectListTable from "./project-list-table";

const FORM_VALUES = ["name", "managerId"];
const MODAL_OPEN = ["modalOpen"];

const ProjectList = () => {
  // STATIC VALUES
  const urlParams = useMemo(() => FORM_VALUES, []);
  const staticModal = useMemo(() => MODAL_OPEN, []);
  // STATE & HOOKS
  const [formValue, setFormaValue] = useUrlQueryParam(urlParams);
  const debouncedFormValue = useDebounce(formValue, 1000);
  const { users: managers, isLoading: userLoading } = useUsers();
  const {
    data: projectsData,
    isLoading: projectLoading,
    refetch,
    mutate,
  } = useProjectsQuery(debouncedFormValue);
  const [modalOpenUrlParam] = useUrlQueryParam(staticModal);

  // USEEFFECT
  useEffect(() => {
    console.log("refetch");
    refetch();
    // eslint-disable-next-line
  }, [modalOpenUrlParam]);

  // PAGE STATUS
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
              mutate={mutate}
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
