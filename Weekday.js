import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Weekday = (props) => {
  const weekArray = Array(7).fill(0);
  const circleArray = Array(5).fill(0);
  let history = useHistory();
  const weeklist = props.weeklist;

  return (
    <div>
      {weekArray.map((e, i) => {
        let random = Math.floor(Math.random() * circleArray.length) + 1; // 0~4까지 랜덤
        console.log(random);
        return (
          <DayBox>
            {weeklist[i]}
            <Circles>
              {circleArray.map((e, i) => {
                return (
                  <Circle
                    style={{
                      backgroundColor: i < random ? "#ffeb3b" : "#ddd",
                    }}
                  ></Circle>
                );
              })}
            </Circles>
            <Button
              onClick={() => {
                history.push("/" + [weeklist[i]]);
              }}
            ></Button>
          </DayBox>
        );
      })}
    </div>
  );
};
const DayBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;
const Circles = styled.div`
  display: flex;
  margin-left: 10px;
`;
const Circle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgb(221, 221, 221);
  display: flex;
  margin-right: 10px;
`;

const Button = styled.div`
  border-top: 18px solid none;
  border-bottom: 15px solid tomato;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  transform: rotate(90deg);
`;
export default Weekday;
