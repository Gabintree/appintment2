import { Card, Form, Button, Nav, Alert } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // useRouter 대신 useNavigate 사용

import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

const Register = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [tab, setTab] = useState("user"); // 탭 상태 추가
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // TODO: 관리자 버튼을 클릭할 때 사용자 버튼이 동시에 눌려지는 문제 해결
  // TODO: 관리자 회원가입에 회원정보 입력하고 제출하면 사용자 대시보드로 이동함
  function handleTabSelect(selectedTab) {
    setTab(selectedTab);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // 비밀번호 확인
    if (password !== password2) {
      setError("비밀번호가 일치하지 않습니다!");
      return;
    }
    try {
      // TODO: 회원가입 처리 로직 await registeruser(user, password ..)
      if (tab === "user") {
        navigate("/UserDashboard");
      } else {
        navigate("/AdminDashboard");
      }
    } catch (err) {
      setError("등록 중 오류가 발생했습니다.");
    }
  }

  return (
    <Card>
      <h1>Logo</h1>
      {/* 회원가입 종류 (사용자, 관리자) 선택란 */}
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#user-register">
          <Nav.Item>
            {/* Default 사용자 회원가입 페이지 */}
            <Nav.Link
              href="#user-register"
              active={tab === "user"}
              onClick={() => handleTabSelect("user")}
            >
              사용자
            </Nav.Link>
          </Nav.Item>
          {/* 관리자 회원가입  페이지*/}
          <Nav.Item>
            <Nav.Link href="#admin-register">관리자</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      {/* 회원정보 등록 */}
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>아이디</Form.Label>
            <Form.Control
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Form.Group>
          {error && (
            <div className="mt-3">
              <Alert variant="danger">{error}</Alert>
            </div>
          )}
          <Button className="mt-3" variant="primary" type="submit">
            가입하기
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default Register;
