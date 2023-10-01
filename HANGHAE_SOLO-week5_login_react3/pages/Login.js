import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";
import { useEffect } from "react";

const Login = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const login = () => {
    if (id === "" || pwd === "") {
      window.alert("아이디 혹은 비밀번호가 공란입니다");
      return;
    }
    console.log();
    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지않습니다");
      return;
    }

    dispatch(userActions.loginFB(id, pwd));
  };
  // const [disable, setDisable] = React.useState(false);
  // useEffect(() => {
  //   if (id === "" || pwd === "") {
  //     setDisable(true);
  //     return;
  //   }
  //   setDisable(false);
  // }, [id, pwd]);
  return (
    <>
      <Grid padding="16px 30%">
        <Text size="32px" bold>
          로그인
        </Text>
        <Grid padding="16px 0">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요"
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>
        <Grid padding="16px 0">
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
            type="password"
          />
        </Grid>
        <Button
          text="로그인하기"
          _onClick={() => {
            login();
          }}
          disable={id === "" || pwd === "" ? true : false}
        ></Button>
      </Grid>
    </>
  );
};

export default Login;
