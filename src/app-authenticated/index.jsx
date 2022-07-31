import React from "react";
import ProjectList from "lab/project-list";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { Row } from "components/lib";

const AppAuthenticated = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderLeft between={false} marginTop={2}>
          <h3>Logo</h3>
          <h3>projects</h3>
          <h3>users</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>Logout</button>
        </HeaderRight>
      </Header>
      <Nav>nav</Nav>
      <Main>
        <ProjectList />
      </Main>
      <Aside>aside</Aside>
      <Footer>footer</Footer>
    </Container>
  );
};

export default AppAuthenticated;

// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
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
