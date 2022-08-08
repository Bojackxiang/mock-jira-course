import { List, Popover, Typography, Button } from "antd";
import { useProjects } from "customized-hooks/project/projectHook";

import React from "react";

const ProjectPopOver = () => {
  const { projects, refetch } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <div>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
        <List.Item>
          <Button type="primary">创建项目</Button>
        </List.Item>
      </List>
    </div>
  );
  return (
    <Popover
      placement="bottom"
      content={content}
      onVisibleChange={() => {
        refetch();
      }}
    >
      项目
    </Popover>
  );
};

export default ProjectPopOver;
