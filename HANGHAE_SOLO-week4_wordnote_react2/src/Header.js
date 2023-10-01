import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const history = useHistory();
  return (
    <Header_box>
      <span
        onClick={() => {
          history.push("/");
        }}
        style={{ display: "flex", alignItems: "center" }}
      >
        <p>뒤집기&nbsp;</p>
        영단어
      </span>
    </Header_box>
  );
};

const Header_box = styled.div`
  width: 100vw;
  height: 100px;
  border-bottom: solid 2px black;
  background-color: white;
  overflow-y: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  z-index: 5;

  font-family: "Dongle", sans-serif;
  font-size: 60px;

  p {
    font-size: 82px;
  }
`;

export default Header;
