// src/NotificationSettings.js
import React, { useState } from 'react';
import './NotificationSettings.css';

const NotificationSettings = () => {
    const [contact, setContact] = useState('');// 연락처 상태
    const [receiveNotification, setReceiveNotification] = useState(false);// 알림톡 수신 여부 상태

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
    
    
    const handleSave = () => {
        // 저장 로직 추가
        alert(`연락처: ${contact}, 알림톡 수신 여부: ${receiveNotification ? '예' : '아니요'}`);
    };

    return (
        <div className="notification-settings">
            <h2 className="section-title"><strong>알림톡 수신 정보</strong></h2>
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
                    <span>알림톡 수신 여부</span>
                    <div className="button-container">
                        <div 
                            className={`circle-button ${receiveNotification ? 'active' : ''}`} 
                            onClick={() => setReceiveNotification(true)}
                        >
                            <div className="inner-circle" />
                        </div>
                        <span>예</span>
                        <div 
                            className={`circle-button ${!receiveNotification ? 'active' : ''}`} 
                            onClick={() => setReceiveNotification(false)}
                        >
                            <div className="inner-circle" />
                        </div>
                        <span>아니요</span>
                    </div>
                </div>
                <div className="save-button-container">
                    <button className="save-button" onClick={handleSave}>저장하기</button>
                </div>
            </div>
        </div>
    );
};

export default NotificationSettings;