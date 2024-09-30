import React, { useState } from 'react';
import './Popup.css';

const ReservationPopup = ({ isOpen, onClose }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  // 예약 시간 버튼 클릭 핸들러
  const handleTimeClick = (time) => {
    setSelectedTime(time);
    alert(`선택한 시간: ${time}`);
  };

  // 이미 예약된 시간 배열
  const bookedTimes = ['11:00', '14:00', '15:00', '16:30'];
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <div className="popup-body">
          <h4>예약하기</h4>
          <div className="date-input-container">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
            />
          </div>
          <h4>예약 시간 선택</h4>
          <div className="time-selection">
            <h4>오전</h4>
            <div className="time-buttons">
              {['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00'].map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeClick(time)}
                  className={`time-button ${bookedTimes.includes(time) ? 'disabled' : ''}`}
                  disabled={bookedTimes.includes(time)}
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
                  disabled={bookedTimes.includes(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPopup;