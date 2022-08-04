import React from "react";
import { Drawer, Button } from "antd";
import { modalState } from "lab/project-list.slice";
import { useSelector } from "react-redux";
import { useProjectModal } from "customized-hooks/useProjectModal";

const ProjectModal = (props) => {
  // const { projectModalOpen, onModelClose } = props;

  const modalVisible = useSelector(modalState);
  const { close } = useProjectModal();

  const onModalClose = () => {
    close();
  };

  return (
    <Drawer
      width="100%"
      visible={modalVisible.projectModalOpen}
      onClose={onModalClose}
    >
      <h1>model</h1>
      <Button onClick={onModalClose} type="primary">
        close
      </Button>
    </Drawer>
  );
};

export default ProjectModal;
