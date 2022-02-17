import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Grid, Text, Input, Button } from "../elements"

import { actionCreators as userActions } from "../redux/modules/user"

import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

import IdCheck from "../shared/idCheck"

const Signup = (props) => {
  const dispatch = useDispatch()
  const checkId = useSelector((state) => state.user.idCheck)
  const checkNickname = useSelector((state) => state.user.nicknameCheck)

  //email
  const [user_email, setEmail] = useState("")
  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  //nickname
  const [user_nickname, setNickname] = useState("")
  const changeNickname = (e) => {
    setNickname(e.target.value)
  }
  let [confirmNickname, setConfirmNickname] = useState(true)

  //password
  const [user_pwd, setPwd] = useState("")
  const changePwd = (e) => {
    setPwd(e.target.value)
  }

  //password Check
  const [user_pwdcheck, setPwdcheck] = useState("")
  const changePwdcheck = (e) => {
    setPwdcheck(e.target.value)
  }

  //email 중복 확인
  const emailCheck = () => {
    if (!IdCheck(user_email)) {
      window.alert("이메일 형식이 틀렸습니다. 다시 확인해 주세요")
      return
    }

    dispatch(userActions.idCheckDB(user_email))
  }

  //nickName 중복 확인
  const nicknameCheck = () => {
    dispatch(userActions.nicknameCheckDB(user_nickname))
    setConfirmNickname(false)
  }

  //email insert
  const signup = () => {
    // if (!pwdCheck(user_pwd)) {
    //   setErrPwd("비밀번호 형식이 옳지 않습니다.")
    //   alert(
    //     `비밀번호 형식이 올바르지 않습니다. 비밀번호는 8 ~ 16자 영문, 숫자, 특수문자를 최소 한가지씩 조합되어야 합니다.`
    //   )
    //   return
    // }
    dispatch(
      userActions.signUpDB(user_email, user_nickname, user_pwd, user_pwdcheck)
    )
  }
  //중복 확인시 사용 가능하면 다음 input창으로 이동
  //id -> nickName
  //nickName -> pwd
  React.useEffect(() => {
    if (checkId) {
      nicknameInput.current.focus()
    }
  }, [checkId])

  React.useEffect(() => {
    if (checkNickname) {
      pwdInput.current.focus()
    }
  }, [checkNickname])

  //커서 이동
  const nicknameInput = useRef(null)
  const pwdInput = useRef(null)
  const pwdConfrimInput = useRef(null)

  //enter key
  const enterSignup = (e) => {
    if (e.key === "Enter") {
      signup()
    }
  }

  const enterCheckId = (e) => {
    if (e.key === "Enter") {
      emailCheck()
    }
  }

  const enterCheckNickname = (e) => {
    if (e.key === "Enter") {
      nicknameCheck()
    }
  }

  const enterPwd = (e) => {
    if (e.key === "Enter") {
      pwdConfrimInput.current.focus()
    }
  }

  const enterPwdConfirm = (e) => {
    if (e.key === "Enter") {
      signup()
    }
  }

  //input box 전체 선택
  const handleFocus = (e) => {
    e.target.select()
  }

  //새로 고침 시 정보 다시 불러오기
  const user_list = useSelector((store) => store.user.list)

  React.useEffect(() => {
    dispatch(userActions.setUser())
  }, [user_list])

  //input 박스 비밀번호 보기 / 끄기
  //이모티콘 스위칭
  let [isHidden, setIsHidden] = React.useState(true)

  //type형태
  let [pwdMode, setPwdMode] = React.useState("text")

  React.useEffect(() => {
    if (isHidden === false) {
      setPwdMode("text")
    } else {
      setPwdMode("password")
    }
  }, [isHidden])

  const changeBool = () => {
    setIsHidden(!isHidden)
  }

  return (
    <React.Fragment>
      <Container>
        <Grid padding="5%" is_flex>
          <Image src="https://firebasestorage.googleapis.com/v0/b/megazine-11a01.appspot.com/o/images%2Fmomin1.png?alt=media&token=474370a1-1e4b-4883-83e0-dda39b708bd3" />
          <Grid>
            <Text size="32px" bold>
              회원가입
            </Text>

            <Grid padding="16px 0px" position="relative">
              <Button
                position="absolute; right:5px; top:36px"
                width="80px"
                text="중복확인"
                _onClick={emailCheck}
                bg="#8ad5c7"
              ></Button>
              {checkId ? (
                <Input
                  label="이메일"
                  placeholder="이메일을 입력해주세요."
                  _onChange={changeEmail}
                  bg="aliceblue"
                  _onKeyDown={enterCheckId}
                />
              ) : (
                <Input
                  label="이메일"
                  placeholder="이메일을 입력해주세요."
                  _onChange={changeEmail}
                  bg="white"
                  _onKeyDown={enterCheckId}
                  _onFocus={handleFocus}
                />
              )}
            </Grid>

            <Grid padding="16px 0px" position="relative">
              <Button
                position="absolute; right:5px; top:36px"
                width="80px"
                text="중복확인"
                _onClick={nicknameCheck}
                bg="#8ad5c7"
              ></Button>
              {checkNickname ? (
                <Input
                  label="닉네임"
                  placeholder="닉네임을 입력해주세요."
                  _onChange={changeNickname}
                  bg="aliceblue"
                  _onKeyDown={enterCheckNickname}
                  _ref={nicknameInput}
                />
              ) : (
                <Input
                  label="닉네임"
                  placeholder="닉네임을 입력해주세요."
                  _onChange={changeNickname}
                  bg="white"
                  _onKeyDown={enterCheckNickname}
                  _ref={nicknameInput}
                  _onFocus={handleFocus}
                />
              )}
            </Grid>

            <Grid padding="16px 0px" position="relative">
              {isHidden ? (
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={changeBool}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "48px",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  onClick={changeBool}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "48px",
                    cursor: "pointer",
                  }}
                />
              )}

              <Input
                label="비밀번호"
                placeholder="최소8자이상(대문자,숫자,특수문자 각 1개씩 포함)"
                _onChange={changePwd}
                _onKeyDown={enterPwd}
                _ref={pwdInput}
                _onFocus={handleFocus}
                type={pwdMode}
              />
            </Grid>

            <Grid padding="16px 0px">
              <Input
                label="비밀번호 확인"
                placeholder="비밀번호를 다시 입력해주세요."
                _onChange={changePwdcheck}
                _onKeyDown={enterPwdConfirm}
                _ref={pwdConfrimInput}
                type={pwdMode}
              />
            </Grid>

            <Button
              margin="10px 0px"
              padding="16px 0px"
              // disable={
              //   user_email === "" || user_pwd === "" || user_pwd !== user_pwdcheck
              //     ? true
              //     : false
              // }
              _onClick={signup}
              bg="#5ad7c0"
            >
              회원가입
            </Button>
            <Grid is_flex justifyContent="center">
              <Text>
                계정이 있으신가요? &nbsp;
                <a href={"/login"}>로그인</a>
              </Text>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0% 15%;
  @media only screen and (max-width: 768px) {
    padding: 0% 3%;
  }
`
const Image = styled.img`
  width: 50%;
  padding: 5%;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`

const ToggleBox = styled.div`
  position: relative;
  left: 0px;
  display: flex;
  justify-content: right;
  align-items: center;
`
const ToggleButton = styled.div`
  width: 60px;
  height: 30px;
  background-color: ${(props) => (props.isEndFilter ? "#46a1f5;" : "#cccccc;")};
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding: 2px;
`

const Toggle = styled.div`
  width: 27px;
  height: 27px;
  background: white;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  left: ${(props) => (props.isEndFilter ? "28px;" : "null")};
`

const ToggleText = styled.div`
  position: relative;
  margin-right: 8px;
`
export default Signup
