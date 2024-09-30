import React from 'react';
import homeImage from './pic/home.png';
import pic1 from './pic/1.png';
import pic2 from './pic/2.png';
import pic3 from './pic/3.png';


const HomePage = () => {
  return (
    <>
      {/* 네비게이션 바 */}
      <nav className="flex justify-between p-6 bg-teal-300  ">
        <h1 className="text-3xl">LOGO</h1>
        <div className="space-x-4">
          <a href="/login" className="text-lg font-semibold">로그인</a>
          <a href="/register" className="text-lg font-semibold">회원가입</a>
        </div>
      </nav>

      {/* 배경 이미지 및 텍스트 섹션 */}
      <div>
        <div
          className="w-auto h-[65vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${homeImage})` }}>

          <p className="text-lg text-white font-semibold pl-10 pt-10 ml-5 pb-5">
            불필요한 대기 시간과 복잡한 절차 없이, 스마트하고 편리한 예약 시스템을 경험해보세요.
          </p>
          <p className='text-white text-4xl font-semibold tracking-tighter pl-12 ml-3 '>손쉬운 병원 예약<br></br>이제 클릭 한 번으로!</p>

          {/* 이미지 하단쪽 선택 버튼*/}
          <div className="mt-60 left-0 w-full flex justify-around py-14">

          <div className="relative inline-block text-left">
    <select
        className="text-lg font-semibold bg-transparent border-b-2 border-white pb-2 cursor-pointer"
        style={{ color: 'white' }}
    >
            <option value="">시/도 선택</option> 
            <option value="09:00" style={{ color: 'black' }}></option>
            </select>
</div>

            <div className="relative inline-block text-left">
    <select
        className="text-lg font-semibold bg-transparent border-b-2 border-white pb-2 cursor-pointer"
        style={{ color: 'white' }}
    >
            <option value="">구/군 선택</option> 
            <option value="09:00" style={{ color: 'black' }}></option>
            </select>
</div>

            <div className="relative inline-block text-left">
    <select
        className="text-lg font-semibold bg-transparent border-b-2 border-white pb-2 cursor-pointer"
        style={{ color: 'white' }}
    >
            <option value="">진료과목 선택</option> 
            <option value="09:00" style={{ color: 'black' }}></option>
            </select>
</div>

            <div className="relative inline-block text-left">
    <select
        className="text-lg font-semibold bg-transparent border-b-2 border-white pb-2 cursor-pointer"
        style={{ color: 'white' }}
    >
            <option value="">진료 받을 날짜 선택</option> 
            <option value="09:00" style={{ color: 'black' }}></option>
            </select>
</div>
    
            <div className="relative inline-block text-left">
    <select
        className="text-lg font-semibold bg-transparent border-b-2 border-white pb-2 cursor-pointer"
        style={{ color: 'white' }}
    >
    <option value="">시간 선택</option> 
    <option value="09:00" style={{ color: 'black' }}>09:00</option>
    <option value="09:30" style={{ color: 'black' }}>09:30</option>
    <option value="10:00" style={{ color: 'black' }}>10:00</option>
    <option value="10:30" style={{ color: 'black' }}>10:30</option>
    <option value="11:00" style={{ color: 'black' }}>11:00</option>
    <option value="11:30" style={{ color: 'black' }}>11:30</option>
    <option value="12:00" style={{ color: 'black' }}>12:00</option>
    <option value="12:30" style={{ color: 'black' }}>12:30</option>
    <option value="13:00" style={{ color: 'black' }}>13:00</option>
    <option value="13:30" style={{ color: 'black' }}>13:30</option>
    <option value="14:00" style={{ color: 'black' }}>14:00</option>
    <option value="14:30" style={{ color: 'black' }}>14:30</option>
    <option value="15:00" style={{ color: 'black' }}>15:00</option>
    <option value="15:30" style={{ color: 'black' }}>15:30</option>
    <option value="16:00" style={{ color: 'black' }}>16:00</option>
    <option value="16:30" style={{ color: 'black' }}>16:30</option>
    <option value="17:00" style={{ color: 'black' }}>17:00</option>
    <option value="17:30" style={{ color: 'black' }}>17:30</option>
    <option value="18:00" style={{ color: 'black' }}>18:00</option>
    <option value="18:30" style={{ color: 'black' }}>18:30</option>
    <option value="19:00" style={{ color: 'black' }}>19:00</option>
    <option value="19:30" style={{ color: 'black' }}>19:30</option>
    <option value="20:00" style={{ color: 'black' }}>20:00</option>
    <option value="20:30" style={{ color: 'black' }}>20:30</option>
    <option value="21:00" style={{ color: 'black' }}>21:00</option>
    <option value="21:30" style={{ color: 'black' }}>21:30</option>
    <option value="22:00" style={{ color: 'black' }}>22:00</option>
    <option value="22:30" style={{ color: 'black' }}>22:30</option>
    <option value="23:00" style={{ color: 'black' }}>23:00</option>
    <option value="23:30" style={{ color: 'black' }}>23:30</option>
  </select>
</div>

          </div>
        </div>
        <p className="text-center text-3xl mt-8 mb-10 font-bold">현재 예약 가능한 병원 목록</p>

        <div className="flex justify-around mt-5">
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
</div>
  
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

export default HomePage;
