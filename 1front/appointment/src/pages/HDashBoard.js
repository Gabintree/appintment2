// HDashBoard.js
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import './HDashBoard.css';
import ReservationManagement from './ReservationManagement';
import StatusSelect from './StatusSelect';
import StatusAndDetails from './StatusAndDetails.js';
import NotificationSettings from './NotificationSettings';

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
    const response = await axios.post("/api/reissue", {}, {
        withCredentials: true, 
        headers: {
            "Content-Type": "application/json; charset=utf8",
        }     
    })
    return response;           
}


const HDashBoard = () => {
    const [userName, setUserName] = useState(""); // 사용자 이름
    const [waitingStatus, setWaitingStatus] = useState(""); // 대기 상태 값
    const [reserveNo, setReserveNo] = useState(""); // 자식에게 받아온 예약번호

    // userId
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

    const navigate = useNavigate();
    const [error, setError] = useState("");

    // axios 인스턴스 첫 렌더링시 accessToken null 값 해결
    reqestApi.interceptors.request.use((config) => {
        const accessToken = localStorage.getItem('login-token');
        if (config.headers && accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    });

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

    // 화면 로딩시 getId 조회
    async function getAdminId(){
        try{
            const data = {
                hospitalId: userId,
            };
    
           await reqestApi.post("/api/admin", JSON.stringify(data))
            .then(function (response){
                if(response.status === 200){
                    console.log("토큰 인증 완료");
                    // 병원명, 세션 스토리지 저장
                    const name = response.data;
                    setUserName(name);
                    sessionStorage.setItem('userName', name);     
                }            
            })
            .catch(function(error){
                console.log("error : ", error);
              })             
        } catch (err) {
            setError("작업중 오류가 발생했습니다.");
        }        
    };

        // 화면 로딩시 상태값 조회 
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

    // 로그아웃 
    async function logoutOnClick() {

        try{
            await reqestApi.post("/api/logout", {})
            .then(function (response){
                console.log("response : ", response);
                if(response.status == 200){
                    console.log("로그아웃 완료");
                    
                    // 로컬 스토리지 액세스 토큰 및 유저 정보 삭제
                    localStorage.removeItem('login-token');
                    sessionStorage.removeItem("userId");
                    sessionStorage.removeItem("userName"); 
                    navigate("/Home");
                }            
            })
            .catch(function(error){
                console.log("로그아웃 오류 ", error);
              })             
        } catch (err) {
            setError("로그아웃 중 오류가 발생했습니다.");
        }   
    };

    useEffect(() => {
        // 토큰 인증 및 userId 조회 
        getAdminId();        
        // 상태값 조회
        selectHospitalStatus();
    }, []); // 마운트 될 때 한 번만 실행

    // 홈으로 이동
    async function homeOnClick() {
        navigate("/Home");        
    }

    // 자식에게 받아온 예약번호
    const handledReserveNo = (sendFromChild) => {
        setReserveNo(sendFromChild);
        console.log(" 받아온 값 : ", sendFromChild);
        console.log(" 예약번호 : ", reserveNo);
    }

    const getColor = () => {
        switch (waitingStatus) {
            case 0 :
                return '#87DBD8';
            case 1 :
                return '#FFBF75';
            case 2 :
                return '#FF675E';
            default:
                return 'gray';
        }
    };

    return (
        <div className='dashboard-container'>
            {/* <div className='navigation'>
                <h1 className='logo'>logo</h1>
                <ul className='navigation-item'>
                    <li><strong>대시보드</strong></li>
                    <li>예약 내역 관리</li>
                    <li>병원 대기 상태</li>
                    <li>해당 예약 상세</li>
                    <li>알림톡 수신정보</li>
                </ul>
            </div> */}
            <div className='main-content'>
                <div className='user-name-bar'>
                    <h2>어서오세요,
                        <div className={`color-circle`} style={{ backgroundColor: getColor(), display: 'inline-block' }}></div> {/* 색깔 원 */}
                        <strong>{userName}</strong> 님</h2>
                    <div className='user-options'>
                        <button className='user-button' onClick={(e) => homeOnClick()}>홈</button>
                        <span className='divider'>|</span>
                        <button className='user-button'>마이페이지</button>
                        <span className='divider'>|</span>
                        <button className='user-button' onClick={(e) => logoutOnClick()}  >로그아웃</button>
                    </div>
                </div>
                <div className='content-area'>
                    <div className='main-left'> {/* 3 비율 부분 */}
                        <ReservationManagement sendFromChild={handledReserveNo}/>
                        {/* 추가 콘텐츠를 여기에 넣을 수 있습니다. */}
                    </div>
                    <div className='main-right'> {/* 1 비율 부분 */}
                        <div className='section'> {/* 첫 번째 섹션 */}
                            <StatusSelect /> {/*상태 변경 핸들러 추가*/}

                        </div>
                        <div className='section'> {/* 두 번째 섹션 */}
                            {/* <StatusAndDetails isVisible={isDetailsVisible}/> */}
                            <StatusAndDetails />
                        </div>
                        <div className='section'> {/* 세 번째 섹션 */}
                        <NotificationSettings />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HDashBoard;

// import React from 'react';
// import "./HDashBoard.css";


// const Dashboard = () => {
//     const hospitalName = "병원명"; // 로그인 시 데이터로 변경
//     const waitingStatus = "여유"; // 대기 상태 데이터

//     return (
//         <div className="dashboard">
//             <nav className="navbar">
//                 <h1>logo</h1>
//                 <ul>
//                     <li><strong>대시보드</strong></li>
//                     <li>예약 내역 관리</li>
//                     <li>병원 대기 상태</li>
//                     <li>해당 예약 상세</li>
//                     <li>알림톡 수신정보</li>
//                 </ul>
//             </nav>
//             <div className="content">
//                 <div className="welcome">
//                     <p>어서오세요, <strong>{hospitalName}</strong> 님</p>
//                     <div className={`status ${waitingStatus.toLowerCase()}`}>
//                         {waitingStatus}
//                     </div>
//                 </div>
//                 <div className="user-options">
//                     <button>마이페이지</button>
//                     <button>로그아웃</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;