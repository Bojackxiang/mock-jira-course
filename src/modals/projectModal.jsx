import React, { useEffect, useRef, useState } from "react";
import { Drawer, Button, Spin, Form, Input } from "antd";
import { modalState } from "lab/project-list.slice";
import { useSelector } from "react-redux";
import { useProjectModal } from "customized-hooks/useProjectModal";
import { useHttp } from "utils/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import styled from "@emotion/styled";
import { useUrlQueryParam } from "utils/routeUtils";

const ProjectModal = (props) => {
  const { close, projectId } = useProjectModal();
  const modalVisible = useSelector(modalState);
  const [projectData, setProjectData] = useState({ name: "" });
  const request = useHttp();
  const modalStatusRef = useRef();

  const { isLoading, refetch } = useQuery(
    ["project", projectId],
    () => request(`projects/${projectId}`).then(setProjectData),
    {
      enabled: false,
    }
  );
  // 下面的可以优化
  const mutation = useMutation((project) => {
    return request(`projects/${project.id}`, {
      data: project,
      method: "PATCH",
    });
  });

  const [paramsValues] = useUrlQueryParam(["modalOpen"]);

  const [form] = Form.useForm();

  useEffect(() => {
    if (projectId) {
      refetch({ projectId: projectId });
    }
  }, [projectId]);

  const onModalClose = () => {
    if (!close) {
      console.warn("props.close is undefined");
    } else {
      close();
    }
  };

  const onFormFinished = () => {
    mutation.mutate(projectData);
    close();
  };

  const onFormChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  return (
    <Drawer
      width="100%"
      visible={modalVisible.projectModalOpen}
      onClose={onModalClose}
    >
      {isLoading ? (
        <LoadingComp />
      ) : (
        <>
          <Form form={form} onFinish={onFormFinished}>
            <Form.Item>
              <Input
                placeholder="项目名称"
                name="name"
                label="项目名称"
                value={projectData.name}
                onChange={onFormChange}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                完成
              </Button>
            </Form.Item>
          </Form>
          <Button onClick={onModalClose} type="primary">
            close
          </Button>
        </>
      )}
    </Drawer>
  );
};

// ProjectModal.whyDidYouRender = true;

export default ProjectModal;

const LoadingComp = () => (
  <Loading>
    <Spin size="large" />
  </Loading>
);

const Loading = styled.div`
  height: "100vh";
  display: "flex";
  justify-content: "center";
  align-items: "center";
`;
