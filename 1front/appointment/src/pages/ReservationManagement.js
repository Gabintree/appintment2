// src/ReservationManagement.js
// ReservationManagement.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from 'moment';



import './ReservationManagement.css';
import StatusAndDetails from './StatusAndDetails';
import reactSelect from 'react-select';

const ReservationManagement = () => {
    
    const today = new Date().toISOString().split('T')[0]; // 오늘 날짜
    const [startDate, setStartDate] = useState(today); // 조회일자 from
    const [endDate, setEndDate] = useState(""); // 조회일자 to
    const [filteredReservations, setFilteredReservations] = useState([]); // 필터링된 예약 데이터
    const [isVisible, setIsVisible] = useState(false);
    const [visibleReservationId, setVisibleReservationId] = useState(null); // 현재 상세보기 예약 ID

    const [accessToken, setAccessToken] = useState(localStorage.getItem('login-token'));
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const toggleDetails = (id) => {
        setVisibleReservationId(visibleReservationId === id ? null : id); // 클릭한 예약 ID 토글
    };

    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
    
    // 토큰 재발행
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
                    console.log("response2.headers.access", response2.headers.access);
                }            
            })
            .catch(function(error){
                console.log("토큰 재발행 오류 ", error);
              })             
        } catch (err) {
            setError("등록 중 오류가 발생했습니다.");
        }          
    };


    // 예약 내역 관리 조회 버튼
    async function handleSearchOnClick() {
        console.log("클릭이벤트");
        // 재발행한 경우 변경된 액세스토큰을 로컬스토리지에서 조회
        setAccessToken(localStorage.getItem('login-token'));
        try{
            const data = {
                hospitalId: userId,
                fromDate: startDate,
                toDate : endDate
            };
    
            await axios.post("/api/admin/reserveList", JSON.stringify(data), {     
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json; charset=utf8",
                    withCredentials: true,            
                },
            })
            .then(function (response){
                if(response.status == 200){
                    console.log("조회 완료 : ", response.data); 
                    const changedData = response.data;
                    setFilteredReservations(changedData);
                }            
            })
            .catch(function(error){
                console.log("error : ", error);
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

    return (
        <div className='reservation-management'>
            <div className='title-bar'><strong>예약 내역 관리</strong></div>
            <div className='date-selection'>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                <span>-</span>
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
                                    <td>{moment(reservation.reserveTime).format("hh:mm")}</td>
                                    <td>{reservation.userId}</td>
                                    <td>{reservation.birth}</td>
                                    <td>{reservation.subject}</td>
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