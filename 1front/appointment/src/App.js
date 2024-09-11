// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, {useEffect, useState} from 'react';
import {  Routes, Route, BrowserRouter } from "react-router-dom";
import axios from 'axios';
function App() {
   const [hello, setHello] = useState('')

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                백엔드에서 가져온 데이터입니다 : {hello}
            </h1>

            {/* <a href='/api/save'>회원가입 </a> <br></br>
            <a href='/api/login'>로그인 </a> <br></br>
            <a href='/api/list'>목록 조회 </a> <br></br> */}

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

            {/* <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={Home}/>
                    <Route path="/api/login" component={Login} />
                </Routes>
            </BrowserRouter> */}
        </div>
    );
}

export default App;