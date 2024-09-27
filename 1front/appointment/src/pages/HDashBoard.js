// HDashBoard.js
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import './HDashBoard.css';
import ReservationManagement from './ReservationManagement';
import StatusSelect from './StatusSelect';
import StatusAndDetails from './StatusAndDetails.js';
import NotificationSettings from './NotificationSettings';


const HDashBoard = () => {
    const [userName, setUserName] = useState(''); // 사용자 이름 상태
    const [waitingStatus, setWaitingStatus] = useState(''); // 대기 상태 추가
    const [reservations, setReservations] = useState([]); // 예약 내역 상태 추가
    const [isDetailsVisible, setIsDetailsVisible] = useState(false); // 상세보기 상태 추가

    // 액세스 토큰 및 userId
    const [accessToken, setAccessToken] = useState(localStorage.getItem('login-token'));
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

    const navigate = useNavigate();
    const [error, setError] = useState("");



    // 화면 로딩시 getId 조회
    async function getAdminId(){
        try{
            const data = {
                hospitalId: userId,
            };
    
            await axios.post("/api/admin", JSON.stringify(data), {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json; charset=utf8",
                    withCredentials: true,
                }
            })
            .then(function (response){
                if(response.status == 200){
                    console.log("토큰 인증 완료");
                    const name = response.data;
                    setUserName(name);  
                    // 세션 스토리지에 이름도 저장
                    sessionStorage.setItem('userName', name); 
    
                }            
            })
            .catch(function(error){
                if(error.status == 401){
                    console.log("인증 오류 401 : 토큰 만료");
                    // 토큰 재발행 요청
                    getRefreshToken();
                }
                else if(error.status == 403){
                    console.log("인증 오류 403 : 권한 없음");
                    alert("해당 페이지는 권한이 없습니다. home으로 이동합니다.");
                    navigate("/Home");
                }
              })             
        } catch (err) {
            setError("등록 중 오류가 발생했습니다.");
        }        
    };

    async function getRefreshToken() {
        try{
            await axios.post("/api/reissue", {}, {
                headers: {
                    "Content-Type": "application/json; charset=utf8",
                    withCredentials: true,
                }
            })
            .then(function (response2){
                if(response2.status == 200){
                    console.log("토큰 재발행 완료");
                    // 로컬 스토리지에 새로 저장, 변수에도 저장
                    localStorage.setItem('login-token', response2.headers.access);                    
                    setAccessToken(response2.headers.access);

                }            
            })
            .catch(function(error){
                console.log("토큰 재발행 오류 ", error);
              })             
        } catch (err) {
            setError("등록 중 오류가 발생했습니다.");
        }          
    };

    // 로그아웃 
    async function logoutOnClick() {

        try{
            await axios.post("/api/logout", {}, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json; charset=utf8",
                    withCredentials: true,
                }
            })
            .then(function (response){
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
        
        // // 임의의 예약 데이터 추가
        // const fetchReservations = async () => {
        //     const dummyData = [
        //         { id: 1, date: '2023-10-01', time: '10:00', name: '김철수', birth: '1990-01-01', department: '내과', status: '확정', changer: '홍길동' },
        //         { id: 2, date: '2023-10-02', time: '11:00', name: '이영희', birth: '1985-05-05', department: '내과', status: '확정', changer: '홍길동' },
        //         { id: 3, date: '2023-10-03', time: '09:30', name: '박민수', birth: '1992-03-15', department: '내과', status: '대기', changer: '홍길동' },
        //     ];
        //     setReservations(dummyData);
        // };

        // fetchUserName();
        // fetchReservations();
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    const handleStatusChange = (status) => {
        setWaitingStatus(status); // 대기 상태 업데이트
    };

    const handleDetailClick = () => {
        setIsDetailsVisible(prev => !prev); // 상세보기 토글
    };

    const getColor = () => {
        switch (waitingStatus) {
            case '여유':
                return '#87DBD8';
            case '보통':
                return '#FFBF75';
            case '혼잡':
                return '#FF675E';
            default:
                return 'gray';
        }
    };

    return (
        <div className='dashboard-container'>
            <div className='navigation'>
                <h1 className='logo'>logo</h1>
                <ul className='navigation-item'>
                    <li><strong>대시보드</strong></li>
                    <li>예약 내역 관리</li>
                    <li>병원 대기 상태</li>
                    <li>해당 예약 상세</li>
                    <li>알림톡 수신정보</li>
                </ul>
            </div>
            <div className='main-content'>
                <div className='user-name-bar'>
                    <h2>어서오세요,
                        <div className={`color-circle`} style={{ backgroundColor: getColor(), display: 'inline-block' }}></div> {/* 색깔 원 */}
                        <strong>{userName}</strong> 님</h2>
                    <div className='user-options'>
                        <button className='user-button'>마이페이지</button>
                        <span className='divider'>|</span>
                        <button className='user-button' onClick={(e) => logoutOnClick()}  >로그아웃</button>
                    </div>
                </div>
                <div className='content-area'>
                    <div className='main-left'> {/* 3 비율 부분 */}
                        <ReservationManagement />
                        {/* 추가 콘텐츠를 여기에 넣을 수 있습니다. */}
                    </div>
                    <div className='main-right'> {/* 1 비율 부분 */}
                        <div className='section'> {/* 첫 번째 섹션 */}
                            <StatusSelect onStatusChange={handleStatusChange} /> {/* 상태 변경 핸들러 추가 */}

                        </div>
                        <div className='section'> {/* 두 번째 섹션 */}
                            <StatusAndDetails isVisible={isDetailsVisible}/>
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