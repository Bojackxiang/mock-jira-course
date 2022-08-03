import { Drawer, Button } from "antd";
import { modalState, projectListActions } from "lab/project-list.slice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ProjectModal = (props) => {
  // const { projectModalOpen, onModelClose } = props;
  const dispatch = useDispatch();
  const modalVisible = useSelector(modalState);

  const onModalClose = () => {
    dispatch(projectListActions.closeProjectModal());
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
