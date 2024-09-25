// 환자 대시보드
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Navbar, Nav } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import HList from "./HList";
import TodaySchedule from "./TodaySchedule";
import ManageReservation from "./ManageReservation";
import DetailContent from "./DetailContent";
/*
병원 목록 조회 | 오늘의 진료 일정
예약 내역 관리 | 상세보기
*/

const UserDashboard = () => {
  const [userName, setUserName] = useState(""); // 사용자 이름 상태

  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 시 사용자 이름을 가져오는 예시
    const fetchUserName = async () => {
      const fetchedName = "순자"; // 실제 API 호출로 대체
      setUserName(fetchedName);
    };
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  // 마이페이지 이동
  const handleMyPageClick = () => {
    navigate("/UserMyPage"); // UserMyPage로 이동
  };

  // 로그아웃
  const handleLogoutClick = () => {
    navigate("/Home"); // 로그아웃 시, Home화면 이덩
  };

  return (
    <Container fluid>
      <Row>
        {/* 사이드 바 */}
        <Col md={2} className="bg-light">
          <h1 className="logo">logo</h1>
          <Nav className="flex-column">
            {/* 해당 상세 페이지 이동 추가하기 */}
            <Nav.Link href="#">병원 목록 조회</Nav.Link>
            <Nav.Link href="#">오늘의 진료 일정</Nav.Link>
            <Nav.Link href="#">예약 내역 관리</Nav.Link>
          </Nav>
        </Col>

        {/* Main Content Area */}
        <Col md={9}>
          <Nav className="flex-column">
            <div className="d-flex justify-content-between align-items-center my-4">
              <h2>Welcome, {userName}</h2>
              <div>
                <Button variant="link" onClick={handleMyPageClick}>
                  마이페이지
                </Button>
                <Button variant="link" onClick={handleLogoutClick}>
                  로그아웃
                </Button>
              </div>
            </div>
          </Nav>

          {/* Main Content Detail */}
          <Row>
            <Col sm={8}>
              {/* 병원 목록 조회 */}
              <HList />
            </Col>
            <Col sm={4}>
              {/* 오늘의 진료 일정 */}
              <TodaySchedule />
            </Col>
          </Row>

          <Row>
            <Col sm={8}>
              {/* 예약 내역 관리 */}
              <ManageReservation />
            </Col>
            <Col sm={4}>
              {/* 상세 보기 */}
              <DetailContent />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;