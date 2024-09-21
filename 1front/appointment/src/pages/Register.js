import { Card, Form, Button, Nav, Alert, FormCheck } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import { json, useNavigate } from "react-router-dom"; // useRouter 대신 useNavigate 사용
import axios from "axios";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

const Register = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [birthday, setBirthday] = useState(""); // 생년월일  6자리
  const [gender, setGender] = useState(0);
  const [phone, setPhone] = useState("");

  const [tab, setTab] = useState("user"); // 탭 상태 추가
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [ischecked0, setIschecked0] = useState();
  const [ischecked1, setIschecked1] = useState();

  // TODO: 관리자 버튼을 클릭할 때 사용자 버튼이 동시에 눌려지는 문제 해결
  // TODO: 관리자 회원가입에 회원정보 입력하고 제출하면 사용자 대시보드로 이동함
  function handleTabSelect(selectedTab) {
    setTab(selectedTab);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== password2) {
      setError("비밀번호가 일치하지 않습니다!");
      return;
    }
    try {
      // TODO: 회원가입 처리 로직 await registeruser(user, password ..)
      if (tab === "user") {
        // 사용자 회원가입 로직
        const data = {
          "userId" : user,
          "userPw" : password,
          "userName" : name,
          "residentNo" : regNo,
          "birthDate" : new Date(birthday),
          "gender" : gender,
          "phone" : phone
        }

        await axios.post('/api/join', JSON.stringify(data),{
          headers : {
            "Content-Type" : "application/json; charset=utf8"
          }
        }
      )
        .then(function (response){
          //console.log('회원가입 성공', response);
          if(response.data == true){
            alert("회원가입이 완료되었습니다.");
            navigate("/UserDashboard");
          }
          else{
            alert("이미 가입된 ID입니다. 관리자에게 문의하세요.");
          }
        })
        .catch(function(error){
          console.log('회원가입 실패T.T', error)
          alert("회원가입이 실패하였습니다. 관리자에게 문의하세요.");
        })
      } else {
        // 관리자 회원가입 로직
        navigate("/AdminDashboard");
      }
    } catch (err) {
      setError("등록 중 오류가 발생했습니다.");
    }
  }

  // 라디오 버튼 단일 선택 처리 
  function genderOnChange(selectGender) {
    console.log("gender값 : " , selectGender);
    if (selectGender == 0){
      setIschecked0(true);
      setIschecked1(false);
      setGender(selectGender);
    }
    else{
      setIschecked0(false);
      setIschecked1(true);
      setGender(selectGender);
    }
  }

  // 휴대폰 형식(하이픈 추가)
  function phoneOnChange(phone){ 

    if(phone.length === 10){
      setPhone(phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    else if(phone.length === 13){
      setPhone(phone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
    else{
      setPhone(phone);
    }
  }
  
  // 주민등록번호 형식(하이픈 추가) 및 성별 체크 
  function RegNoOnChange(regNo){  

    setRegNo(regNo.replace(/[^0-9]/g, '').replace(/^(\d{0,6})(\d{0,7})$/g, '$1-$2').replace(/-{1,2}$/g, ''));

    if(regNo.length === 7){
      const regNo1 = regNo.substring(6);

      console.log(regNo1);

      if(regNo1 == 1 || regNo1 == 3 ){
        setIschecked0(true);
        setIschecked1(false);
        console.log("남성 :", gender);
      }
      else if(regNo1 == 2 || regNo1 == 4 ){
        setIschecked0(false);
        setIschecked1(true);
        console.log("여성 :", gender);
      }
    }
  }

  return (
    <Card>
      <h1>Logo</h1>
      {/* 회원가입 종류 (사용자, 관리자) 선택란 */}
      <Card.Header>
        {/* Fixed) activeKey추가: 현재 활성화된 tab상태 제어 */}
        <Nav variant="tabs" activeKey={tab}>
          <Nav.Item>
            {/* 사용자 회원가입 페이지 */}
            <Nav.Link eventKey="user" onClick={() => handleTabSelect("user")}>
              사용자
            </Nav.Link>
          </Nav.Item>
          {/* 관리자 회원가입  페이지*/}
          
          <Nav.Item>
            <Nav.Link eventKey="admin" onClick={() => handleTabSelect("admin")}>
              관리자
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>

      {/* 회원정보 등록 */}
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div className="userJoinData">
            <Form.Group controlId="formUsername">
              <Form.Label>아이디</Form.Label>
              <Form.Control
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formUsername2">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formUserRegNo">
              <Form.Label>주민등록번호</Form.Label>
              <Form.Control
                type="text"
                maxLength={8}
                value={regNo}
                onChange={(e) => RegNoOnChange(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formUserBirthDay">
              <Form.Label>생년월일</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formUserGender">
              <Form.Label>성별 </Form.Label>
              <Form.Label>남성 </Form.Label>
              <Form.Control 
                type="radio"
                value={0}
                defaultChecked={true}
                checked={ischecked0}
                onClick={(e) => genderOnChange(e.target.value)} 
              />
              <Form.Label>여성 </Form.Label>
              <Form.Control
                type="radio"
                value={1}
                defaultChecked={false}              
                checked={ischecked1}
                onClick={(e) => genderOnChange(e.target.value)}              
              />                     
            </Form.Group>                     
            <Form.Group controlId="formUserPhone">
              <Form.Label>연락처</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => phoneOnChange(e.target.value)}
              />
            </Form.Group>  
            </div>     
            {error && (
              <div className="mt-3">
                <Alert variant="danger">{error}</Alert>
              </div>
            )}
            <Button className="mt-3" variant="primary" type="submit" onClick={handleSubmit}>
              가입하기
            </Button>
          </Form>
        </Card.Body>
    </Card>
    
  );
};
export default Register;