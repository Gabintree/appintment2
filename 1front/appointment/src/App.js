import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom"; // Router 사용때 에러발생 -> BrowserRouter 대체
import axios from "axios";
import NavBar from "./components/NavBar";
import Home from "./pages/home";
import Login from "./pages/login"; // fix) 가빈님 로그인 페이지 파일 Login.js를 login.js로 수정함
import Register from "./pages/register";

function App() {
  // NavBar 레이아웃 테스트
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );

  // 가빈님
  /*
  const [hello, setHello] = useState("");

  useEffect(() => {
    axios
      .get("/api/hello")
      .then((response) => setHello(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      백엔드에서 가져온 데이터입니다 : {hello}
      <a href="/api/save">회원가입 </a> <br></br>
      <a href="/api/login">로그인 </a> <br></br>
      <a href="/api/list">목록 조회 </a> <br></br>
      <form action="api/save" method="post">
        <input type="text" name="userId" placeholder="아이디"></input>
        <input type="text" name="userPw" placeholder="비밀번호"></input>
        <input type="submit" value="회원가입"></input>
      </form>
      <form action="api/login" method="post">
        <input type="text" name="userId" placeholder="아이디"></input>
        <input type="password" name="userPw" placeholder="비밀번호"></input>
        <input type="submit" value="로그인"></input>
      </form>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={Home} />
          <Route path="/api/login" component={Login} />
        </Routes>
      </BrowserRouter>
    </div>
  ); */
}

export default App;
