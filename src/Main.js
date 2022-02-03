import React from "react";
import styled from "styled-components";
import Wordcards from "./Wordcards";
import Write_btn from "./Write_btn";

const Main = (props) => {
  // console.log(new Date());
  return (
    <Container>
      <Wordcards></Wordcards>
      <Write_btn></Write_btn>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

export default Main;
