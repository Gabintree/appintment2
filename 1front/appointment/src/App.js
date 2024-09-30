import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import LoginForm from './pages/LoginForm';
import HomePage from './pages/HomePage';

function App() {
    const [hello, setHello] = useState('');

    useEffect(() => {
        axios.get('/api/hello')
            .then(response => setHello(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <BrowserRouter>
            <div>
                <h1 className="text-3xl font-bold underline">
                   {hello}
                </h1>

                {/* 회원가입 폼 */}
                <form action="api/save" method="post">
                    <input type="text" name="userId" placeholder="아이디" />
                    <input type="text" name="userPw" placeholder="비밀번호" />
                    <input type="submit" value="회원가입" />
                </form>

                {/* 로그인 폼 */}
                <form action="api/login" method="post">
                    <input type="text" name="userId" placeholder="아이디" />
                    <input type="password" name="userPw" placeholder="비밀번호" />
                    <input type="submit" value="로그인" />
                </form>

                {/* 라우팅 설정 */}
                <Routes>
                    <Route path="/homepage" element={<HomePage />} />
                    <Route path="/login" element={<LoginForm />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
