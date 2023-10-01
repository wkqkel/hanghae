import React from "react";
import styled from "styled-components";
import { Button, Grid, Input, Text } from "../elements";
//#FF6B6B;
//#FF8787;
const Alert = (props) => {
  const $CardBox = React.useRef();

  const [completed, setCompleted] = React.useState(312);
  React.useEffect(() => {
    setTimeout(() => {
      props.setIsAlert(false);
    }, 2450);
    setInterval(() => {
      setCompleted((val) => (val > 0 ? val - 1 : null));
    }, 2);
    return () => {
      clearInterval(setCompleted);
    };
  }, []);

  return (
    <>
      <AlertList>
        <CardBox ref={$CardBox}>
          <Text color="white">로그인 후 이용해주세요</Text>
          <ProgressBar completed={completed}></ProgressBar>
        </CardBox>
      </AlertList>
    </>
  );
};

const AlertList = styled.div`
  position: absolute;
  right: 30px;
  top: 20px;
`;
const CardBox = styled.div`
  width: 312px;
  height: 64px;
  background: #e74c3c;
  display: flex;
  align-items: center;
  padding: 10px;
  animation: modal-bg-show 0.4s;
  @keyframes modal-bg-show {
    from {
      transform: rotateX(90deg);
    }
    to {
      transform: rotateX(0px);
    }
  }
`;

const ProgressBar = styled.div`
  width: ${(props) => props.completed}px;
  height: 7px;
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  bottom: 0;
  left: 0;
`;
export default Alert;
