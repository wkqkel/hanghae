import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Write_btn = (props) => {
  const history = useHistory();
  return (
    <Circle
      onClick={() => {
        history.push("/write/");
      }}
    >
      <Stick></Stick>
      <Stick
        style={{ position: "absolute", transform: "rotate(90deg)" }}
      ></Stick>
    </Circle>
  );
};

const Circle = styled.div`
  width: 60px;
  height: 60px;
  background-color: black;
  border-radius: 50%;
  position: fixed;
  bottom: 30px;
  right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    transform: rotate(90deg);
    transition: transform 0.1s linear;
  }
`;
const Stick = styled.div`
  width: 7px;
  height: 25px;
  border-radius: 2px;
  background-color: white;
`;
export default Write_btn;
