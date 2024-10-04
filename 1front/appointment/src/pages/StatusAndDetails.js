// src/StatusAndDetails.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './StatusAndDetails.css';

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

const StatusAndDetails = ({reserveNo}) => {
    const [isVisible, setIsVisible] = useState(false); // 가시성 상태 추가
    const [symptoms, setSymptoms] = useState(""); // 증상
    const [phoneNumber, setPhoneNumber] = useState(""); // 연락처

    const [recieveReserveNo, setRecieveReserveNo] = useState(reserveNo); // 부모로부터 받은 예약번호
    const navigate = useNavigate();
    const [error, setError] = useState("");
    
    // 부모로부터 전달받은 reserveNo가 변경될 때마다 업데이트
    useEffect(() => {
        if (reserveNo) {
            setRecieveReserveNo(reserveNo);
            console.log("StatusAndDetails reserveNo : ", reserveNo);
            handleSearchDetail();
        }
    }, [reserveNo]); // reserveNo가 변경될 때마다 실행

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

    // 상세보기 이벤트 
    async function handleSearchDetail() {
        console.log("상세보기 이벤트");
        try{
            const data = {
                reserveNo: recieveReserveNo,
            };
    
            await requestApi.post("/api/admin/reserveDetail", JSON.stringify(data))
            .then(function (response){
                if(response.status == 200){
                    console.log("상세보기 조회 완료 : ", response.data); 
                    // setSymptoms();
                    // setPhoneNumber();
                }            
            })
            .catch(function(error){
                console.log("error : ", error);
              })             
        } catch (err) {
            setError("작업 중 오류가 발생했습니다.");
        }  
    };


    const handleToggle = () => {
        setIsVisible(!isVisible); // 가시성 토글
     };
    

    const handleChange = () => {
        alert('예약 변경 팝업');
    };

    const handleCancel = () => {
        if (window.confirm('취소하시겠습니까?')) {
            alert('예약이 취소되었습니다.');
        }
    };

    return (
        <div className="status-and-details">
            <h2 className='section-bar'> <strong>해당 예약 상세</strong></h2>
            {isVisible && ( // isVisible이 true일 때만 내용 표시
                <div className='section-content'>
                    <h4>증상:</h4>
                    <p><strong>{symptoms}</strong></p>
                    <h4>전화번호:</h4>
                    <p><strong>{phoneNumber}</strong></p>
                    <div className="button-container">
                        <button className="action-button1" onClick={handleChange}>변경하기</button>
                        <button className="action-button2" onClick={handleCancel}>취소하기</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default StatusAndDetails;