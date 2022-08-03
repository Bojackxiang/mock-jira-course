import { Drawer, Button } from "antd";
import React from "react";

const ProjectModal = (props) => {
  const { projectModalOpen, onModelClose } = props;
  return (
    <Drawer width="100%" visible={projectModalOpen} onClose={onModelClose}>
      <h1>model</h1>
      <Button onClick={onModelClose} type="primary">
        close
      </Button>
    </Drawer>
  );
};

export default ProjectModal;
