import React from "react"
import { Button, Grid, Input, Text } from "../elements"
import { setCookie } from "../shared/Cookie"

const Login = (props) => {
  const [id, setId] = React.useState("")
  const [pwd, setPwd] = React.useState("")

  const changeId = (e) => {
    setId(e.target.value)
  }

  const changePwd = (e) => {
    setPwd(e.target.value)
  }

  const login = () => {
    setCookie("user_id", id, 3)
    setCookie("user_pwd", pwd, 3)
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
              _onChange={(e) => {
                setId(e.target.value)
              }}
            />
          </Grid>

          <Grid padding="16px 0px">
            <Input
              label="패스워드"
              placeholder="패스워드 입력해주세요."
              type="password"
              _onChange={(e) => {
                setPwd(e.target.value)
              }}
            />
          </Grid>

          <Button
            text="로그인하기"
            _onClick={() => {
              console.log("로그인 했어!")
              login()
            }}
            disable={id === "" || pwd === "" ? true : false}
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

export default Login
