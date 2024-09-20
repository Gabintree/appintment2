import { Card, Form, Button, Nav, Alert } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import { json, useNavigate } from "react-router-dom"; // useRouter 대신 useNavigate 사용
import axios from "axios";
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
    if (password !== password2) {
      setError("비밀번호가 일치하지 않습니다!");
      return;
    }
    try {
      // TODO: 회원가입 처리 로직 await registeruser(user, password ..)
      if (tab === "user") {
        // 사용자 회원가입 로직
        //navigate("/UserDashboard");
      } else {
        // 관리자 회원가입 로직
        navigate("/AdminDashboard");
      }
    } catch (err) {
      setError("등록 중 오류가 발생했습니다.");
    }
  }

  const data = {
    "userId" : user,
    "userPw" : password
  }

  const postJoinData = async () => {

    try{
      await axios.post('/api/join', JSON.stringify(data),{
        headers : {
          "Content-Type" : "application/json; charset=utf8"
        }
      }
    )
      .then(function (response){
        console.log('회원가입 성공', response);
        navigate("/UserDashboard");
      })
      .catch(function(error){
        console.log('회원가입 실패T.T', error)
      })
    }catch(error){
      console.log('error : ', error);
    }
  }

  return (
    <Card>
      <h1>Logo</h1>
      {/* 회원가입 종류 (사용자, 관리자) 선택란 */}
      <Card.Header>
        {/* Fixed) activeKey추가: 현재 활성화된 tab상태 제어 */}
        <Nav variant="tabs" activeKey={tab}>
          <Nav.Item>
            {/* 사용자 회원가입 페이지 */}
            <Nav.Link eventKey="user" onClick={() => handleTabSelect("user")}>
              사용자
            </Nav.Link>
          </Nav.Item>
          {/* 관리자 회원가입  페이지*/}
          <Nav.Item>
            <Nav.Link eventKey="admin" onClick={() => handleTabSelect("admin")}>
              관리자
            </Nav.Link>
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
          <Button className="mt-3" variant="primary" type="submit" onClick={postJoinData}>
            가입하기
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default Register;