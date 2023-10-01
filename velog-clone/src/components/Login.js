import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { Button, Input, Text } from "../elements";
import { Link } from "react-router-dom";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

const Login = (props) => {
  const dispatch = useDispatch();
  const { checkLoginAni, setLoginAni } = props;
  const [userMail, setuserMail] = useState("");
  const [passWord, setpassWord] = useState("");

  const login = (props) => {
    if (userMail === "" || userMail === "") {
      window.alert("아이디 혹은 비밀번호를 입력해주세요");
      return;
    }
    dispatch(userActions.LoginDB(userMail, passWord));
  };

  return (
    <React.Fragment>
      <Container checkLoginAni={checkLoginAni}>
        <LoginWrap checkLoginAni={checkLoginAni}>
          {/*로그인 왼쪽 이미지*/}
          <GrayBlock>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Lolgimg
                style={{ width: "150px" }}
                src="https://static.velog.io/static/media/undraw_joyride_hnno.fae6b95e.svg"
              ></Lolgimg>
              <Welcome> 환영합니다!</Welcome>
            </div>
          </GrayBlock>
          <WhiteBlock>
            <ExitWrapper>
              <ExitSvg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                tabindex="1"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  setLoginAni(false);
                }}
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </ExitSvg>
            </ExitWrapper>
            <BlockContent>
              <div>
                <Text size="21px">로그인</Text>
                <Text color="#868E96" margin="16px 0px">
                  이메일로 로그인
                </Text>
                <Input
                  Radius="10px"
                  height="40px"
                  padding="1rem"
                  placeholder="이메일을 입력하세요"
                  _onChange={(e) => {
                    setuserMail(e.target.value);
                  }}
                ></Input>
                <Input
                  type="password"
                  margin="5px 0px"
                  height="40px"
                  padding="1rem"
                  placeholder="비밀번호를 입력하세요"
                  _onChange={(e) => {
                    setpassWord(e.target.value);
                  }}
                ></Input>
                <Button
                  _onClick={() => {
                    login();
                  }}
                >
                  로그인
                </Button>
              </div>
              <Text color="#868E96" margin="16px 0px">
                소셜 계정으로 로그인
              </Text>
              <Sociallogo>
                <img src="imges/github-logo.png" alt=""></img>
                <img src="imges/Google_icon.png" alt=""></img>
                <img src="imges/facebook.logo.png" alt=""></img>
              </Sociallogo>
              <Text color="#212529" margin="30px 0px 0px 140px">
                아직 회원이 아니신가요?{" "}
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "#20C997" }}
                >
                  회원가입
                </Link>
              </Text>
            </BlockContent>
          </WhiteBlock>
        </LoginWrap>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  z-index: 20;
  @media only screen and (max-width: 768px) {
    min-width: 330px;
  }
  background: rgba(255, 255, 255, 0.8);
  visibility: ${(props) =>
    props.checkLoginAni === "on" ? "visible;" : "hidden;"}
  transition: ${(props) =>
    props.checkLoginAni ? "" : "visibility 0s linear 300ms"};
`;

const loginAni = keyframes` 
  from {
    transform: translateY(500px) scale(0.4);
  }
  to {
    transform: translateY(0px) scale(1);
  }
`;

const logoutAni = keyframes` 
  100% {
    transform: translateY(500px) scale(0.4);
  }
  0% {
    transform: translateY(0px) scale(1);
  }
`;

const LoginWrap = styled.div`
  width: 606px;
  height: 480px;
  box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
  display: flex;
  @media only screen and (max-width: 768px) {
    min-width: 330px;
  }
  ${(props) => {
    if (props.checkLoginAni === "on") {
      return css`
        animation: ${loginAni} 0.4s forwards;
      `;
    } else {
      return css`
        animation: ${logoutAni} 0.4s forwards;
      `;
    }
  }}
`;

//로그인 왼쪽 스타일
const GrayBlock = styled.div`
  width: 216px;
  background: rgb(241, 243, 245);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Lolgimg = styled.img`
  width: 100px;
  height: auto;
  display: block;
  @media only screen and (max-width: 768px) {
    min-width: 330px;
  }
`;

const Welcome = styled.div`
  font-size: 1.75rem;
  margin-top: 1.5rem;
  color: #495057;
  text-align: center;
  font-weight: 600;
`;

//로그인 오른쪽 스타일
const WhiteBlock = styled.div`
  flex: 1 1 0%;
  background: #ffffff;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const BlockContent = styled.div``;

const ExitWrapper = styled.div`
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
  font-size: 1.5rem;
  color: var(--text3);
  margin-bottom: 2.25rem;
`;

const ExitSvg = styled.svg`
  cursor: pointer;
  stroke: currentcolor;
  fill: currentcolor;
  stroke-width: 0;
  height: 1em;
  width: 1em;
  :not {
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: hidden;
  }
`;

const Sociallogo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 40px 0px;
`;
export default Login;
