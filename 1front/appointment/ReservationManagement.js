// src/ReservationManagement.js
// ReservationManagement.js
import React, { useState } from 'react';
import './ReservationManagement.css';
import StatusAndDetails from './StatusAndDetails';

const ReservationManagement = () => {
    const today = new Date().toISOString().split('T')[0]; // 오늘 날짜
    const [startDate, setStartDate] = useState(today); // 시작일
    const [endDate, setEndDate] = useState(''); // 종료일
    const [filteredReservations, setFilteredReservations] = useState([]); // 필터링된 예약 데이터
    const [isVisible, setIsVisible] = useState(false);
    const [visibleReservationId, setVisibleReservationId] = useState(null); // 현재 상세보기 예약 ID

    const toggleDetails = (id) => {
        setVisibleReservationId(visibleReservationId === id ? null : id); // 클릭한 예약 ID 토글
    };

    // 오늘 날짜를 기준으로 더미 데이터 생성
    const generateDummyData = () => {
        const dummyData = [];
        for (let i = 0; i < 5; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i); // 오늘부터 i일 후의 날짜
            const formattedDate = date.toISOString().split('T')[0];
            dummyData.push({
                id: `00000${i + 1}`,
                date: formattedDate,
                time: `${9 + i}:00`, // 9시부터 시작
                name: `환자${i + 1}`,
                birth: `199${i}-01-01`,
                department: '내과',
                status: '예약완료',
                changer: i % 2 === 0 ? '홍길동' : '한국대학병원', // 변경자: 홀수는 사용자, 짝수는 병원
            });
        }
        return dummyData;
    };

    const exampleData = generateDummyData(); // 더미 데이터 생성

    const handleSearch = () => {
        // 날짜 필터링
        const filtered = exampleData.filter(reservation => {
            return reservation.date >= startDate && (endDate ? reservation.date <= endDate : true);
        });
        setFilteredReservations(filtered);
    };
    return (
        <div className='reservation-management'>
            <div className='title-bar'><strong>예약 내역 관리</strong></div>
            <div className='date-selection'>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <span>-</span>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <button onClick={handleSearch}>조회</button>
            </div>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>예약번호</th>
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
                                <tr key={reservation.id}>
                                    <td>{reservation.id}</td>
                                    <td>{reservation.date}</td>
                                    <td>{reservation.time}</td>
                                    <td>{reservation.name}</td>
                                    <td>{reservation.birth}</td>
                                    <td>{reservation.department}</td>
                                    <td>{reservation.status}</td>
                                    <td>
                                        <button className='detail-button' onClick={() => toggleDetails(reservation.id)} style={{ cursor: 'pointer' }}>상세보기</button>
                                    </td>
                                    <td>{reservation.changer}</td> {/* 예약 변경자 추가 */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9">예약 내역이 없습니다.</td>
                            </tr>
                        )}
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