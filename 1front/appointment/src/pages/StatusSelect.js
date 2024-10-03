// StatusSelector.js
// StatusSelector.js
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import './StatusSelect.css'; // 스타일을 위한 CSS 파일

// axios 인스턴스
export const reqestApi = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`, 
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('login-token')}`,
        "Content-Type": "application/json; charset=utf8",
    },
});

// 토큰 재발행
export async function getRefreshToken() {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/reissue`, {}, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json; charset=utf8",
        }     
    })
    return response;           
}

const StatusSelect = () => {


    const [waitingStatus, setWaitingStatus] = useState(""); // 상태값
    const navigate = useNavigate();
    const [error, setError] = useState("");

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

    useEffect(() => {
        // 상태값 조회
        selectHospitalStatus();      
    }, []); // 마운트 될 때 한 번만 실행
    
    // 상태값 조회 
    async function selectHospitalStatus() {
        console.log("상태값 조회");
       try{
           const data = {
               hospitalId: sessionStorage.getItem('userId'),
           };
   
           await reqestApi.post("/api/admin/getStatus", JSON.stringify(data))
           .then(function (response){
               if(response.status === 200){
                   console.log("상태값 조회 완료 : ", response.data); 
                   const status = response.data;
                   setWaitingStatus(status);
               }            
           })
           .catch(function(error){
               console.log("error : ", error);
             })             
       } catch (err) {
           setError("작업 중 오류가 발생했습니다.");
       }  
   }

    // 상태 값 저장 버튼
    async function handleSaveOnClick() {
         console.log("상태 값 저장 버튼 클릭");
        try{
            const data = {
                hospitalId: sessionStorage.getItem('userId'),
                rushHourFlag: waitingStatus, // 상태값
            };
    
            await reqestApi.post("/api/admin/saveStatus", JSON.stringify(data))
            .then(function (response){
                if(response.status === 200){
                    console.log("상태값 저장 완료 : ", response.data); 
                }            
            })
            .catch(function(error){
                console.log("error : ", error);
              })             
        } catch (err) {
            setError("작업 중 오류가 발생했습니다.");
        }  
    }

    // 대기 상태값 변경
    async function handleStatusOnClick(status) {
        setWaitingStatus(status);
        console.log("status : ", status);
    }
 
    return (
        <div className='status-section'>
            <h2 className='title-bar'><strong>오늘의 병원 대기 상태</strong></h2>
            <div className='waiting-status'>
                <div className='status-button-container'>
                    <button
                        className={`status-button ${waitingStatus === 0 ? 'active' : ''}`}
                        aria-activedescendant=''
                        onClick={() => handleStatusOnClick(0)}
                    />
                    <div className={`color-circle1 ${waitingStatus === 0 ? 'active' : ''}`}></div>
                    <span><strong>여유</strong> 대기없이 진료가능</span>
                </div>
                <div className='status-button-container'>
                    <button
                        className={`status-button ${waitingStatus === 1 ? 'active' : ''}`}
                        onClick={() => handleStatusOnClick(1)}
                    />
                    <div className={`color-circle2 ${waitingStatus === 1 ? 'active' : ''}`}></div>
                    <span><strong>보통</strong> 대기시간 30분 이내</span>
                </div>
                <div className='status-button-container'>
                    <button
                        className={`status-button ${waitingStatus === 2 ? 'active' : ''}`}
                        onClick={() => handleStatusOnClick(2)}
                    />
                    <div className={`color-circle3 ${waitingStatus === 2 ? 'active' : ''}`}></div>
                    <span><strong>혼잡</strong> 대기시간 1시간 이상</span>
                </div>
            </div>
            <div className='save-button-container'>
                <button className='save-button' onClick={handleSaveOnClick}>저장하기</button>
            </div>
        </div>
    );
};

export default StatusSelect;

// import React from 'react';
// import './StatusSelector.css'; // 스타일을 위한 CSS 파일

// const StatusSelector = () => {
//     return (
//         <div className='status-section'>
//             <div className='status-title'>
//                 <h3>오늘의 병원 대기 상태</h3>
//             </div>
//             <div className='status-options'>
//                 <div className='status-option'>
//                     <button className='circle-button'></button>
//                     <h3>여유</h3>
//                 </div>
//                 <div className='status-option'>
//                     <button className='circle-button'></button>
//                     <h4>대기없이 진료가능</h4>
//                 </div>
//                 <div className='status-option'>
//                     <button className='circle-button'></button>
//                     <h4>대기 중</h4>
//                 </div>
//             </div>
//             <button className='save-button'>저장하기</button>
//         </div>
//     );
// };

// export default StatusSelector;