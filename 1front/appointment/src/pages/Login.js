import React from 'react';
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


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

    // 제출
    async function handleSubmit(e) {
        e.preventDefault();
        
        // 사용자 로그인
        //if(formGbn == "userBtn"){
            try{
                  const formData = new FormData();
                  formData.append("userId", Id);
                  formData.append("userPw", Pw);

                  console.log(formData, "formData");

                await axios.post('/api/login', formData, {
                headers : {
                     // "Content-Type" : "application/json; charset=utf8"
                        "Content-Type" :  "multipart/form-data"
                }})   
                .then(function (response){
                    if(response.status == 200){
                      alert("로그인이 완료되었습니다.");
                      navigate("/UserDashboard");
                    }
                    else{
                      alert("ID와 비밀번호를 확인해주세요.");
                    }
                  })                                         
            } catch (err) {
                setError("로그인 중 오류가 발생했습니다. 관리자에게 문의하세요.");
            }
        //}
        // 관리자 로그인
        // else if(formGbn == "adminBtn"){
        //     try{
        //         const formData = new FormData();
        //         formData.append("userId", Id);
        //         formData.append("userPw", Pw);

        //         console.log(formData, "formData");

        //       await axios.post('/api/loginAdmin', formData, {
        //       headers : {
        //            // "Content-Type" : "application/json; charset=utf8"
        //               "Content-Type" :  "multipart/form-data"
        //       }})   
        //       .then(function (response){
        //           if(response.status == 200){
        //             alert("로그인이 완료되었습니다.");
        //             navigate("/UserDashboard");
        //           }
        //           else{
        //             alert("ID와 비밀번호를 확인해주세요.");
        //           }
        //         })                                         
        //   } catch (err) {
        //       setError("로그인 중 오류가 발생했습니다. 관리자에게 문의하세요.");
        //   }            
        // }
        // else{
        //     // 아무 것도 클릭하지 않음    
        //     alert("로그인 유형을 선택 후 다시 시도하세요.");
        //     return;
        // }
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