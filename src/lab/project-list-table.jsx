import React from "react";
import { Dropdown, Table, Button, Menu } from "antd";
import { Link } from "react-router-dom";
import Pin from "components/Pin";
import { useEditProject } from "customized-hooks/useEditProject";

const ProjectListTable = (props) => {
  const { projectsData, managers } = props;
  const { mutate } = useEditProject();

  const editPinkProject = (projectId) => (pin) =>
    mutate(projectId, {
      pin: pin,
    });

  return (
    <Table
      pagination={false}
      rowKey={(record) => record.id}
      columns={[
        {
          title: <Pin checked={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                // [函数式编程] 两种不同的写法，但是达到的效果是一样的
                onCheckedChange={editPinkProject(project.id)}
                // onCheckedChange={(pin) => {
                //   mutate(project.id, { pin: !project.pin });
                // }}
              />
            );
          },
        },
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
                {managers.find((manager) => manager.id === project.managerId)
                  .name ?? "Unknown"}
              </span>
            );
          },
        },
        {
          title: "更多",
          render(project) {
            return (
              <Dropdown
                overlay={
                  <Menu
                    items={[
                      {
                        label: (
                          <Button
                            type="link"
                            onClick={() => {
                              console.log("clicked");
                            }}
                          >
                            编辑
                          </Button>
                        ),
                      },
                    ]}
                  />
                }
              >
                <Button type={"link"}>...</Button>
              </Dropdown>
            );
          },
        },
      ]}
      dataSource={projectsData || []}
    ></Table>
  );
};

export default ProjectListTable;
