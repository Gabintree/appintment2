// src/ReservationManagement.js
// ReservationManagement.js
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from 'moment';

import './ReservationManagement.css';
import StatusAndDetails from './StatusAndDetails';

// axios 인스턴스
export const reqestApi = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`, 
    headers: {
        Authorization: `Bearer ${localStorage.getItem('login-token')}`,
        "Content-Type": "application/json; charset=utf8",
        withCredentials: true,
    },
});

// 토큰 재발행
export async function getRefreshToken() {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/reissue`, {}, {
        headers: {
            "Content-Type": "application/json; charset=utf8",
            withCredentials: true,
        }     
    })
    return response;           
}

const ReservationManagement = () => {
    
    const nowDate = new Date();
    const today = new Date().toISOString().split('T')[0]; // 오늘 날짜
    const after3month =  new Date(nowDate.setMonth(nowDate.getMonth() + 3)).toISOString().split('T')[0]; // 3개월

    const [startDate, setStartDate] = useState(today); // 조회일자 from
    const [endDate, setEndDate] = useState(after3month); // 조회일자 to
    const [filteredReservations, setFilteredReservations] = useState([]); // 필터링된 예약 데이터
    const [isVisible, setIsVisible] = useState(false);
    const [visibleReservationId, setVisibleReservationId] = useState(null); // 현재 상세보기 예약 ID


    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

    const toggleDetails = (id) => {
        setVisibleReservationId(visibleReservationId === id ? null : id); // 클릭한 예약 ID 토글
    };



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
        // 예약 내역 관리 조회 
        handleSearchOnClick();      
    }, []); // 마운트 될 때 한 번만 실행


    // 예약 내역 관리 조회 버튼
    async function handleSearchOnClick() {
        console.log("예약 내역 관리 조회 클릭");
        try{
            const data = {
                hospitalId: userId,
                fromDate: startDate,
                toDate : endDate
            };
    
            await reqestApi.post("/api/admin/reserveList", JSON.stringify(data))
            .then(function (response){
                if(response.status == 200){
                    console.log("예약 내역 조회 완료 : ", response.data); 
                    const changedData = response.data;
                    setFilteredReservations(changedData);
                }            
            })
            .catch(function(error){
                console.log("error : ", error);
              })             
        } catch (err) {
            setError("작업 중 오류가 발생했습니다.");
        }  
    };

    return (
        <div className='reservation-management'>
            <div className='title-bar'><strong>예약 내역 관리</strong></div>
            <div className='date-selection'>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                <span>~ </span>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                <button onClick={handleSearchOnClick}>조회</button>
            </div>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr><th>예약번호</th>
                            <th>예약날짜</th>
                            <th>예약시간</th>
                            <th>성명</th>
                            <th>생년월일</th>
                            <th>진료과목</th>
                            <th>예약상태</th>
                            <th>상세보기</th>
                            <th>예약변경자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReservations.length > 0 ? (

                            filteredReservations.map(reservation => (
                                <tr key={reservation.reserveNo}>
                                    <td>{reservation.reserveNo}</td>
                                    <td>{moment(reservation.reserveDate).format("yyyy-MM-DD")}</td>
                                    <td>{reservation.reserveTime}</td>
                                    <td>{reservation.userName}</td>
                                    <td>{reservation.birthDate}</td>
                                    <td>{reservation.subjectName}</td>
                                    <td>{reservation.reseveStatus = "I" ? "예약완료" : reservation.reseveStatus = "U" ? "변경완료" : "취소완료"}</td>
                                    <td>
                                        <button className='detail-button' onClick={() => toggleDetails(reservation.reserveNo)} style={{ cursor: 'pointer' }}>상세보기</button>
                                    </td>
                                    <td>{!reservation.updateUser ? "-" : reservation.updateUser}</td> {/* 예약 변경자 추가 */}
                                </tr>
                            ))
                        ):(<tr><td colSpan="9">예약 내역이 없습니다.</td></tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReservationManagement;

// import React, { useState } from 'react';
// import './ReservationManagement.css';

// const ReservationManagement = () => {
//     const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
//     const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
//     const [reservations, setReservations] = useState([]); // 예약 데이터
//     const [filteredReservations, setFilteredReservations] = useState([]);

//     const handleSearch = () => {
//         // 여기에 백엔드 API 호출 로직 추가
//         // 예시 데이터
//         const exampleData = [
//             { id: '000001', date: '2024-09-09', time: '14:00', name: '김김김', birth: '1990-01-01', department: '이비인후과', status: '예약완료', phone: '010-1234-5678' },
//             // 추가 데이터...
//         ];
//         // 날짜 필터링
//         const filtered = exampleData.filter(reservation => {
//             return reservation.date >= startDate && reservation.date <= endDate;
//         });
//         setFilteredReservations(filtered);
//     };

//     return (
//         <div className="reservation-management">
//             <h2>예약 내역 관리</h2>
//             <div className="date-selection">
//                 <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//                 <span>-</span>
//                 <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//                 <button onClick={handleSearch}>조회</button>
//             </div>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>예약번호</th>
//                         <th>예약날짜</th>
//                         <th>예약시간</th>
//                         <th>성명</th>
//                         <th>생년월일</th>
//                         <th>진료과목</th>
//                         <th>예약상태</th>
//                         <th>상세보기</th>
//                         <th>예약변경자</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredReservations.map(reservation => (
//                         <tr key={reservation.id}>
//                             <td>{reservation.id}</td>
//                             <td>{reservation.date}</td>
//                             <td>{reservation.time}</td>
//                             <td>{reservation.name}</td>
//                             <td>{reservation.birth}</td>
//                             <td>{reservation.department}</td>
//                             <td>{reservation.status}</td>
//                             <td>
//                                 <button onClick={() => alert(`상세보기: ${reservation.id}`)}>상세보기</button>
//                             </td>
//                             <td>
//                                 <button>변경하기</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ReservationManagement;