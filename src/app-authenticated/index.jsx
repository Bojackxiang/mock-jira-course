import React from "react";
import ProjectList from "lab/project-list";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Dropdown, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router";
import ProjectScreen from "screens/ProjectScreen";
import Home from "screens/Home";

const AppAuthenticated = () => {
  return (
    <Container>
      <HeaderComponent />
      <Nav>nav</Nav>
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:projectId" element={<ProjectScreen />} />
        </Routes>
      </Main>
      <Aside>aside</Aside>
      <Footer>footer</Footer>
    </Container>
  );
};

export default AppAuthenticated;

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu
          items={[
            {
              key: "1",
              label: (
                <Button onClick={logout} type={"link"}>
                  登出
                </Button>
              ),
            },
          ]}
        ></Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.username}
      </Button>
    </Dropdown>
  );
};

const HeaderComponent = () => {
  return (
    <Header>
      <HeaderLeft between={false} marginTop={2}>
        {/*高级使用： 直接导入 svg 并且能给他一个新的颜色 */}
        <Link to="">
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </Link>
        <Link to="projects">
          <h3>projects</h3>
        </Link>
        <Link to="projects">
          <h3>users</h3>
        </Link>
      </HeaderLeft>
      <HeaderRight>
        <HeaderRight>
          <User />
        </HeaderRight>
      </HeaderRight>
    </Header>
  );
};

// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 8rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  height: 100vh;
  /* grid-gap: 10rem; */
`;

// 下面的几个也就是 给grid 起个名字而已，所有的都是在 display 中写的
const HeaderLeft = styled(Row)``;
const HeaderRight = styled(Row)``;
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  margin-bottom: 2rem;
`;
const Main = styled.main`
  grid-area: main;
`;
const Aside = styled.aside`
  /* 名字必须和下面的完全匹配 */
  grid-area: aside;
`;
const Nav = styled.nav`
  grid-area: nav;
`;
const Footer = styled.footer`
  grid-area: footer;
`;

// grid-area 用来给grid子元素起名字
