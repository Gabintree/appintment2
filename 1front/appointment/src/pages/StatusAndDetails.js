// src/StatusAndDetails.js
import React, { useState } from 'react';
import './StatusAndDetails.css';

const StatusAndDetails = () => {
    const [isVisible, setIsVisible] = useState(false); // 가시성 상태 추가
    const [symptoms, setSymptoms] = useState('1주일간 지속되는 가래와 기침'); // 예시 데이터
    const [phoneNumber, setPhoneNumber] = useState('010-1234-5678'); // 예시 데이터
    const [notificationContact, setNotificationContact] = useState('');
    const [receiveNotification, setReceiveNotification] = useState(false);

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
            <button onClick={handleToggle} style={{ marginLeft: '10px' }}>
                    {isVisible ? '숨기기' : '상세보기'}
                </button>
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