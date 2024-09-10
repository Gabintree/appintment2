import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = userState('');
    const [loginCheck, setLoginCheck] = userState(false); // 로그인 상태 체크

    useEffect(() => {
        axios.get('/api/login')
        .then(response => setLogin(response.data), setUserPw(response.data))
        .catch(error => console.log(error))
    }, []);

    return(
        <div>            
            <form action="api/login">
                <input type="text" name="userId" placeholder="아이디"></input>
                <input type="text" name="userPw" placeholder="비밀번호"></input>
                <input type="submit" value="로그인"></input>
            </form>            
        </div>
    )  
}

 export default Login;


