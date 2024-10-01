import React from 'react';
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// axios 인스턴스
export const reqestApi = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_IP}`, // 안 씀
  headers: {
      Authorization: `Bearer ${localStorage.getItem('login-token')}`,
      "Content-Type": "application/json; charset=utf8",
      withCredentials: true,
  },
});

// 토큰 재발행
export async function getRefreshToken() {
  const response = await axios.post("/api/reissue", {}, {
      headers: {
          "Content-Type": "application/json; charset=utf8",
          withCredentials: true,
      }     
  })
  return response;           
}


const Login = () => {

    const navigate = useNavigate();

    const [Id, setId] = useState("");
    const [Pw, setPw] = useState("");
    const [formGbn, setFormGbn] = useState("");
    const [userText, setUserText] = useState("사용자");
    const [adminText, setAdminText] = useState("관리자");
    const [error, setError] = useState("");

    // 로그인이 사용자인지 관리자인지 표시를 위해 
    function formOnChange(formGbn){

        // 로그인 유형 구분
        setFormGbn(formGbn);

        // 사용자
        if(formGbn === "userBtn"){
            setUserText("● 사용자");
            setAdminText("관리자");
        }
        else{
            // 관리자
            setUserText("사용자");
            setAdminText("● 관리자");
        }
    }

    // interceptor 적용
    reqestApi.interceptors.response.use(
      // 200 응답
      (response) =>{
          return response;
      },
      // 200 외
      async (error) => {
          const {
              config,
              response: { status },
          } = error;
          
          if(status === 401){
              if(error.response.statusText === "Unauthorized" ){
                  const originRequest = config;
                  try{
                      // 토큰 재발행 요청
                      const response = await getRefreshToken();
                      // 재발행 성공
                      if(response.status === 200){
                          console.log("토큰 재발행 완료");
                          const newAccessToken = response.headers.access;
                          // 로컬스토리지 NewAccessToken 저장
                          localStorage.setItem('login-token', newAccessToken);
                          // 진행중이던 요청 이어서 계속
                          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                          return axios(originRequest); 
                      }
                  }catch (error){
                      if(axios.isAxiosError(error)){
                          if(
                              error.response?.status === 403){
                              alert("해당 화면은 권한이 없습니다. home으로 이동합니다.");
                              navigate("/Home");
                          }
                          else{
                              console.log("error.response?.status : ", error.response?.status);
                              alert("토큰 재발행 요청중 오류가 발생했습니다. 관리자에게 문의해주세요.");
                          }

                      }
                  }                   
              }
          }
          return Promise.reject(error);
      },
  );    

    // 제출
    async function handleSubmit(e) {
        e.preventDefault();
        
            try{
                  const formData = new FormData();
                  formData.append("userId", Id);
                  formData.append("userPw", Pw);

                  console.log(formData, "formData");

                await reqestApi.post('/api/login', formData, {
                headers : {
                     // "Content-Type" : "application/json; charset=utf8"
                        "Content-Type" :  "multipart/form-data"
                }})   
                .then(function (response){
                    if(response.status == 200){
                      console.log("로그인이 완료되었습니다.");

                      // 액세스 토큰 로컬 스토리지에 저장, userId 세션 스토리지 저장
                      if(response.headers.access){
                        localStorage.setItem('login-token', response.headers.access);
                        sessionStorage.setItem('userId', Id);                    
                      }

                      if(formGbn === "userBtn"){
                        navigate("/UserDashboard");
                      }
                      else{
                        navigate("/HDashBoard");
                      }
                    }
                  })
                  .catch(function(error){
                    console.log("로그인 오류 : ", error);
                    if(error.status === 504){
                      alert("backend 실행 여부 확인 필요.");
                    }else{
                      alert("ID와 비밀번호를 확인해주세요.");
                    }
                  })                                       
            } catch (err) {
                setError("로그인 중 오류가 발생했습니다. 관리자에게 문의하세요.");
            }
              }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      {/* 하얀 박스 */}
      <div className="bg-white p-8 shadow-lg w-full max-w-md">
        {/* 로고 글씨 */}
        <h1 className="text-center text-3xl font-bold mb-6">LOGO</h1>
        {/* 사용자/관리자 버튼 */}
        <div className="flex justify-center mb-6"> 
          <button className="w-full py-2 bg-teal-200 text-gray-800 font-bold rounded-tl-lg focus:outline-none" onClick={(e) => formOnChange("userBtn")}>
            {userText}
          </button>
          <button className="w-full py-2 bg-gray-200 text-gray-800 font-bold rounded-tr-lg focus:outline-none" onClick={(e) => formOnChange("adminBtn")}>
            {adminText}
          </button>
        </div>
        {/* 아이디와 비밀번호 입력 */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="아이디"
            value={Id}
            onChange={(e) => setId(e.target.value)}
            className="w-full border-b-2 border-gray-400 outline-none px-1 py-2"
          />
        </div>
        <input
          type="password"
          placeholder="비밀번호"
          value={Pw}
          onChange={(e) => setPw(e.target.value)}
          className="w-full border-b-2 border-gray-400 outline-none px-1 py-2"
        />
        <button className="w-full bg-teal-500 text-white py-2 mt-9 hover:bg-teal-600 transition" type='submit' onClick={handleSubmit}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;