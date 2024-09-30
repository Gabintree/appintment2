import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom"; // Router 사용때 에러발생 -> BrowserRouter 대체
import axios from "axios";

import NavBar from "./components/NavBar";
import Home from "./pages/Home"; // 메인
import Login from "./pages/Login"; // 로그인
import Register from "./pages/Register"; // 회원가입
import UserDashboard from "./pages/UserDashboard"; // 사용자 대시보드
import HDashBoard from "./pages/HDashBoard"; // 관리자 대시보드
import ReservationManagement from "./pages/ReservationManagement"; // (관리자)예약내역관리
import StatusAndDetails from "./pages/StatusAndDetails.js"; // (관리자)상세보기
import Footer from "./components/Footer.js"; 
import UserMyPage from "./pages/UserMyPage.js"; // 환자 마이페이지

function App() {
  // NavBar 레이아웃 테스트
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      {/* 라우팅 설정 */}
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/HDashBoard" element={<HDashBoard />}/>
        <Route path="/ReservationManagement" element={<ReservationManagement />} />
        <Route path="/StatusAndDetails" element={<StatusAndDetails />} />
        <Route path="/UserMyPage" element={<UserMyPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}



// 초기 테스트
// import React, {useEffect, useState} from 'react';
// import {  Routes, Route, BrowserRouter } from "react-router-dom";
// import axios from 'axios';
// function App() {
//    const [hello, setHello] = useState('')

//     useEffect(() => {
//         axios.get('/api/hello')
//         .then(response => setHello(response.data))
//         .catch(error => console.log(error))
//     }, []);

//     return (
//         <div>
//             <h1 className="text-3xl font-bold underline">
//                 백엔드에서 가져온 데이터입니다 : {hello}
//             </h1>

//             {/* <a href='/api/save'>회원가입 </a> <br></br>
//             <a href='/api/login'>로그인 </a> <br></br>
//             <a href='/api/list'>목록 조회 </a> <br></br> */}

//             <form action="api/save" method="post">
//                 <input type="text" name="userId" placeholder="아이디"></input>
//                 <input type="text" name="userPw" placeholder="비밀번호"></input>
//                 <input type="submit" value="회원가입"></input>
//             </form>
            
//             <form action="api/login" method="post">
//                 <input type="text" name="userId" placeholder="아이디"></input>
//                 <input type="password" name="userPw" placeholder="비밀번호"></input>
//                 <input type="submit" value="로그인"></input>
//             </form>    

//             {/* <BrowserRouter>
//                 <Routes>
//                     <Route path="/" exact element={Home}/>
//                     <Route path="/api/login" component={Login} />
//                 </Routes>
//             </BrowserRouter> */}
//         </div>
//     );
// }

export default App;