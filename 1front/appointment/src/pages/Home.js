import React, { useState } from "react";
import select from "react-select";

const Home = () => {

  const [selectedOptionSido, setSelectedOptionSido] = useState("01"); // 시도구분

  function handleOnChangeSido(options) {
    setSelectedOptionSido(options);
  };

  return (

    <div>
      <p>Home 화면입니다</p>

      <select className="sidoBubun" onChange={(e) => handleOnChangeSido(e.target.value)} value={selectedOptionSido}>
        <option value="01">서울특별시</option>
        <option value="02">대전광역시</option>
        <option value="03">대구광역시</option>
        <option value="04">부산광역시</option>
      </select>


    </div>
  );
};

export default Home;
