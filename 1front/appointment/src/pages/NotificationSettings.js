// src/NotificationSettings.js
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './NotificationSettings.css';

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

const NotificationSettings = () => {

    const [contact, setContact] = useState('');// 연락처 상태
    const [receiveNotification, setReceiveNotification] = useState("");// 알림톡 수신 여부 상태
    
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
        // SMS 수신 정보 조회
        selectAlarmInfo();    
    }, []); // 마운트 될 때 한 번만 실행


    // SMS 수신 정보 저장 버튼
    async function handleSaveOnClick() {
        console.log("상태 값 저장 버튼 클릭");
       try{
           const data = {
               hospitalId: sessionStorage.getItem('userId'),
               phone: contact, // 수신 연락처
               alarmFlag: receiveNotification, // SMS 수신 여부
           };
   
           await reqestApi.post("/api/admin/saveSmsAlarm", JSON.stringify(data))
           .then(function (response){
               if(response.status === 200){
                   console.log("SMS 수신 정보 저장 완료 : ", response.data); 
               }            
           })
           .catch(function(error){
               console.log("error : ", error);
             })             
       } catch (err) {
           setError("작업 중 오류가 발생했습니다.");
       }  
   }

    // SMS 수신 정보 조회 
    async function selectAlarmInfo() {
        console.log("SMS 수신 정보 조회");
       try{
           const data = {
               hospitalId: sessionStorage.getItem('userId'),
           };
   
           await reqestApi.post("/api/admin/getSmsAlarm", JSON.stringify(data))
           .then(function (response){
               if(response.status === 200){
                setReceiveNotification(response.data.alarmFlag);
                setContact(response.data.phone);
                   console.log("SMS 수신 정보 조회 완료 : ", response.data);              
               }            
           })
           .catch(function(error){
               console.log("error : ", error);
             })             
       } catch (err) {
           setError("작업 중 오류가 발생했습니다.");
       }  
   }

    const handleChange = (e) => {
        const input = e.target.value.replace(/-/g, ''); // 숫자만 남기기
        if (input.length <= 11) { // 최대 11자리 (예: 010-1234-5678)
            const formatted = formatPhoneNumber(input);
            setContact(formatted);
        }
    };

    const formatPhoneNumber = (number) => {
        const digits = number.replace(/-/g, ''); // 하이픈 제거
        if (number.length < 4) return number; // 3자리 미만
        if (number.length < 7) return `${number.slice(0, 3)}-${number.slice(3)}`; // 3-6자리
        return `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7)}`; // 7자리 이상
    };
    
    
    return (
        <div className="notification-settings">
            <h2 className="section-title"><strong>SMS 수신 정보</strong></h2>
            <div className="section-content">
                <label htmlFor="contact">수신받을 연락처</label>
                <input
                    type="text"
                    id="contact"
                    value={contact}
                    onChange={handleChange}
                    placeholder="연락처를 입력하세요"
                />
                <hr />
                <div>
                    <span>SMS 수신 여부</span>
                    <div className="button-container">
                        <div 
                            className={`circle-button ${receiveNotification === "Y" ? 'active' : ''}`} 
                            onClick={() => setReceiveNotification("Y")}
                        >
                            <div className="inner-circle" />
                        </div>
                        <span>예</span>
                        <div 
                            className={`circle-button ${receiveNotification === "N" ? 'active' : ''}`} 
                            onClick={() => setReceiveNotification("N")}
                        >
                            <div className="inner-circle" />
                        </div>
                        <span>아니요</span>
                    </div>
                </div>
                <div className="save-button-container">
                    <button className="save-button" onClick={handleSaveOnClick}>저장하기</button>
                </div>
            </div>
        </div>
    );
};

export default NotificationSettings;