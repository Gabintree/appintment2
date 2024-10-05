import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ReserveChangePopup.css';

// axios 인스턴스
export const requestApi = axios.create({
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

const ReserveChangePopup = ({ isOpen, onClose, reserveNo }) => {

  const navigate = useNavigate();  
  const [error, setError] = useState("");

  const [currentReserve, setCurrentReserve] = useState([]); // 기존 예약 정보
  const [hospitalWorkInfo, setHospitalWorkInfo] = useState([]); // 병원 운영 정보 
  const [timeList, setTimeList] = useState([]); // 예약 시간 리스트 
  const [selectedTime, setSelectedTime] = useState(""); // 선택된 예약 시간
  const [selectedDate, setSelectedDate] = useState(""); // 선택된 예약 날짜
     
// axios 인스턴스 첫 렌더링시 accessToken null 값 해결
requestApi.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('login-token');
    if (config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// interceptor 적용
requestApi.interceptors.response.use(
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
if (reserveNo) {
    currentReserveData(); // 기존 예약정보
    hospitalBaseWorkInfo(); // 병원 기본 정보
}}, [reserveNo]);

// 팝업 기존 예약정보 조회
async function currentReserveData() {
    console.log("팝업 예약정보 조회");
    try{
        const data = {
            reserveNo: reserveNo,
        };

        await requestApi.post("/api/admin/currentReserve", JSON.stringify(data))
        .then(function (response){
            if(response.status == 200){
                console.log("팝업 예약정보 조회완료 : ", response.data); 
                setCurrentReserve(response.data);
            }            
        })
        .catch(function(error){
            console.log("error : ", error);
            })             
    } catch (err) {
        setError("작업 중 오류가 발생했습니다.");
    }  
};

// 병원 운영 정보
async function hospitalBaseWorkInfo() {
    console.log("병원 운영 정보 조회");
    try{
        const data = {
            groupId: currentReserve[0].groupId,
        };

        await requestApi.post("/api/admin/hospitalWorkInfo", JSON.stringify(data))
        .then(function (response){
            if(response.status == 200){
                console.log("병원 운영 정보 조회완료 : ", response.data); 
                setHospitalWorkInfo(response.data);
            }            
        })
        .catch(function(error){
            console.log("error : ", error);
            })             
    } catch (err) {
        setError("작업 중 오류가 발생했습니다.");
    }  
};

// 예약 변경일자 클릭 이벤트
function onChangeWorkTime(value){
    setSelectedDate(value);
    // 해당 일자의 dayOfWeek를 찾자.
    const dayOfWeek = new Date(value).getDay();
    // react는 0 일요일 ~ 6 토요일, java는 1 월요일 ~ 7 일요일
    // 월요일
    if(dayOfWeek === 1){
        if(hospitalWorkInfo[0].dutyTime1s){
            const openTime = stringToTime(hospitalWorkInfo[0].dutyTime1s);
            const closeTime = stringToTime(hospitalWorkInfo[0].dutyTime1c);
            // 배열 생성
            const array = TimeArrayList(openTime, closeTime);
            setTimeList(array);
        }
    }
    // 화요일
    else if(dayOfWeek === 2){
        if(hospitalWorkInfo[0].dutyTime2s){
            const openTime = stringToTime(hospitalWorkInfo[0].dutyTime2s);
            const closeTime = stringToTime(hospitalWorkInfo[0].dutyTime2c);
            // 배열 생성
            const array = TimeArrayList(openTime, closeTime);
            setTimeList(array);
        }
    }
    // 수요일
    else if(dayOfWeek === 3){
        if(hospitalWorkInfo[0].dutyTime3s){
            const openTime = stringToTime(hospitalWorkInfo[0].dutyTime3s);
            const closeTime = stringToTime(hospitalWorkInfo[0].dutyTime3c);
            // 배열 생성
            const array = TimeArrayList(openTime, closeTime);
            setTimeList(array);
        }
    }    
    // 목요일
    else if(dayOfWeek === 4){
        if(hospitalWorkInfo[0].dutyTime4s){
            const openTime = stringToTime(hospitalWorkInfo[0].dutyTime4s);
            const closeTime = stringToTime(hospitalWorkInfo[0].dutyTime4c);
            // 배열 생성
            const array = TimeArrayList(openTime, closeTime);
            setTimeList(array);
        }
    }  
    // 금요일
    else if(dayOfWeek === 5){
        if(hospitalWorkInfo[0].dutyTime5s){
            const openTime = stringToTime(hospitalWorkInfo[0].dutyTime5s);
            const closeTime = stringToTime(hospitalWorkInfo[0].dutyTime5c);
            // 배열 생성
            const array = TimeArrayList(openTime, closeTime);
            setTimeList(array);
        }
     } 
    // 토요일
    else if(dayOfWeek === 6){
        if(hospitalWorkInfo[0].dutyTime6s){
            const openTime = stringToTime(hospitalWorkInfo[0].dutyTime6s);
            const closeTime = stringToTime(hospitalWorkInfo[0].dutyTime6c);
            // 배열 생성
            const array = TimeArrayList(openTime, closeTime);
            setTimeList(array);
        } 
    } 
    // 일요일
    else if(dayOfWeek === 0){
        if(hospitalWorkInfo[0].dutyTime7s){
            const openTime = stringToTime(hospitalWorkInfo[0].dutyTime7s);
            const closeTime = stringToTime(hospitalWorkInfo[0].dutyTime7c);
            // 배열 생성
            const array = TimeArrayList(openTime, closeTime);
            setTimeList(array);
        }
    }  
    // 공휴일
    else{
        if(hospitalWorkInfo[0].dutyTime8s){
            const openTime = stringToTime(hospitalWorkInfo[0].dutyTime8s);
            const closeTime = stringToTime(hospitalWorkInfo[0].dutyTime8c);
            // 배열 생성
            const array = TimeArrayList(openTime, closeTime);
            setTimeList(array);
        }
    }          
}

// 문자열을 시간으로 변환(HH:mm)
function stringToTime(stringTime){
    const date = new Date();
    date.setHours(parseInt(stringTime.substring(0, 2), 10));
    date.setMinutes(parseInt(stringTime.substring(2, 4), 10));
    date.setSeconds(0);
    return date;
}

// 배열 생성
function TimeArrayList(openTime, closeTime) {
  
    // 30분 간격으로 시간을 배열에 추가
    const timeArray = [];
    const openTimeDate = new Date(openTime); // date로 변환, 위에서 date로 변환을 했는데 왜 또 ?ㅠㅠ
    const closeTimeDate = new Date(closeTime);
    closeTimeDate.setMinutes(closeTimeDate.getMinutes()-30); // 마감시간 30분 전까지만 예약 가능하도록 처리

    while (openTimeDate <= closeTimeDate) {
        const formattedTime = openTimeDate.toTimeString().substring(0, 5); // 여기서는 또 string으로 해줘야 원하는대로 배열이 생김.
        timeArray.push(formattedTime);
        openTimeDate.setMinutes(openTimeDate.getMinutes() + 30); // 30분 추가
    }  
    console.log("timeArray", timeArray);
    return timeArray;
  }

    
  // 이미 예약된 시간 배열
  const bookedTimes = ['11:00', '14:00', '15:00', '16:30'];
   if (!isOpen){
    console.log("isOpen", isOpen);
    return null; 
   } // 팝업이 열려있지 않으면 아무것도 렌더링하지 않음

  // 예약 시간 버튼 클릭 핸들러
  const handleTimeClick = (time) => {
    if (!bookedTimes.includes(time)) {
      setSelectedTime(time); // 선택된 시간 업데이트
      alert(`선택한 시간: ${time}`); // 선택한 시간 알림
    }
  };


  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <div className="popup-body">
          <div className="existing-reservation">
            <h4>기존 예약 정보</h4>
            <div className="reservation-card">
              <div className="reservation-info">
                <span className="hospital-name">{currentReserve[0].subjectName}</span>
                {/* <span className="status-circle" style={{ backgroundColor: '#87DBD8' }}></span> 대기 상태 색깔 원 */}
                <p className="hospital-title"><strong>{currentReserve[0].hospitalName}</strong></p>
              </div>
              <h4>예약 날짜: <strong>{currentReserve[0].reserveDate}</strong></h4>
              <h4>예약 시간: <strong>{currentReserve[0].reserveTime}</strong></h4> {/* 선택된 시간 표시 */}
            </div>
          </div>
          <div className="change-reservation">
            <h4>변경 예약 정보</h4>
            <div className="reservation-card">
              <div className="reservation-info">
                <span className="hospital-name">{currentReserve[0].subjectName}</span>
                {/* <span className="status-circle" style={{ backgroundColor: '#87DBD8' }}></span> 대기 상태 색깔 원 */}
                <p className="hospital-title"><strong>{currentReserve[0].hospitalName}</strong></p>
              </div>
              <div className="date-input-container">
                <input
                  className="date-input"
                  type="date"
                  id="date-input"
                  value={selectedDate}
                  onChange={(e) => onChangeWorkTime(e.target.value)}                  
                />
              </div>
              <h4 style={{ display: 'inline', marginLeft: '10px' }}>예약 시간: <strong>{selectedTime || '11:00'}</strong></h4> {/* 선택된 시간 표시 */}
              <div className="time-selection">
                <h4>오전</h4>
                <div className="time-buttons">
                  {['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00'].map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeClick(time)}
                      className={`time-button ${bookedTimes.includes(time) ? 'disabled' : ''}`}
                      disabled={bookedTimes.includes(time)} // 예약된 시간 비활성화
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <h4>오후</h4>
                <div className="time-buttons">
                  {['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'].map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeClick(time)}
                      className={`time-button ${bookedTimes.includes(time) ? 'disabled' : ''}`}
                      disabled={bookedTimes.includes(time)} // 예약된 시간 비활성화
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveChangePopup;