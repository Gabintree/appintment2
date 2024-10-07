import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// axios 인스턴스
export const requestApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`, 
  withCredentials: true, 
  headers: {
      Authorization: `Bearer ${localStorage.getItem('login-token')}`,
      "Content-Type": "application/json; charset=utf8",
  },
});

// 토큰 재발행
export async function getRefreshToken() {
  const response = await axios.post("/api/reissue", {}, {
      withCredentials: true, 
      headers: {
          "Content-Type": "application/json; charset=utf8",
      }     
  })
  return response;           
}

const UserDashboard = () => {

  const [selectedSido, setSelectedSido] = useState(""); // 시도

  const [gugunOptions, setGugunOptions] = useState([]); // 구군 옵션
  const [selectedGugun, setSelectedGugun] = useState(""); // 구군

  const [dongOptions, setDongOptions] = useState([]); // 동 옵션
  const [selectedDong, setSelectedDong] = useState(""); // 동

  const [selectedSubject, setSelectedSubject] = useState(""); // 진료과목 코드

  const [selectedDate, setSelectedDate] = useState(""); // 진료 예정 일자
  const [isChecked, setIsChecked] = useState(false); // 공휴일 여부

  const [selectedTime, setSelectedTime] = useState(""); // 진료 예정 시간
  
  // ㄱ: 페이지 상태 추가
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [itemsPerPage] = useState(5); // 페이지 당 병원 수

  const [filteredHospitalData, setFilteredHospitalData] = useState([]); // 병원 목록
  const [dayOfWeek, setDayOfWeek] = useState(); // 진료 예정 일자의 요일
  const navigate = useNavigate();
  const [error, setError] = useState("");

      // axios 인스턴스 첫 렌더링시 accessToken null 값 해결
      requestApi.interceptors.request.use((config) => {
        const accessToken = localStorage.getItem('login-token');
        if (config.headers && accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    });

    // interceptor 적용
    requestApi.interceptors.response.use(
        // 200 응답
        (response) =>{
            return response;
        },
        // 200 외
        async (error) => {
            const {
                config,
                response: { status },
            } = error;
            
            if(status === 401){
                if(error.response.statusText === "Unauthorized" ){
                    const originRequest = config;
                    try{
                        // 토큰 재발행 요청
                        const response = await getRefreshToken();
                        // 재발행 성공
                        if(response.status === 200){
                            console.log("토큰 재발행 완료");
                            const newAccessToken = response.headers.access;
                            // 로컬스토리지 NewAccessToken 저장
                            localStorage.setItem('login-token', newAccessToken);
                            // 진행중이던 요청 이어서 계속
                            originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                            return axios(originRequest); 
                        }
                    }catch (error){
                        if(axios.isAxiosError(error)){
                            if(
                                error.response?.status === 403){
                                alert("해당 화면은 권한이 없습니다. home으로 이동합니다.");
                                navigate("/Home");
                            }
                            else{
                                console.log("error.response?.status : ", error.response?.status);
                                alert("토큰 재발행 요청중 오류가 발생했습니다. 관리자에게 문의해주세요.");
                            }

                        }
                    }                   
                }
            }
            return Promise.reject(error);
        },
    );

  // ㄱ: 페이지 변경 함수
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredHospitalData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 콤보박스 변경 이벤트 
  useEffect(() => {
    if (selectedSido === "서울특별시") {
      setGugunOptions(["강남구", "강동구", "강북구", "강서구"]);
    } else if (selectedSido === "대전광역시") {
      setGugunOptions(["동구", "중구", "서구", "유성구", "대덕구"]);
    } else if (selectedSido === "대구광역시") {
      setGugunOptions(["중구", "남구", "동구", "북구", "서구"]);
    } else if (selectedSido === "부산광역시") {
      setGugunOptions(["중구", "강서구", "동구", "영도구", "동래구"]);
    } else {
      setGugunOptions([]);
    }

    if (selectedGugun) {
      if (selectedSido === "서울특별시" && selectedGugun === "강남구")
        setDongOptions(["신사동", "수서동", "청담동", "역삼동"]);
      else if (selectedSido === "서울특별시" && selectedGugun === "강동구") {
        setDongOptions(["강일동", "둔촌동", "길동", "성내동"]);
      }
      else if (selectedSido === "서울특별시" && selectedGugun === "강북구") {
        setDongOptions(["상암동", "미아동", "송중동", "송천동"]);
      }
      else if (selectedSido === "서울특별시" && selectedGugun === "강서구") {
        setDongOptions(["등촌동", "화곡본동", "우정산동", "가양동"]);
      }
      else if (selectedSido === "대전광역시" && selectedGugun === "동구") {
        setDongOptions(["중앙동", "신인동", "대동", "자양동"]);
      }
      else if (selectedSido === "대전광역시" && selectedGugun === "중구") {
        setDongOptions(["은행선화동", "문창동", "대흥동", "용두동"]);
      }
      else if (selectedSido === "대전광역시" && selectedGugun === "서구") {
        setDongOptions(["복수동", "변동", "용문동", "괴정동"]);
      }
      else if (selectedSido === "대전광역시" && selectedGugun === "유성구") {
        setDongOptions(["학하동", "상대동", "원내동", "관평동"]);
      }
      else if (selectedSido === "대전광역시" && selectedGugun === "대덕구") {
        setDongOptions(["오정동", "대화동", "송촌동", "신탄진동"]);
      }
      else if (selectedSido === "대구광역시" && selectedGugun === "중구") {
        setDongOptions(["동인동", "삼덕동", "봉산동", "남산동"]);
      }
      else if (selectedSido === "대구광역시" && selectedGugun === "남구") {
        setDongOptions(["이천동", "봉덕동", "대명동"]);
      }
      else if (selectedSido === "대구광역시" && selectedGugun === "동구") {
        setDongOptions(["신암동", "신천동", "효목동", "동촌동"]);
      }
      else if (selectedSido === "대구광역시" && selectedGugun === "북구") {
        setDongOptions(["산격동", "칠성동", "침산동", "복현동"]);
      }
      else if (selectedSido === "대구광역시" && selectedGugun === "서구") {
        setDongOptions(["내당동", "비산동", "평리동", "본리동"]);
      }
      else if (selectedSido === "부산광역시" && selectedGugun === "중구") {
        setDongOptions(["중앙동", "남포동", "대청동", "보수동"]);
      }
      else if (selectedSido === "부산광역시" && selectedGugun === "강서구") {
        setDongOptions(["대저1동", "명지동", "신호동", "지사동"]);
      }
      else if (selectedSido === "부산광역시" && selectedGugun === "동구") {
        setDongOptions(["초량동", "수정동", "좌천동", "범일동"]);
      }
      else if (selectedSido === "부산광역시" && selectedGugun === "영도구") {
        setDongOptions(["동삼동", "남항동", "신선동", "청학동"]);
      }
      else if (selectedSido === "부산광역시" && selectedGugun === "동래구") {
        setDongOptions(["온천동", "안락동", "명륜동", "사직동"]);
      }
      else {
        setDongOptions([]);
      }
    }

  }, [selectedSido, selectedGugun]);
  // 진료 일자 변경
  function selectedDateOnChange(date) {
    setSelectedDate(date);
    // const week = new Date(date).getDay();
    // setDayOfWeek(week); 

    // 일	0, 월	1, 화	2, 수	3, 목	4, 금	5, 토	6
  }

  // 공휴일 체크 박스
  function checkedOnChange(isChecked) {
    console.log("isChecked", isChecked);
    setIsChecked(isChecked)
  };

  // 시도
  function handleOnChangeSido(options) {
    setSelectedSido(options);
  };

  // 구군 // 시도 선택에 따라서 구군 값이 변경되어야 함.
  function handleOnChangeGuGun(options) {
    setSelectedGugun(options);
  };

  // 동 // 구군 선택에 따라서 구군 값이 변경되어야 함.
  function handleOnChangeDong(options) {
    setSelectedDong(options);
  };

  // 진료과목
  function handleOnChangeSubject(options) {
    setSelectedSubject(options);
  };

  // 시간
  function handleOnChangeTime(options) {
    setSelectedTime(options);
  };

  // 병원 목록 조회 검색 버튼
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("병원 목록 조회");

    const week = new Date(selectedDate).getDay();
    setDayOfWeek(week);
    // 공휴일이면
    if (isChecked === true) {
      setDayOfWeek(8);
    };

    try {
      const data = {
        selectedSido: selectedSido,
        selectedGugun: selectedGugun,
        selectedDong: selectedDong,
        selectedSubject: selectedSubject,
        selectedDate: selectedDate,
        selectedTime: selectedTime,
        isChecked: isChecked.toString(),
      };

      await requestApi.post(`${process.env.REACT_APP_API_URL}/api/user/hospitalList`, JSON.stringify(data), {
        withCredentials: true,
        headers: {
          //Authorization: `Bearer ${localStorage.getItem('login-token')}`,
          "Content-Type": "application/json; charset=utf8",
        }
      })
        .then(function (response) {
          if (response.status === 200) {
            console.log("병원 목록 조회 완료 : ", response.data);
            setFilteredHospitalData(response.data);
            // 데이터 변경시 
            setCurrentPage(1);
          }
        })
        .catch(function (error) {
          console.log("error : ", error);
        })

    } catch (err) {
      setError("등록 중 오류가 발생했습니다.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 상단 인사말 및 마이페이지 */}
      <header className="bg-teal-100 p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">어서오세요, 여가현님</h1>
        <div className="text-right">
          <a href="#" className="text-sm text-gray-700 font-semibold">마이페이지</a> | <a href="#" className="text-sm text-gray-700 font-semibold">로그아웃</a>
        </div>
      </header>

      {/* 병원 목록 조회와 진료 일정 부분 */}
      <div className="flex">
        {/* 병원 목록 조회 */}
        <section className="bg-white p-4  flex-1 border-y-2 border-r-2 border-black ">
          <h2 className="text-xl font-bold mb-4 ">병원 목록 조회</h2>
          <div className="absolute left-0 w-full border-b-2 border-black"></div>
          <div className="flex mb-4">
            {/* Dropdowns and Query Button */}
            <div className="w-full mt-4">
              <select
                className="text-lg  font-semibold bg-transparent border-b-2 border-gray-400 pb-2 cursor-pointer"
                style={{ color: 'black' }}
                onChange={(e) => handleOnChangeSido(e.target.value)}
                value={selectedSido}
              >
                <option value="">시/도 선택 </option>
                <option value="서울특별시" style={{ color: 'black' }}>서울특별시</option>
                <option value="대전광역시" style={{ color: 'black' }}>대전광역시</option>
                <option value="대구광역시" style={{ color: 'black' }}>대구광역시</option>
                <option value="부산광역시" style={{ color: 'black' }}>부산광역시</option>

              </select>
            </div>
            <div className="w-full mt-4">
              <select
                className="text-lg  font-semibold bg-transparent border-b-2 border-gray-400 pb-2 cursor-pointer"
                style={{ color: 'black' }}
                onChange={(e) => handleOnChangeGuGun(e.target.value)}
                value={selectedGugun}
              >
                <option value="">구/군 선택</option>
                {gugunOptions.map((option, index) => (
                  <option style={{ color: 'black' }} key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="w-full mt-4">
              <select
                className="text-lg  font-semibold bg-transparent border-b-2 border-gray-400 pb-2 cursor-pointer"
                style={{ color: 'black' }}
                onChange={(e) => handleOnChangeDong(e.target.value)}
                value={selectedDong}
              >
                <option value="">동 선택</option>
                {dongOptions.map((option, index) => (
                  <option style={{ color: 'black' }} key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="w-full mt-4">
              <select
                className="text-lg font-semibold bg-transparent border-b-2 border-gray-400 pb-2 cursor-pointe"
                style={{ color: 'black' }}
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
            <div className="w-full mt-4">
              <input className="text-lg  font-semibold bg-transparent border-b-2 border-gray-400 pb-2 cursor-pointer"
                style={{ color: 'black' }}
                type="date"
                onChange={(e) => selectedDateOnChange(e.target.value)} />

              {/* 공휴일 여부 체크박스 */}
              <input className="text-lg  font-semibold bg-transparent border-b-2 border-gray-400 pb-2 cursor-pointer"
                style={{ color: 'white' }}
                type="checkbox"
                onChange={(e) => checkedOnChange(e.target.checked)}>
              </input>
              <label className="text-lg font-semibold bg-transparent border-b-2 border-gray-400 pb-2 cursor-pointer"
                style={{ color: 'black' }}>공휴일</label>
            </div>
            <div className="w-full ml-20  mt-4">
              <select
                className="text-lg font-semibold bg-transparent border-b-2 border-gray-400 pb-2 cursor-pointer"
                style={{ color: 'black' }}
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
            <div className="w-full ml-3 mt-4">
              <button className="text-lg  font-semibold bg-transparent border-b-2 border-gray-400 pb-2 cursor-pointer"
                style={{ color: 'black' }}
                variant="primary"
                type="submit"
                onClick={handleSubmit}>조회</button>
            </div>

          </div>

          {/* 병원 리스트 */}
          <p className="text-center text-3xl mt-8 mb-10 font-bold">현재 예약 가능한 병원 목록</p>
          <div className="flex justify-around mt-5">
            {filteredHospitalData.length > 0 ?
              // 페이지에 맞게 병원 목록을 보여줌
              (filteredHospitalData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(function (item, index) {
                return (
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
                                                : "공휴일 : " + item.dutyTime8s.substring(0, 2) + ":" + item.dutyTime8s.substring(2, 4) + "~" + item.dutyTime8c.substring(0, 2) + ":" + item.dutyTime8c.substring(2, 4)}</p>
                    <p className="text-gray-500">대표전화 : {item.dutyTel1}</p>
                    {item.useSite === "Y" && (
                      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        예약
                      </button>
                    )}

                  </div>

                )
              })
              ) : (<p className="text-center text-3xl mt-8 mb-10 font-bold">해당 조건에 예약 가능한 병원이 없습니다.</p>)}
          </div>

          {/*이전, 다음 버튼 추가 */}
          <div className="flex justify-center mt-4">
            <button onClick={handlePrevPage}
              className={`text-2xl mx-4 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentPage === 1}
            >
              {'<'}
            </button>
            <button onClick={handleNextPage}
              className={`text-2xl mx-4 ${currentPage === Math.ceil(filteredHospitalData.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentPage === Math.ceil(filteredHospitalData.length / itemsPerPage)}
            >
              {'>'}
            </button>
          </div>
        </section>

        {/* 오늘의 진료 일정 */}
        <section className="bg-white p-4 w-64 border-y-2 border-black">
          <h2 className="text-xl font-bold mb-4">오늘의 진료 일정</h2>
          <br></br>
          <p className="text-sm mb-4">총 예약건수 : 2건</p>
          <div className="mb-4">
            <p className="font-semibold">이비인후과</p>
            <p className="text-sm">오비오이비인후과의원</p>
            <p className="text-sm">2024.09.09 / 14:00</p>
            <p className="text-sm text-teal-500">진료 5시간 전입니다.</p>
          </div>
          <div>
            <p className="font-semibold">치과</p>
            <p className="text-sm">마이어빠치과</p>
            <p className="text-sm">2024.09.09 / 16:00</p>
            <p className="text-sm text-red-500">진료 7시간 전입니다.</p>
          </div>
        </section>
      </div >
      <div className="flex">

        {/* 예약 내역 관리 영역 */}
        <section className="flex-1 bg-white p-4">
          <h2 className="text-xl font-bold mb-4">예약 내역 관리</h2>

          {/* 날짜 및 조회 버튼 */}
          <div className="flex items-center mb-4 space-x-2">
            <input type="date" className="border p-2 rounded" />
            <span>-</span>
            <input type="date" className="border p-2 rounded" placeholder="종료일" />
            <button className="p-2 bg-teal-500 text-white rounded">조회</button>
          </div>

          {/* 예약 내역 테이블 */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-teal-100">
                  <th className="border border-gray-300 p-2">예약번호</th>
                  <th className="border border-gray-300 p-2">예약날짜</th>
                  <th className="border border-gray-300 p-2">예약시간</th>
                  <th className="border border-gray-300 p-2">병원명</th>
                  <th className="border border-gray-300 p-2">진료과목</th>
                  <th className="border border-gray-300 p-2">예약상태</th>
                  <th className="border border-gray-300 p-2">상세보기</th>
                  <th className="border border-gray-300 p-2">예약변경자</th>
                </tr>
              </thead>
              <tbody>
                {/* 예약 내역 예시 */}
                {[
                  { id: '000001', date: '2024.09.09', time: '14:00', hospital: '오비오이비인후과', department: '이비인후과', status: '예약완료' },
                  { id: '000014', date: '2024.09.09', time: '16:00', hospital: '마이아빠치과', department: '치과', status: '예약완료' },
                  { id: '000027', date: '2024.09.11', time: '10:00', hospital: '내과내과', department: '내과', status: '변경완료' },
                  { id: '000105', date: '2024.09.17', time: '11:00', hospital: '필피부과', department: '피부과', status: '예약완료' },
                ].map((reservation) => (
                  <tr key={reservation.id} className="text-center">
                    <td className="border border-gray-300 p-2">{reservation.id}</td>
                    <td className="border border-gray-300 p-2">{reservation.date}</td>
                    <td className="border border-gray-300 p-2">{reservation.time}</td>
                    <td className="border border-gray-300 p-2">{reservation.hospital}</td>
                    <td className="border border-gray-300 p-2">{reservation.department}</td>
                    <td className="border border-gray-300 p-2">{reservation.status}</td>
                    <td className="border border-gray-300 p-2">
                      <button className="text-teal-500">상세보기</button></td>
                    <td className="border border-gray-300 p-2">{reservation.change}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 상세보기 영역 */}
        <section className="w-80 bg-white p-4 border-l-2 border-black">
          <h2 className="text-xl font-bold mb-4">상세보기</h2>
          <div className="mb-4">
            <p className="text-sm font-semibold">증상</p>
            <p className="text-sm">1주일 간 지속되는 가래와 기침</p>
          </div>

          {/* 알림톡 수신 여부 */}
          <div className="mb-4">
            <p className="text-sm font-semibold">알림톡 수신 여부</p>
            <div className="flex items-center space-x-2">
              <label className="flex items-center">
                <input type="radio" name="notification" className="mr-2" />
                예
              </label>
              <label className="flex items-center">
                <input type="radio" name="notification" className="mr-2" />
                아니요
              </label>
            </div>
          </div>

          {/* 변경/취소 버튼 */}
          <div className="flex space-x-2">
            <button className="flex-1 p-2 bg-teal-500 text-white rounded">변경하기</button>
            <button className="flex-1 p-2 bg-red-500 text-white rounded">취소하기</button>
          </div>
        </section>
      </div>
    </div >

  );
};

export default UserDashboard;


// // 환자 대시보드
// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Form, Button, Navbar, Nav } from "react-bootstrap";
// import { Navigate, useNavigate } from "react-router-dom";
// import HList from "./HList";
// import TodaySchedule from "./TodaySchedule";
// import ManageReservation from "./ManageReservation";
// import DetailContent from "./DetailContent";
// /*
// 병원 목록 조회 | 오늘의 진료 일정
// 예약 내역 관리 | 상세보기
// */

// const UserDashboard = () => {
//   const [userName, setUserName] = useState(""); // 사용자 이름 상태

//   const navigate = useNavigate();

//   useEffect(() => {
//     // 로그인 시 사용자 이름을 가져오는 예시
//     const fetchUserName = async () => {
//       const fetchedName = "순자"; // 실제 API 호출로 대체
//       setUserName(fetchedName);
//     };
//   }, []); // 컴포넌트가 마운트될 때 한 번만 실행

//   // 마이페이지 이동
//   const handleMyPageClick = () => {
//     navigate("/UserMyPage"); // UserMyPage로 이동
//   };

//   // 로그아웃
//   const handleLogoutClick = () => {
//     navigate("/Home"); // 로그아웃 시, Home화면 이덩
//   };

//   return (
//     <Container fluid>
//       <Row>
//         {/* 사이드 바 */}
//         <Col md={2} className="bg-light">
//           <h1 className="logo">logo</h1>
//           <Nav className="flex-column">
//             {/* 해당 상세 페이지 이동 추가하기 */}
//             <Nav.Link href="#">병원 목록 조회</Nav.Link>
//             <Nav.Link href="#">오늘의 진료 일정</Nav.Link>
//             <Nav.Link href="#">예약 내역 관리</Nav.Link>
//           </Nav>
//         </Col>

//         {/* Main Content Area */}
//         <Col md={9}>
//           <Nav className="flex-column">
//             <div className="d-flex justify-content-between align-items-center my-4">
//               <h2>Welcome, {userName}</h2>
//               <div>
//                 <Button variant="link" onClick={handleMyPageClick}>
//                   마이페이지
//                 </Button>
//                 <Button variant="link" onClick={handleLogoutClick}>
//                   로그아웃
//                 </Button>
//               </div>
//             </div>
//           </Nav>

//           {/* Main Content Detail */}
//           <Row>
//             <Col sm={8}>
//               {/* 병원 목록 조회 */}
//               <HList />
//             </Col>
//             <Col sm={4}>
//               {/* 오늘의 진료 일정 */}
//               <TodaySchedule />
//             </Col>
//           </Row>

//           <Row>
//             <Col sm={8}>
//               {/* 예약 내역 관리 */}
//               <ManageReservation />
//             </Col>
//             <Col sm={4}>
//               {/* 상세 보기 */}
//               <DetailContent />
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default UserDashboard;