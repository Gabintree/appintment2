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
            백엔드에서 가져온 데이터입니다 : {hello}
            {/* <a href='/api/save'>회원가입 </a>
            <a href='/api/login'>로그인 </a>
            <a href='/api/list'>목록 조회 </a> */}

            <form action="api/save" method="post">
                <input type="text" name="id" placeholder="아이디"></input>
                <input type="text" name="password" placeholder="비밀번호"></input>
                <input type="submit" value="회원가입"></input>
            </form>
        </div>
    );
}

export default App;