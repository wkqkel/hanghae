import "./App.css";
import React from "react";
import Weekday from "./Weekday";
import styled from "styled-components";
import { Route } from "react-router-dom";
import Detail from "./Detail";

function App() {
  // weeklist 배열을 state로 만들어서 넘겨줌
  const [weeklist, setList] = React.useState([
    "월",
    "화",
    "수",
    "목",
    "금",
    "토",
    "일",
  ]);
  return (
    <Background className="App">
      <Container>
        <Route path="/" exact>
          <h3>내 일주일은?</h3>
          <Weekday weeklist={weeklist} />
        </Route>
        <Route path="/:weekday">
          <Detail />
        </Route>
      </Container>
    </Background>
  );
}
const Background = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  width: 350px;
  height: 600px;
  border: 1px solid rgb(221, 221, 221);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`;

export default App;
