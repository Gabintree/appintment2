import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = ({ isOpen, onClose, reservation }) => {
  const [selectedTime, setSelectedTime] = useState(null); // 선택된 시간 상태
  const [selectedDate, setSelectedDate] = useState(''); // 선택된 날짜 상태

  useEffect(() => {
    if (reservation) {
      setSelectedDate(reservation.date || ''); // 예약 날짜 업데이트
    }
  }, [reservation]);

  // 이미 예약된 시간 배열
  const bookedTimes = ['11:00', '14:00', '15:00', '16:30'];
  if (!isOpen) return null; // 팝업이 열려있지 않으면 아무것도 렌더링하지 않음

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
                <span className="hospital-name">이비인후과</span>
                <span className="status-circle" style={{ backgroundColor: '#87DBD8' }}></span> {/* 대기 상태 색깔 원 */}
                <p className="hospital-title"><strong>오비오이비인후과의원</strong></p>
              </div>
              <h4>예약 날짜: <strong>{reservation.date}</strong></h4>
              <h4>예약 시간: <strong>{reservation.time}</strong></h4> {/* 선택된 시간 표시 */}
            </div>
          </div>
          <div className="change-reservation">
            <h4>변경 예약 정보</h4>
            <div className="reservation-card">
              <div className="reservation-info">
                <span className="hospital-name">이비인후과</span>
                <span className="status-circle" style={{ backgroundColor: '#87DBD8' }}></span> {/* 대기 상태 색깔 원 */}
                <p className="hospital-title"><strong>오비오이비인후과의원</strong></p>
              </div>
              <div className="date-input-container" onClick={() => document.getElementById('date-input').focus()}>
                <input
                  type="date"
                  id="date-input"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="date-input"
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

export default Popup;