import React from "react"
import { Grid, Text, Input, Button } from "../elements"
import { history } from "../redux/configureStore"

const Signup = (props) => {
  const [id, setId] = React.useState("")
  const [pwd, setPwd] = React.useState("")
  const [pwd_check, setPwdCheck] = React.useState("")
  const [user_name, setUserName] = React.useState("")

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
            <Input label="아이디" placeholder="아이디를 입력해주세요." />
          </Grid>

          <Grid padding="16px 0px">
            <Input label="닉네임" placeholder="닉네임을 입력해주세요." />
          </Grid>

          <Grid padding="16px 0px">
            <Input label="비밀번호" placeholder="비밀번호를 입력해주세요." />
          </Grid>

          <Grid padding="16px 0px">
            <Input
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해주세요."
            />
          </Grid>

          <Button
            padding="16px 0px"
            disable={
              id === "" || pwd === "" || pwd !== pwd_check ? true : false
            }
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
