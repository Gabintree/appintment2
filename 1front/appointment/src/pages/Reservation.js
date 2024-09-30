import React, { useState } from 'react';

const Reservation = () => {
    const [selectedTime, setSelectedTime] = useState(null);
    const [unavailableTimes, setUnavailableTimes] = useState([]);

    const handleTimeSelect = (time) => {
        if (!unavailableTimes.includes(time)) {
            setSelectedTime(time);
        }
    };

    const handleSave = () => {
        if (selectedTime) {
            setUnavailableTimes([...unavailableTimes, selectedTime]);
            setSelectedTime(null);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 md:w-96 relative">
                {/* 닫기 버튼 */}
                <button
                    className="absolute top-2 right-2 text-2xl font-bold"
                >
                    ×
                </button>

                {/* 민트색 원과 텍스트 */}
                <div className="flex items-center mb-2">
                    <div className="w-5 h-5 bg-teal-300 rounded-full mr-2"></div> {/* 민트색 원 */}
                    <h2 className="text-gray-800 font-semibold">오비오이비인후과의원</h2>
                </div>

                {/* 예약 날짜 */}
                <div className="mb-4 flex items-center">
                    <p className="text-gray-600 mr-2">예약 날짜</p>
                    <p className="border-b border-gray-300">2024.09.09</p>
                </div>

                {/* 예약 */}
                <div>
                    <p className="text-gray-600 mb-2">예약 시간</p>

                    {/* 오전 시간 */}
                    <p className="text-gray-600 mb-2 mt-4">오전</p>
                    <div className="grid grid-cols-5 gap-2 mb-4">
                        {['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '13:00', '13:30', '14:00'].map((time) => (
                            <button
                                key={time}
                                onClick={() => handleTimeSelect(time)}
                                className={`p-2 border rounded-md text-center ${unavailableTimes.includes(time)
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : selectedTime === time
                                        ? 'border-teal-400'
                                        : 'hover:border-teal-400'
                                    }`}
                                disabled={unavailableTimes.includes(time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>

                    {/* 오후 시간 */}
                    <p className="text-gray-600 mb-2 mt-4">오후</p>
                    <div className="grid grid-cols-5 gap-2">
                        {['14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'].map((time) => (
                            <button
                                key={time}
                                onClick={() => handleTimeSelect(time)}
                                className={`p-2 border rounded-md text-center ${unavailableTimes.includes(time)
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : selectedTime === time
                                        ? 'border-teal-400'
                                        : 'hover:border-teal-400'
                                    }`}
                                disabled={unavailableTimes.includes(time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 저장하기 버튼 */}
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 border border-teal-400 text-teal-400 rounded-md hover:bg-teal-50"
                    >
                        저장하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reservation;
