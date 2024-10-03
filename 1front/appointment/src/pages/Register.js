import { Card, Form, Button, Nav, Alert, FormCheck } from "react-bootstrap";
import React from "react";
import { useState, useRef } from "react";
import { json, useNavigate } from "react-router-dom"; // useRouter 대신 useNavigate 사용
import axios from "axios";

const Register = () => {
  // 사용자 컬럼
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [birthday, setBirthday] = useState(""); // 생년월일  6자리
  const [gender, setGender] = useState(0);
  const [phone, setPhone] = useState("");
  const [agreeGps, setAgreeGps] = useState("N"); // 기본값 미동의

  // 관리자 컬럼
  const [adminId, setAdminId] = useState("");
  const [adminPw, setAdminPw] = useState("");
  const [adminPw2, setAdminPw2] = useState("");
  const [corporateNo, setCorporateNo] = useState("");
  const [groupId, setGroupId] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminAddress, setAdminAddress] = useState("");
  const [tellNo, setTellNo] = useState();

  const [tab, setTab] = useState("user"); // 탭 상태 추가
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [ischecked0, setIschecked0] = useState(); // 성별 버튼
  const [ischecked1, setIschecked1] = useState(); // 성별 버튼
  const [ischeckedGpsN, setIscheckedGpsN] = useState(); // 성별 버튼
  const [ischeckedGpsY, setIscheckedGpsY] = useState(); // 성별 버튼


  const userForm = useRef();
  const adminForm = useRef();
  const [userIsHidden, setUserIsHidden] = useState(false);
  const [adminIsHidden, setAdminIsHidden] = useState(true); // 기본값 숨김 처리

  // TODO: 관리자 버튼을 클릭할 때 사용자 버튼이 동시에 눌려지는 문제 해결
  // TODO: 관리자 회원가입에 회원정보 입력하고 제출하면 사용자 대시보드로 이동함
  function handleTabSelect(selectedTab) {
    setTab(selectedTab);

    // 사용자
    if (selectedTab == "user") {
      // 사용자 form 보여주기
      setUserIsHidden(false);
      // 관리자 form 숨김
      setAdminIsHidden(true);
    }
    // 관리자
    else if (selectedTab == "admin") {
      // 관리자 form 보여주기
      setAdminIsHidden(false);
      // 사용자 form 숨김
      setUserIsHidden(true);
    } else {
      // 모두 hidden 처리
      setUserIsHidden(true);
      setAdminIsHidden(true);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (tab === "user") {
      if (password !== password2) {
        setError("비밀번호가 일치하지 않습니다!");
        return;
      }
    } else {
      if (adminPw !== adminPw2) {
        setError("비밀번호가 일치하지 않습니다!");
        return;
      }
    }

    try {
      // TODO: 회원가입 처리 로직 await registeruser(user, password ..)

      const numBirthDay =
        birthday.substring(0, 2) + birthday.substring(4, 6) + birthday.substring(8, 10);

      if (tab === "user") {
        // 사용자 회원가입 로직
        const data = {
          userId: user,
          userPw: password,
          userName: name,
          residentNo: regNo,
          birthDate: numBirthDay, // 숫자만
          gender: gender,
          phone: phone.replace(/-/g, ""), // 숫자만
          agreeGPS: agreeGps, // GPS 동의 여부
        };

        await axios
        .post(`${process.env.REACT_APP_API_URL}/api/join`, JSON.stringify(data), {
            headers: {
              "Content-Type": "application/json; charset=utf8",
              withCredentials: true,
            },
          })
          .then(function (response) {
            //console.log('회원가입 성공', response);
            if (response.data == true) {
              alert("회원가입이 완료되었습니다.");
              navigate("/UserDashboard");
            } else {
              alert("이미 가입된 ID입니다. 관리자에게 문의하세요.");
            }
          })
          .catch(function (error) {
            console.log("회원가입 실패T.T", error);
            alert("회원가입이 실패하였습니다. 관리자에게 문의하세요.");
          });
      } else {
        // 관리자 회원가입 로직
        const data = {
          hospitalId: adminId,
          hospitalPw: adminPw,
          corporateNo: corporateNo,
          residentNo: regNo.replace(/-/g, ""), // 숫자만
          groupId: groupId,
          hospitalName: adminName,
          hospitalAddress: adminAddress,
          tellNo: tellNo.replace(/-/g, ""), // 숫자만
        };

        await axios
        .post(`${process.env.REACT_APP_API_URL}/api/joinAdmin`, JSON.stringify(data), {
            headers: {
              "Content-Type": "application/json; charset=utf8",
              withCredentials: true,
            },
          })
          .then(function (response) {
            //console.log('회원가입 성공', response);
            if (response.data == true) {
              alert("회원가입이 완료되었습니다.");
              navigate("/HDashBoard");
            } else {
              alert("이미 가입된 ID입니다. 관리자에게 문의하세요.");
            }
          })
          .catch(function (error) {
            console.log("회원가입 실패T.T", error);
            alert("회원가입이 실패하였습니다. 관리자에게 문의하세요.");
          });
      }
    } catch (err) {
      setError("등록 중 오류가 발생했습니다.");
    }
  }

  // 성별 라디오 버튼 단일 선택 처리
  function genderOnChange(selectGender) {
    console.log("gender값 : ", selectGender);
    if (selectGender == 0) {
      setIschecked0(true);
      setIschecked1(false);
      setGender(selectGender);
    } else {
      setIschecked0(false);
      setIschecked1(true);
      setGender(selectGender);
    }
  }

    // GPS 라디오 버튼 단일 선택 처리
    function agreeGpsOnChange(selectGps) {
      console.log("agreeGps값 : ", selectGps);
      if (selectGps == "N") {
        setIscheckedGpsN(true);
        setIscheckedGpsY(false);
        setAgreeGps(selectGps);
      } else {
        setIscheckedGpsN(false);
        setIscheckedGpsY(true);
        setAgreeGps(selectGps);
      }
    }


  // 휴대폰 형식(하이픈 추가)
  function phoneOnChange(phone) {
    if (phone.length === 10) {
      setPhone(phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    } else if (phone.length === 13) {
      setPhone(phone.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"));
    } else {
      setPhone(phone);
    }
  }

  // 주민등록번호 형식(하이픈 추가) 및 성별 체크
  function RegNoOnChange(regNo) {
    setRegNo(
      regNo
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,6})(\d{0,7})$/g, "$1-$2")
        .replace(/-{1,2}$/g, "")
    );

    if (regNo.length === 7) {
      const regNo1 = regNo.substring(6);

      console.log(regNo1);

      if (regNo1 == 1 || regNo1 == 3) {
        setIschecked0(true);
        setIschecked1(false);
        console.log("남성 :", gender);
      } else if (regNo1 == 2 || regNo1 == 4) {
        setIschecked0(false);
        setIschecked1(true);
        console.log("여성 :", gender);
      }
    }

    if (regNo.length === 6) {
      // 생년월일 추가
      birthdayOnChange(regNo);
    }
  }

  // 생년월일 변환
  function birthdayOnChange(birthday) {
    // 6자리 입력시 년월일 추가
    if (birthday.length == 6) {
      const year = birthday.substring(0, 2);
      const month = birthday.substring(2, 4);
      const day = birthday.substring(4, 6);

      birthday = year + "년 " + month + "월 " + day + "일";

      setBirthday(birthday);

      // console.log(year);
      // console.log(month);
      // console.log(day);
    } else {
      setBirthday(birthday);
    }
  }

  // 사업자등록번호 형식(하이픈 추가)
  function corporateNoOnChange(corporateNo) {
    if (corporateNo.length == 10) {
      const corporateNo1 = corporateNo.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");

      setCorporateNo(corporateNo1);
    } else {
      setCorporateNo(corporateNo);
    }
  }

  return (
    <Card className="m-4">
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
        <Form
          id="userJoinData"
          ref={userForm}
          hidden={userIsHidden}
          onSubmit={handleSubmit}
        >
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
              type="text"
              value={birthday}
              onChange={(e) => birthdayOnChange(e.target.value)}
            />
          </Form.Group>
          {/* 성별 체크란 수정 */}
          <Form.Group controlId="formUserGender">
            <Form.Label>성별 </Form.Label>
            <Form.Check
              type="radio"
              label="남성"
              value={0}
              defaultChecked={true}
              checked={ischecked0}
              onClick={(e) => genderOnChange(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="여성"
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
          {/* GPS 동의 여부 */}
          <Form.Group controlId="formUserAgreeGPS">
                      <Form.Label>GPS 동의 여부 </Form.Label>
                      <Form.Check
                        type="radio"
                        label="미동의"
                        value={"N"}
                        defaultChecked={true}
                        checked={ischeckedGpsN}
                        onClick={(e) => agreeGpsOnChange(e.target.value)}
                      />
                      <Form.Check
                        type="radio"
                        label="동의"
                        value={"Y"}
                        defaultChecked={false}
                        checked={ischeckedGpsY}
                        onClick={(e) => agreeGpsOnChange(e.target.value)}
                      />
                    </Form.Group>          
          {error && (
            <div className="mt-3">
              <Alert variant="danger">{error}</Alert>
            </div>
          )}
          <Button
            className="mt-3"
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            가입하기
          </Button>
        </Form>
        {/* 관리자 회원가입 Form */}
        <Form
          id="adminJoinData"
          ref={adminForm}
          hidden={adminIsHidden}
          onSubmit={handleSubmit}
        >
          <Form.Group controlId="formAdminId">
            <Form.Label>아이디</Form.Label>
            <Form.Control
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formAdminPw">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              value={adminPw}
              onChange={(e) => setAdminPw(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formAdminConfirmPassword">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              value={adminPw2}
              onChange={(e) => setAdminPw2(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formAdminCorporateNo">
            <Form.Label>사업자등록번호</Form.Label>
            <Form.Control
              type="text"
              value={corporateNo}
              maxLength={10}
              onChange={(e) => corporateNoOnChange(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formAdminGroupId">
            <Form.Label>기관Id</Form.Label>
            <Form.Control
              type="text"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formAdminHospitalName">
            <Form.Label>병원명</Form.Label>
            <Form.Control
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formAdminHospitalAddress">
            <Form.Label>병원 주소</Form.Label>
            <Form.Control
              type="text"
              value={adminAddress}
              onChange={(e) => setAdminAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formAdminHospitalTellNo">
            <Form.Label>연락처</Form.Label>
            <Form.Control
              type="text"
              value={tellNo}
              onChange={(e) => setTellNo(e.target.value)}
            />
          </Form.Group>
          {error && (
            <div className="mt-3">
              <Alert variant="danger">{error}</Alert>
            </div>
          )}
          <Button
            className="mt-3"
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            가입하기
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default Register;