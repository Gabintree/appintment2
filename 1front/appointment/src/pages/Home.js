import React, { useState } from "react";
import axios from "axios";
import select from "react-select";
import { json } from "react-router-dom";

const Home = () => {

  const [selectedSido, setSelectedSido] = useState("서울특별시"); // 시도구분
  const [selectedGugun, setSelectedGugun] = useState("강남구"); // 구군
  const [selectedSubject, setSelectedSubject] = useState("내과"); // 진료과목
  const [selectedDate, setSelectedDate] = useState(""); // 진료 예정 일자
  const [selectedTime, setSelectedTime] = useState("0900"); // 진료 예정 시간
  const [apiData, setApiData] = useState(""); // api 데이터

  const [error, setError] = useState(""); 

  // 시도
  function handleOnChangeSido(options) {
    setSelectedSido(options);
  };

  // 구군 //시도 선택에 따라서 구군 값이 변경되어야 함.
  function handleOnChangeGuGun(options) {
    setSelectedGugun(options);
  };

  // 진료과목
  function handleOnChangeSubject(options) {
    setSelectedSubject(options);
  };

  // 시간
  function handleOnChangeTime(options) {
    setSelectedTime(options);
  };  

  // 검색 버튼
  async function handleSubmit(e) {
    e.preventDefault();
    
    try{
        const params = {
          selectedSido: selectedSido,
          selectedGugun: selectedGugun,
          selectedSubject: selectedSubject,
          selectedDate: selectedDate,
          selectedTime: selectedTime, 
        };

        await axios
          .get("/api/hospitalList", {params}, {
            // headers: {
            //   "Content-Type": "application/json; charset=utf8",
            // },
          })
          .then(function (response) {
            console.log(response.data);  

            if (response.status == 200) {
              alert("완료되었습니다.");
            } else {
              alert("관리자에게 문의하세요.");
            }
          })
          .catch(function (error) {
            console.log("error", error);
            alert("관리자에게 문의하세요.");
          });

    } catch (err) {

      setError("등록 중 오류가 발생했습니다.");
    }
  }

  return (

    <div>
      <p>Home 화면입니다</p>

      <select className="sidoGubun" onChange={(e) => handleOnChangeSido(e.target.value)} value={selectedSido}>
        <option value="서울특별시">서울특별시</option>
        <option value="대전광역시">대전광역시</option>
        <option value="대구광역시">대구광역시</option>
        <option value="부산광역시">부산광역시</option>
      </select>

      <select className="guGunGubun" onChange={(e) => handleOnChangeGuGun(e.target.value)} value={selectedGugun}>
        <option value="강남구">강남구</option>
        <option value="강동구">강동구</option>
        <option value="강북구">강북구</option>
        <option value="강서구">강서구</option>
      </select>

      <select className="subjectGubun" onChange={(e) => handleOnChangeSubject(e.target.value)} value={selectedSubject}>
        <option value="내과">내과</option>
        <option value="이비인후과">이비인후과</option>
        <option value="소아과">소아과</option>
        <option value="치과">치과</option>
      </select>      

      <input className="appointDate" type="date" onChange={(e) => setSelectedDate(e.target.value)} />

      <select className="timeGubun" onChange={(e) => handleOnChangeTime(e.target.value)}>
        <option value="0900">09:00~09:30</option>
        <option value="0930">09:30~10:00</option>
        <option value="1000">10:00~10:30</option>
        <option value="1030">10:30~11:00</option>
      </select>

      <button className="mt-3" variant="primary" type="submit" onClick={handleSubmit}> 검색</button>
        


      {/* ★ 진료과목 : D001:내과, D002:소아청소년과, D003:신경과, D004:정신건강의학과, D005:피부과, D006:외과, D007:흉부외과, 
      D008:정형외과, D009:신경외과, D010:성형외과, D011:산부인과, D012:안과, D013:이비인후과, D014:비뇨기과, D016:재활의학과, 
      D017:마취통증의학과, D018:영상의학과, D019:치료방사선과, D020:임상병리과, D021:해부병리과, D022:가정의학과, D023:핵의학과, 
      D024:응급의학과, D026:치과, D034:구강악안면외과 */}

    </div>
  );
};

export default Home;