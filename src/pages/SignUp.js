import React from "react";
import styled from "styled-components";
import { Button, Text } from "../elements";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const SingUp = (props) => {
  const dispatch = useDispatch();
  // const [userName, setuserName] = React.useState("");
  const [userMail, setuserMail] = React.useState("");
  const [userId, setuserId] = React.useState("");
  const [passWord, setpassWord] = React.useState("");
  const [passwordCheck, setpasswordCheck] = React.useState("");

  const onClickSignup = () => {
    if (
      userMail === "" ||
      userId === "" ||
      passWord === "" ||
      passwordCheck === ""
    ) {
      window.alert("입력해주세요");
      return;
    }

    dispatch(userActions.signupDB(userMail, userId, passWord));
    console.log("가입됐다!");
  };

  return (
    <Wrap>
      <Container>
        <div>
          <Text bold size="4rem" color="#212529">
            환영합니다!
          </Text>
          <Text size="24px" color="#212529">
            기본 회원 정보를 등록해주세요
          </Text>
        </div>
        <SignUpBox>
          <Text size="1.125rem" bold color="#212529">
            이름
          </Text>
          <InputUnderline placeholder="이름을 입력하세요"></InputUnderline>
        </SignUpBox>
        <SignUpBox>
          <Text size="1.125rem" bold color="#212529">
            이메일
          </Text>
          <InputUnderline
            placeholder="이메일을 입력하세요"
            onChange={(e) => {
              setuserMail(e.target.value);
            }}
          ></InputUnderline>
        </SignUpBox>
        <SignUpBox>
          <Text size="1.125rem" bold color="#212529">
            아이디
          </Text>
          <InputUnderline
            placeholder="아이디를 입력하세요"
            onChange={(e) => {
              setuserId(e.target.value);
            }}
          ></InputUnderline>
        </SignUpBox>
        <SignUpBox>
          <Text size="1.125rem" bold color="#212529">
            비밀번호
          </Text>
          <InputUnderline
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => {
              setpassWord(e.target.value);
            }}
          ></InputUnderline>
        </SignUpBox>
        <SignUpBox>
          <Text size="1.125rem" bold color="#212529">
            비밀번호 확인
          </Text>
          <InputUnderline
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            onChange={(e) => {
              setpasswordCheck(e.target.value);
            }}
          ></InputUnderline>
        </SignUpBox>
        <ButtonWrap>
          <Button
            margin="0px 20px 0px 0px"
            bg="#DEE2E6"
            color="#212529"
            borderRadius="2.0rem"
            size="1.5rem"
            _onClick={() => {
              history.push("/");
            }}
          >
            <Text bold size="1.5rem">
              취소
            </Text>
          </Button>
          <Button
            bg="#12B886"
            margin="0px 20px 0px 0px"
            borderRadius="2.0rem"
            size="1.5rem"
            _onClick={onClickSignup}
          >
            <Text bold size="1.5rem" color="#FFFFFF">
              다음
            </Text>
          </Button>
        </ButtonWrap>
      </Container>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 4rem;
  @media only screen and (max-width: 768px) {
    min-width: 330px;
  }
`;

const Container = styled.div`
  width: 768px;
  margin: 100px auto 0px;
  display: grid;
  justify-content: flex-start;
  @media only screen and (max-width: 768px) {
    min-width: 330px;
  }
`;

const SignUpBox = styled.div`
  margin-top: 40px;
  @media only screen and (max-width: 768px) {
    min-width: 330px;
  }
`;

const InputUnderline = styled.input`
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1px;
  padding-bottom: 10px;
  font-size: 1.5rem;
  color: #adb5bd;
  margin-top: 0.5rem;
  &:focus {
    outline: none;
    border-bottom: 1px solid #12b886;
  }
  @media only screen and (max-width: 768px) {
    min-width: 330px;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  margin-top: 6rem;
  @media only screen and (max-width: 768px) {
    min-width: 330px;
  }
`;
export default SingUp;
