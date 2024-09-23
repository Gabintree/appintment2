import React from 'react';

const LoginForm = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      {/* 하얀 박스 */}
      <div className="bg-white p-8 shadow-lg w-full max-w-md">
        {/* 로고 글씨 */}
        <h1 className="text-center text-3xl font-bold mb-6">LOGO</h1>
        {/* 사용자/관리자 버튼 */}
        <div className="flex justify-center mb-6">
          <button className="w-full py-2 bg-teal-200 text-gray-800 font-bold rounded-tl-lg focus:outline-none">
            사용자
          </button>
          <button className="w-full py-2 bg-gray-200 text-gray-800 font-bold rounded-tr-lg focus:outline-none">
            관리자
          </button>
        </div>
        {/* 아이디와 비밀번호 입력 */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="아이디"
            className="w-full border-b-2 border-gray-400 outline-none px-1 py-2"
          />
        </div>
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full border-b-2 border-gray-400 outline-none px-1 py-2"
        />
        <button className="w-full bg-teal-500 text-white py-2 mt-9 hover:bg-teal-600 transition">
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
