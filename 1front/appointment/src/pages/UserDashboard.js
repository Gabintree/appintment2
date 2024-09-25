// 환자 대시보드
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Navbar, Nav } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import ReservationManagement from "./ReservationManagement";
import StatusSelect from "./StatusSelect";
import StatusAndDetails from "./StatusAndDetails.js";
import NotificationSettings from "./NotificationSettings";
/*
병원 목록 조회 | 오늘의 진료 일정
예약 내역 관리 | 상세보기
*/

const UserDashboard = () => {
  const navigate = useNavigate();

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
              <h2>Welcome, Simpson</h2>
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

          {/* 2 x 2 Grid Layout */}
          <Row>
            <Col sm={8}>
              <h4>병원 목록 조회</h4>
              {/* 병원 목록 API */}
            </Col>
            <Col sm={4}>
              <h4>오늘의 진료 일정</h4>
              {/* 병원 목록 API */}
            </Col>
          </Row>

          <Row>
            <Col sm={8}>
              <h4>예약내역관리</h4>
              {/* 예약내역관리 API */}{" "}
            </Col>
            <Col sm={4}>
              <h4>상세 보기</h4>
              {/* 상세보기 컨텐츠 */}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
