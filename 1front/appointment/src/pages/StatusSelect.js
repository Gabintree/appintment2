// StatusSelector.js
// StatusSelector.js
import React, { useState } from 'react';
import './StatusSelect.css'; // 스타일을 위한 CSS 파일

const StatusSelect = ({ onStatusChange }) => {
    const [waitingStatus, setWaitingStatus] = useState('');

    const handleWaitingStatusChange = (status) => {
        setWaitingStatus(status);
    };

    const handleSave = () => {
        onStatusChange(waitingStatus);
        alert(`상태가 ${waitingStatus}로 저장되었습니다.`);
    };

    return (
        <div className='status-section'>
            <h2 className='title-bar'><strong>오늘의 병원 대기 상태</strong></h2>
            <div className='waiting-status'>
                <div className='status-button-container'>
                    <button
                        className={`status-button ${waitingStatus === '여유' ? 'active' : ''}`}
                        onClick={() => handleWaitingStatusChange('여유')}
                    />
                    <div className={`color-circle1 ${waitingStatus === '여유' ? 'active' : ''}`}></div>
                    <span><strong>여유</strong> 대기없이 진료가능</span>
                </div>
                <div className='status-button-container'>
                    <button
                        className={`status-button ${waitingStatus === '보통' ? 'active' : ''}`}
                        onClick={() => handleWaitingStatusChange('보통')}
                    />
                    <div className={`color-circle2 ${waitingStatus === '보통' ? 'active' : ''}`}></div>
                    <span><strong>보통</strong> 대기시간 30분 이내</span>
                </div>
                <div className='status-button-container'>
                    <button
                        className={`status-button ${waitingStatus === '혼잡' ? 'active' : ''}`}
                        onClick={() => handleWaitingStatusChange('혼잡')}
                    />
                    <div className={`color-circle3 ${waitingStatus === '혼잡' ? 'active' : ''}`}></div>
                    <span><strong>혼잡</strong> 대기시간 1시간 이상</span>
                </div>
            </div>
            <div className='save-button-container'>
                <button className='save-button' onClick={handleSave}>저장하기</button>
            </div>
        </div>
    );
};

export default StatusSelect;

// import React from 'react';
// import './StatusSelector.css'; // 스타일을 위한 CSS 파일

// const StatusSelector = () => {
//     return (
//         <div className='status-section'>
//             <div className='status-title'>
//                 <h3>오늘의 병원 대기 상태</h3>
//             </div>
//             <div className='status-options'>
//                 <div className='status-option'>
//                     <button className='circle-button'></button>
//                     <h3>여유</h3>
//                 </div>
//                 <div className='status-option'>
//                     <button className='circle-button'></button>
//                     <h4>대기없이 진료가능</h4>
//                 </div>
//                 <div className='status-option'>
//                     <button className='circle-button'></button>
//                     <h4>대기 중</h4>
//                 </div>
//             </div>
//             <button className='save-button'>저장하기</button>
//         </div>
//     );
// };

// export default StatusSelector;