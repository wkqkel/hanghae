import React, { useRef, useState } from "react"
import { Button, Grid, Input, Text } from "../elements"
import { setCookie } from "../shared/Cookie"
import styled from "styled-components"

import { history } from "../redux/configureStore"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as userActions } from "../redux/modules/user"
import { TokenToCookie } from "../shared/Cookie"
import instance from "../shared/Request"

const Login = (props) => {
  //커서 이동
  const pwdInput = useRef(null)

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
    dispatch(userActions.logInDB(user_email, user_pwd))
  }
  const enterId = (e) => {
    if (e.key === "Enter") {
      pwdInput.current.focus()
    }
  }
  const enterPwd = (e) => {
    if (e.key === "Enter") {
      login()
    }
  }

  //input box 전체 선택
  const handleFocus = (e) => {
    e.target.select()
  }

  //새로 고침 시 정보 다시 불러오기
  const user_list = useSelector((store) => store.user.list)

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(userActions.setUser())
    }, 1000)
  }, [user_list])

  return (
    <React.Fragment>
      <Grid padding="5% 10%" is_flex width="auto">
        <Image src="https://cdn.dribbble.com/users/5437855/screenshots/13680952/media/2b6fe41e707600359166a8f1793ea504.jpg?compress=1&resize=400x300" />
        <Grid justifyContent="center">
          <Text size="32px" bold>
            로그인
          </Text>
          <Grid padding="16px 0px">
            <Input
              label="아이디"
              placeholder="아이디를 입력해주세요."
              _onChange={changeId}
              _onKeyDown={enterId}
              _onFocus={handleFocus}
            />
          </Grid>

          <Grid padding="16px 0px">
            <Input
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요."
              type="password"
              _onChange={changePwd}
              _onKeyDown={enterPwd}
              _ref={pwdInput}
              _onFocus={handleFocus}
            />
          </Grid>

          <Button
            text="로그인하기"
            margin="10px 0px"
            padding="16px 0px"
            _onClick={login}
            disable={user_email === "" || user_pwd === "" ? true : false}
            bg="#5ad7c0"
          ></Button>
          <Grid is_flex justifyContent="center">
            <Text>
              계정이 없으신가요? &nbsp;
              <a href={"/signup"}>가입하기</a>
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
export default Login
