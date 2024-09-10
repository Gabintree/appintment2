// Navigation Bar 레이아웃 컴포넌트
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/home">병원예약</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Login">로그인</Nav.Link>
            <Nav.Link href="/register">회원가입</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
