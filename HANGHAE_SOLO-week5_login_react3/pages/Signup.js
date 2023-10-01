import React from "react";
import { Grid, Text, Input, Button } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";
const Signup = (props) => {
  const dispathch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");
  const [user_name, setUserName] = React.useState("");

  const signup = () => {
    if (id === "" || pwd === "" || user_name === "") {
      window.alert("모두 입력해주세요");
      return;
    }
    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지않습니다");
      return;
    }

    if (pwd !== pwd_check) {
      window.alert("비밀번호가 다릅니다");
      return;
    }

    dispathch(userActions.signupFB(id, pwd, user_name));
  };
  return (
    <>
      <Grid padding="16px 30%">
        <Text size="32px" bold>
          회원가입
        </Text>
        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요"
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>
        <Grid padding="16px 0px">
          <Input
            label="넥네임"
            placeholder="닉네임을 입력해주세요"
            _onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Grid>
        <Grid padding="16px 0px">
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </Grid>
        <Grid padding="16px 0px">
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를  다시입력해주세요"
            _onChange={(e) => {
              setPwdCheck(e.target.value);
            }}
          />
        </Grid>
        <Button
          text="회원가입하기"
          _onClick={signup}
          disable={
            id === "" || pwd === "" || user_name === "" || pwd_check === ""
              ? true
              : false
          }
        ></Button>
      </Grid>
    </>
  );
};

Signup.defaultProps = {};

export default Signup;
