import React, { useState } from "react"
import { Button, Grid, Input, Text } from "../elements"
import { setCookie } from "../shared/Cookie"
import styled from "styled-components"

import { useDispatch } from "react-redux"
import { actionCreators as userActions } from "../redux/modules/user"
import { TokenToCookie } from "../shared/Cookie"
import { axiosInstance } from "../config"

const Login = (props) => {
  const dispatch = useDispatch()

  const [user_email, setUser_email] = useState()
  const [user_pwd, setUser_pwd] = useState()
  const [err_login, setErr_login] = useState("")

  const changeId = (e) => {
    setUser_email(e.target.value)
  }

  const changePwd = (e) => {
    setUser_pwd(e.target.value)
  }

  const login = () => {
    console.log("로그인 하러 들어왔어")
    console.log(typeof user_email, typeof user_pwd)
    axiosInstance
      .post("/login", {
        userId: user_email,
        password: user_pwd,
      })
      .then((response) => {
        console.log("로그인 완료")
        const accessToken = response.data.token
        TokenToCookie(accessToken)
        localStorage.setItem("token", accessToken)
        window.location.href = "/"
      })
      .catch((error) => {
        setErr_login("이메일 혹은 비밀번호가 잘못 입력되었습니다")
        console.log(error)
      })
    console.log("여기까지 나오나?")
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
        <Grid justifyCenter>
          <Text size="32px" bold>
            로그인
          </Text>
          <Grid padding="16px 0px">
            <Input
              label="아이디"
              placeholder="아이디를 입력해주세요."
              _onChange={changeId}
            />
          </Grid>

          <Grid padding="16px 0px">
            <Input
              label="패스워드"
              placeholder="영문(대소문자) + 최소 1개의 숫자 혹은 특수 문자 8~20자"
              type="password"
              _onChange={changePwd}
            />
          </Grid>

          <Button
            text="로그인하기"
            margin="10px 0px"
            _onClick={login}
            disable={user_email === "" || user_pwd === "" ? true : false}
          ></Button>
          <Grid is_flex justifyCenter>
            <Text>
              계정이 없으신가요?
              <a href={"/signup"}>가입하기</a>
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const Image = styled.img`

width= 80%;
@media only screen {
  display: none;
}
`
export default Login
