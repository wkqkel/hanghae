import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Detail = (props) => {
  const circleArray = Array(5).fill(0);
  let history = useHistory();
  const CircleDom = React.useRef([]);
  CircleDom.current = [];
  const CircleDomRefs = (el) => {
    CircleDom.current.push(el);
  };
  console.log(CircleDom.current);

  const changeColor = (tag2) => {
    CircleDom.current.map((e, i) => {
      e.getAttribute("id") <= tag2.getAttribute("id")
        ? (e.style.backgroundColor = "#ffeb3b")
        : (e.style.backgroundColor = "#ddd");
    });
  };
  React.useEffect((e) => {
    CircleDom.current.map((e, i) => {
      e.addEventListener("click", () => {
        changeColor(CircleDom.current[i]);
      });
    });
  }, []);

  return (
    <Container>
      <h3> {history.location.pathname.split("/")[1]}요일 평점남기기</h3>
      <Circles>
        {circleArray.map((e, i) => {
          return <Circle ref={CircleDomRefs} id={i} key={i}></Circle>;
        })}
      </Circles>
      <button
        onClick={() => {
          history.goBack();
        }}
      >
        평점남기기
      </button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  button {
    margin: 40px;
    height: 50px;
  }
`;

const Circles = styled.div`
  display: flex;
  margin-left: 10px;
`;

const Circle = styled.div`
  width: 30px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(221, 221, 221);
  display: flex;
  margin-right: 10px;
`;
export default Detail;
