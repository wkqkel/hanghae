import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Grid, Text, Input, Button } from "../elements"
import { history } from "../redux/configureStore"

import { actionCreators as userActions } from "../redux/modules/user"

import styled from "styled-components"

import IdCheck from "../shared/idCheck"

const Signup = (props) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.user)
  const checkId = useSelector((state) => state.user.idCheck)
  const checkNickname = useSelector((state) => state.user.nicknameCheck)

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

  console.log(checkId, state)
  //커서 이동
  const nicknameInput = useRef(null)
  const pwdInput = useRef(null)
  const pwdConfrimInput = useRef(null)

  //email
  const [user_email, setEmail] = useState("")
  const [err_email, setErrEmail] = useState("")
  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  //nickname
  const [user_nickname, setNickname] = useState("")
  const [err_nickname, setErrNickname] = useState("")
  const changeNickname = (e) => {
    setNickname(e.target.value)
  }
  let [confirmNickname, setConfirmNickname] = useState(true)

  //password
  const [user_pwd, setPwd] = useState("")
  const [err_pwd, setErrPwd] = useState("")
  const changePwd = (e) => {
    setPwd(e.target.value)
  }

  //password Check
  const [user_pwdcheck, setPwdcheck] = useState("")
  const [err_pwdcheck, setErrPwdcheck] = useState("")
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

  return (
    <React.Fragment>
      <Grid padding="5% 10%" is_flex width="auto">
        <Image src="https://cdn.dribbble.com/users/5437855/screenshots/13680952/media/2b6fe41e707600359166a8f1793ea504.jpg?compress=1&resize=400x300" />
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

          <Grid padding="16px 0px">
            <Input
              label="비밀번호"
              placeholder="영문(대소문자) + 최소 1개의 숫자 혹은 특수 문자 8~20자"
              _onChange={changePwd}
              _onKeyDown={enterPwd}
              _ref={pwdInput}
              _onFocus={handleFocus}
            />
          </Grid>

          <Grid padding="16px 0px">
            <Input
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해주세요."
              _onChange={changePwdcheck}
              _onKeyDown={enterPwdConfirm}
              _ref={pwdConfrimInput}
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
    </React.Fragment>
  )
}
const Image = styled.img`
  width: 60%;
  padding: 10%;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`

export default Signup
