import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Grid, Text, Input, Button } from "../elements"
import { history } from "../redux/configureStore"

import { actionCreators } from "../redux/modules/user"
import pwdCheck from "../shared/PwdCheck"

const Signup = (props) => {
  const dispatch = useDispatch()

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

  //email insert
  const signup = () => {
    if (!pwdCheck(user_pwd)) {
      setErrPwd("비밀번호 형식이 옳지 않습니다.")
      alert(
        `비밀번호 형식이 올바르지 않습니다. 비밀번호는 8 ~ 16자 영문, 숫자, 특수문자를 최소 한가지씩 조합되어야 합니다.`
      )
      return
    }
    dispatch(
      actionCreators.signUpDB(
        user_email,
        user_nickname,
        user_pwd,
        user_pwdcheck
      )
    )
  }

  return (
    <React.Fragment>
      <Grid padding="5% 20%" is_flex width="auto">
        <Grid>
          <img
            src="https://cdn.dribbble.com/users/5437855/screenshots/13680952/media/2b6fe41e707600359166a8f1793ea504.jpg?compress=1&resize=400x300"
            width="80%"
          />
        </Grid>
        <Grid>
          <Text size="32px" bold>
            회원가입
          </Text>

          <Grid padding="16px 0px">
            <Input
              label="이메일"
              placeholder="이메일을 입력해주세요."
              _onChange={changeEmail}
            />
          </Grid>

          <Grid padding="16px 0px">
            <Input
              label="닉네임"
              placeholder="닉네임을 입력해주세요."
              _onChange={changeNickname}
            />
          </Grid>

          <Grid padding="16px 0px">
            <Input
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요."
              _onChange={changePwd}
            />
          </Grid>

          <Grid padding="16px 0px">
            <Input
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해주세요."
              _onChange={changePwdcheck}
            />
          </Grid>

          <Button
            margin="10px 0px"
            padding="16px 0px"
            disable={
              user_email === "" || user_pwd === "" || user_pwd !== user_pwdcheck
                ? true
                : false
            }
            _onClick={signup}
          >
            회원가입
          </Button>
          <Grid is_flex justifyCenter>
            <Text>
              계정이 있으신가요?
              <a href={"/login"}>로그인</a>
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Signup
