import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import homeImage from '../images/image_home.png';
import pic1 from '../images/image_1.png';
import pic2 from '../images/image_2.png';
import pic3 from '../images/image_3.png';

const Home = () => {

  const [selectedSido, setSelectedSido] = useState(""); // 시도구분
  const [selectedGugun, setSelectedGugun] = useState(""); // 구군
  const [selectedDong, setSelectedDong] = useState(""); // 동
  const [selectedSubject, setSelectedSubject] = useState(""); // 진료과목 코드
  const [selectedDate, setSelectedDate] = useState(""); // 진료 예정 일자
  const [selectedTime, setSelectedTime] = useState(""); // 진료 예정 시간
  const [isChecked, setIsChecked] = useState(); // 공휴일 여부

  const [filteredHospitalData, setFilteredHospitalDaata] = useState([]); // 병원 목록
  const [dayOfWeek, setDayOfWeek] = useState(); // 진료 예정 일자의 요일
  const [error, setError] = useState(""); 

  // 시도
  function handleOnChangeSido(options) {
      setSelectedSido(options);
  };

  // 구군 // 시도 선택에 따라서 구군 값이 변경되어야 함.
  function handleOnChangeDong(options) {
      setSelectedDong(options);
  };

  // 동 // 구군 선택에 따라서 구군 값이 변경되어야 함.
  function handleOnChangeGuGun(options) {
    setSelectedGugun(options);
};  

  // 진료과목
  function handleOnChangeSubject(options) {
      setSelectedSubject(options);
  };

  // 진료 일자 변경
  function selectedDateOnChange(date){
    setSelectedDate(date);  
    // const week = new Date(date).getDay();
    // setDayOfWeek(week); 

    // 일	0, 월	1, 화	2, 수	3, 목	4, 금	5, 토	6
  }

  // 시간
  function handleOnChangeTime(options) {
      setSelectedTime(options);
  };  

  // 공휴일 체크 박스
  function checkedOnChange(isChecked){
    console.log("isChecked", isChecked);
    setIsChecked(isChecked)
  };


  // 병원 목록 조회 검색 버튼
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("병원 목록 조회");

    const week = new Date(selectedDate).getDay();
    setDayOfWeek(week); 
    // 공휴일이면
    if(isChecked === true){
      setDayOfWeek(8);
    };

    try{
        const data = {
          selectedSido: selectedSido,
          selectedGugun: selectedGugun,
          selectedDong: selectedDong,
          selectedSubject: selectedSubject,
          selectedDate: selectedDate,
          selectedTime: selectedTime,
          isChecked: isChecked.toString(),   
        };

        await axios.post("/api/hospitalList", JSON.stringify(data), {
          headers: {
            //Authorization: `Bearer ${localStorage.getItem('login-token')}`,
            "Content-Type": "application/json; charset=utf8",
            //withCredentials: true,
        }})
        .then(function (response){
            if(response.status === 200){
                console.log("병원 목록 조회 완료 : ", response.data); 
               setFilteredHospitalDaata(response.data);
            }            
        })
        .catch(function(error){
            console.log("error : ", error);
          })              

    } catch (err) {
        setError("등록 중 오류가 발생했습니다.");
    }
  }


  return (
    <>
    {/* 네비게이션 바 */}
    <nav className="flex justify-between p-6 bg-teal-300">
    <h1 className="text-3xl">LOGO</h1>
    <div className="space-x-4">
        <a href="/login" className="text-lg font-semibold">로그인</a>
        <a href="/register" className="text-lg font-semibold">회원가입</a>
    </div>
    </nav>

    {/* 배경 이미지 및 텍스트 섹션 */}
    <div>
        <div className="w-auto h-[65vh] bg-cover bg-center"
             style={{ backgroundImage: `url(${homeImage})` }}>

            <p className="text-lg text-white font-semibold pl-10 pt-10 ml-5 pb-5">
                불필요한 대기 시간과 복잡한 절차 없이, 스마트하고 편리한 예약 시스템을 경험해보세요.
            </p>
            <p className='text-white text-4xl font-semibold tracking-tighter pl-12 ml-3 '>손쉬운 병원 예약<br></br>이제 클릭 한 번으로!</p>

            {/* 이미지 하단쪽 선택 버튼*/}
            <div className="mt-10 left-0 w-full flex justify-around py-14">

            <div className="relative inline-block text-left">
                <select
                    className="text-lg font-semibold bg-transparent border-b-2 border-white pb-2 cursor-pointer"
                    style={{ color: 'white' }}
                    onChange={(e) => handleOnChangeSido(e.target.value)} 
                    value={selectedSido}
                >
                        <option value="">시/도 선택</option> 
                        <option value="서울특별시" style={{ color: 'black' }}>서울특별시</option>
                        <option value="대전광역시" style={{ color: 'black' }}>대전광역시</option>
                        <option value="대구광역시" style={{ color: 'black' }}>대구광역시</option>
                        <option value="부산광역시" style={{ color: 'black' }}>부산광역시</option>

                </select>
            </div>

            <div className="relative inline-block text-left">
                <select
                    className="text-lg font-semibold bg-transparent border-b-2 border-white pb-2 cursor-pointer"
                    style={{ color: 'white' }}
                    onChange={(e) => handleOnChangeGuGun(e.target.value)} 
                    value={selectedGugun}
                >
                        <option value="">구/군 선택</option> 
                        <option value="강남구" style={{ color: 'black' }}>강남구</option>
                        <option value="강동구" style={{ color: 'black' }}>강동구</option>
                        <option value="강북구" style={{ color: 'black' }}>강북구</option>
                        <option value="강서구" style={{ color: 'black' }}>강서구</option>
                </select>
            </div>

            <div className="relative inline-block text-left">
                <select
                    className="text-lg font-semibold bg-transparent border-b-2 border-white pb-2 cursor-pointer"
                    style={{ color: 'white' }}
                    onChange={(e) => handleOnChangeDong(e.target.value)} 
                    value={selectedDong}
                >
                        <option value="">동 선택</option> 
                        <option value="신사동" style={{ color: 'black' }}>신사동</option>
                        <option value="수서동" style={{ color: 'black' }}>수서동</option>
                        <option value="청담동" style={{ color: 'black' }}>청담동</option>
                        <option value="역삼1동" style={{ color: 'black' }}>역삼1동</option>
                </select>
            </div>            

            <div className="relative inline-block text-left">
                <select
                    className="text-lg font-semibold bg-transparent border-b-2 border-white pb-2 cursor-pointer"
                    style={{ color: 'white' }}
                    onChange={(e) => handleOnChangeSubject(e.target.value)} 
                    value={selectedSubject}
                >
                        <option value="">진료과목 선택</option> 
                        <option value="D001" style={{ color: 'black' }}>내과</option>
                        <option value="D002" style={{ color: 'black' }}>소아청소년과</option>
                        <option value="D003" style={{ color: 'black' }}>신경과</option>
                        <option value="D004" style={{ color: 'black' }}>정신건강의학과</option>     
                        <option value="D005" style={{ color: 'black' }}>피부과</option>
                        <option value="D006" style={{ color: 'black' }}>외과</option>   
                        <option value="D007" style={{ color: 'black' }}>흉부외과</option>
                        <option value="D008" style={{ color: 'black' }}>정형외과</option>   
                        <option value="D009" style={{ color: 'black' }}>신경외과</option>
                        <option value="D010" style={{ color: 'black' }}>성형외과</option>    
                        <option value="D011" style={{ color: 'black' }}>산부인과</option>
                        <option value="D012" style={{ color: 'black' }}>안과</option>    
                        <option value="D013" style={{ color: 'black' }}>이비인후과</option>
                        <option value="D014" style={{ color: 'black' }}>비뇨기과</option>  
                        <option value="D016" style={{ color: 'black' }}>재활의학과</option>  
                        <option value="D017" style={{ color: 'black' }}>마취통증의학과</option>  
                        <option value="D018" style={{ color: 'black' }}>영상의학과</option>  
                        <option value="D019" style={{ color: 'black' }}>치료방사선과</option>    
                        <option value="D020" style={{ color: 'black' }}>임상병리과</option>    
                        <option value="D021" style={{ color: 'black' }}>해부병리과</option>    
                        <option value="D022" style={{ color: 'black' }}>가정의학과</option>    
                        <option value="D023" style={{ color: 'black' }}>핵의학과</option>    
                        <option value="D024" style={{ color: 'black' }}>응급의학과</option>    
                        <option value="D026" style={{ color: 'black' }}>치과</option>    
                        <option value="D034" style={{ color: 'black' }}>구강악안면외과</option> 

                            {/* ★ 진료과목 : D001:내과, D002:소아청소년과, D003:신경과, D004:정신건강의학과, D005:피부과, D006:외과, D007:흉부외과, 
                            D008:정형외과, D009:신경외과, D010:성형외과, D011:산부인과, D012:안과, D013:이비인후과, D014:비뇨기과, D016:재활의학과, 
                            D017:마취통증의학과, D018:영상의학과, D019:치료방사선과, D020:임상병리과, D021:해부병리과, D022:가정의학과, D023:핵의학과, 
                            D024:응급의학과, D026:치과, D034:구강악안면외과 */}
                </select>
            </div>
            {/* 진료받을 날짜 */}
            <div className="relative inline-block text-left">
                <input className="text-lg font-semibold bg-transparent border-b-2 border-white pb-2 cursor-pointer"
                    style={{ color: 'white' }}
                    type="date" 
                    onChange={(e) => selectedDateOnChange(e.target.value)} />
                {/* <select
                    className="text-lg font-semibold bg-transparent border-b-2 border-white pb-2 cursor-pointer"
                    style={{ color: 'white' }}
                >
                        <option value="">진료 받을 날짜 선택</option> 
                        <option value="09:00" style={{ color: 'black' }}></option>
                        </select> */}

                {/* 공휴일 여부 체크박스 */}
                <input className="text-lg font-semibold bg-transparent border-b-2 border-white pb-2 cursor-pointer"
                          style={{ color: 'white' }}
                          type="checkbox"
                          onChange={(e) => checkedOnChange(e.target.checked)}>
                </input>
                <label className="text-lg font-semibold bg-transparent border-b-2 border-white pb-2 cursor-pointer"
                       style={{ color: 'white' }}>공휴일</label>
            </div>

            <div className="relative inline-block text-left">
                <select
                    className="text-lg font-semibold bg-transparent border-b-2 border-white pb-2 cursor-pointer"
                    style={{ color: 'white' }}
                    onChange={(e) => handleOnChangeTime(e.target.value)}
                >
                    <option value="">시간 선택</option> 
                    <option value="0900" style={{ color: 'black' }}>09:00~09:30</option>
                    <option value="0930" style={{ color: 'black' }}>09:30~10:00</option>
                    <option value="1000" style={{ color: 'black' }}>10:00~10:30</option>
                    <option value="1030" style={{ color: 'black' }}>10:30~11:00</option>
                    <option value="1100" style={{ color: 'black' }}>11:00~11:30</option>
                    <option value="1130" style={{ color: 'black' }}>11:30~12:00</option>
                    <option value="1200" style={{ color: 'black' }}>12:00~12:30</option>
                    <option value="1230" style={{ color: 'black' }}>12:30~13:00</option>
                    <option value="1300" style={{ color: 'black' }}>13:00~13:30</option>
                    <option value="1330" style={{ color: 'black' }}>13:30~14:00</option>
                    <option value="1400" style={{ color: 'black' }}>14:00~14:30</option>
                    <option value="1430" style={{ color: 'black' }}>14:30~15:00</option>
                    <option value="1500" style={{ color: 'black' }}>15:00~15:30</option>
                    <option value="1530" style={{ color: 'black' }}>15:30~16:00</option>
                    <option value="1600" style={{ color: 'black' }}>16:00~16:30</option>
                    <option value="1630" style={{ color: 'black' }}>16:30~17:00</option>
                    <option value="1700" style={{ color: 'black' }}>17:00~17:30</option>
                    <option value="1730" style={{ color: 'black' }}>17:30~18:00</option>
                    <option value="1800" style={{ color: 'black' }}>18:00~18:30</option>
                    <option value="1830" style={{ color: 'black' }}>18:30~19:00</option>
                    <option value="1900" style={{ color: 'black' }}>19:00~19:30</option>
                    <option value="1930" style={{ color: 'black' }}>19:30~20:00</option>
                    <option value="2000" style={{ color: 'black' }}>20:00~20:30</option>
                    <option value="2030" style={{ color: 'black' }}>20:30~21:00</option>
                    <option value="2100" style={{ color: 'black' }}>21:00~21:30</option>
                    <option value="2130" style={{ color: 'black' }}>21:30~22:00</option>
                    <option value="2200" style={{ color: 'black' }}>22:00~22:30</option>
                    <option value="2230" style={{ color: 'black' }}>22:30~23:00</option>
                    <option value="2300" style={{ color: 'black' }}>23:00~23:30</option>
                    <option value="2330" style={{ color: 'black' }}>23:30~24:00</option>
                </select>
            </div>

            <div className="relative inline-block text-left">
                <button className="text-lg font-semibold bg-transparent border-b-2 border-white pb-1 cursor-pointer"
                        style={{ color: 'white' }}
                        variant="primary" 
                        type="submit"
                        onClick={handleSubmit}>검색하기</button>
            </div>
        </div>
    </div>

        <p className="text-center text-3xl mt-8 mb-10 font-bold">현재 예약 가능한 병원 목록</p>
        <div className="flex justify-around mt-5">
          {filteredHospitalData.length > 0 ? (filteredHospitalData.map(function (item, index){
            return(
                <div className="text-center border-t-transparent border-l-transparent border-b-2 border-r-2 border-gray-300 p-4" key={index}>
                  <h1 className="text-s text-gray-600">{item.subjectName}</h1>
                  <h2 className="text-center text-3xl text-teal-500">{item.dutyName}</h2>
                  <p className="text-gray-500">{dayOfWeek === 1 ? "월요일 : " + item.dutyTime1s.substring(0, 2) + ":" + item.dutyTime1s.substring(2, 4) + "~" + item.dutyTime1c.substring(0, 2) + ":" + item.dutyTime1c.substring(2, 4)
                                              : dayOfWeek === 2 ? "화요일 : " + item.dutyTime2s.substring(0, 2) + ":" + item.dutyTime2s.substring(2, 4) + "~" + item.dutyTime2c.substring(0, 2) + ":" + item.dutyTime2c.substring(2, 4)
                                              : dayOfWeek === 3 ? "수요일 : " + item.dutyTime3s.substring(0, 2) + ":" + item.dutyTime3s.substring(2, 4) + "~" + item.dutyTime3c.substring(0, 2) + ":" + item.dutyTime3c.substring(2, 4)
                                              : dayOfWeek === 4 ? "목요일 : " + item.dutyTime4s.substring(0, 2) + ":" + item.dutyTime4s.substring(2, 4) + "~" + item.dutyTime4c.substring(0, 2) + ":" + item.dutyTime4c.substring(2, 4)
                                              : dayOfWeek === 5 ? "금요일 : " + item.dutyTime5s.substring(0, 2) + ":" + item.dutyTime5s.substring(2, 4) + "~" + item.dutyTime5c.substring(0, 2) + ":" + item.dutyTime5c.substring(2, 4)
                                              : dayOfWeek === 6 ? "토요일 : " + item.dutyTime6s.substring(0, 2) + ":" + item.dutyTime6s.substring(2, 4) + "~" + item.dutyTime6c.substring(0, 2) + ":" + item.dutyTime6c.substring(2, 4)
                                              : dayOfWeek === 0 ? "일요일 : " + item.dutyTime7s.substring(0, 2) + ":" + item.dutyTime7s.substring(2, 4) + "~" + item.dutyTime7c.substring(0, 2) + ":" + item.dutyTime7c.substring(2, 4)
                                              :                   "공휴일 : " + item.dutyTime8s.substring(0, 2) + ":" + item.dutyTime8s.substring(2, 4) + "~" + item.dutyTime8c.substring(0, 2) + ":" + item.dutyTime8c.substring(2, 4)}</p>
                  <p className="text-gray-500">대표전화 : {item.dutyTel1}</p>
                </div>

            )})
          ):(<p className="text-center text-3xl mt-8 mb-10 font-bold">해당 조건에 예약 가능한 병원이 없습니다.</p>)}
        </div>

        {/* <div className="flex justify-around mt-5">
          <div className="text-center border-t-transparent border-l-transparent border-b-2 border-r-2 border-gray-300 p-4">
            <h1 className="text-s text-gray-600">이비인후과</h1>
            <h2 className="text-center text-3xl text-teal-500">임이비인후과의원</h2>
            <p className="text-gray-500">평일 09:00 - 18:00 | 주말 11:00 - 14:00</p>
            <p className="text-gray-500">📍 680m</p>
          </div>

          <div className="text-center border-t-transparent border-l-transparent border-b-2 border-r-2 border-gray-300 p-4">
            <h1 className="text-s text-gray-600">이비인후과</h1>
            <h2 className="text-center text-3xl text-teal-500">비비이비인후과의원</h2>
            <p className="text-gray-500">평일 08:30 - 18:00 | 주말 정기 휴무</p>
            <p className="text-gray-500">📍 890m</p>
          </div>

          <div className="text-center border-t-transparent border-l-transparent border-b-2 border-r-2 border-gray-300 p-4">
            <h1 className="text-s text-gray-600">이비인후과</h1>
            <h2 className="text-center text-3xl text-teal-500">문제아이비인후과의원</h2>
            <p className="text-gray-500">평일 10:00 - 20:00 | 주말 11:00 - 15:00</p>
            <p className="text-gray-500">📍 1,350m</p>
          </div>
        </div> */}
  
    {/* 하단 화면 구성*/}
    </div>


      <div className='flex items-center'>
        <img src={pic1} alt="병원 예약 이미지" className="w-[80vh] h-[60vh] " />
        <div className="ml-20">
          <h1 className='text-4xl text-black font-bold pb-3'>1.빠르고 간편한 병원 예약</h1>
          <h2 className='text-2xl text-teal-400 font-semibold pb-5'>쉽고 신속한 병원 예약 시스템을 제공합니다.</h2>
          <h3 className='text-xl text-black font-semibold'>
            우리 웹사이트는 사용자가 기까운 병원을 쉽게 찾아 예약할 수 있도로 설계되었습니다.
            <br></br>
            병원 목록을 확인하고, 간단한 절차로 원하는 시간에 병원을 예약하세요.
            <br></br>
            번거로운 전화 예약을 대신하여 더욱 효율적인 예약 경험을 제공합니다.
          </h3>
        </div>
      </div>

      <div className='flex items-center pl-12 flex-row-reverse'>
        <img src={pic2} alt="병원 알림 이미지" className="w-[80vh] h-[60vh]" />
        <div className="mr-14">
          <h1 className='text-4xl text-black font-bold pb-3'>1.예약 알림으로 방문을 놓치지 마세요</h1>
          <h2 className='text-2xl text-teal-400 font-semibold pb-5'>정확한 예약 알림을 통해 병원 방문을 잊지 않도록 도와드립니다.</h2>
          <h3 className='text-xl text-black font-semibold'>
            예약한 병원 방문 일정이 다가오면, 설정한 시간에 맞춰 카카오톡 메세지로 알림을 보내드립니다.
            <br></br>
            하루 전과 1시간 전에 알림을 받아 병원 예약을 놓치지 않고 방문할 수 있습니다.
          </h3>
        </div>
      </div>

      <div className='flex items-center'>
        <img src={pic3} alt="병원 예약 관리이미지" className="w-[80vh] h-[60vh]" />
        <div className="ml-28">
          <h1 className='text-4xl text-black font-bold pb-3'>3.효율적인 병원 예약 관리</h1>
          <h2 className='text-2xl text-teal-400 font-semibold pb-5'>병원 관리자가 예약을 한눈에 관리할 수 일 있습니다.</h2>
          <h3 className='text-xl text-black font-semibold'>
            관리자는 실시간으로 환자 예약을 확인하고, 예약 취소나 변경을 쉽게 관리할 수 있습니다.
            <br></br>
            환자와의 소통이 원활해지고, 병원 운영이 한층 더 효율적이게 됩니다.
          </h3>
        </div>
      </div>
    </>
  );
};

export default Home;