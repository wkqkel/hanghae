import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createWordnoteFB, reviseWordnoteFB } from "./redux/modules/Wordnote";
import { Route, useParams, useHistory, useLocation } from "react-router-dom";

const Write = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const input_word = React.useRef(null);
  const input_ex = React.useRef(null);
  const input_meaning = React.useRef(null);
  const words = useSelector((state) => state.Wordnote.list);
  const detail_index = useParams().index;
  let location = useLocation();

  const checkInput = () => {
    if (
      !input_word.current.value ||
      !input_ex.current.value ||
      !input_meaning.current.value
    ) {
      alert(" 모두입력해주세요");
      return true;
    }
    return false;
  };
  const addList = () => {
    if (checkInput()) {
      return;
    }
    let newCard = {
      word_name: input_word.current.value,
      word_ex: input_ex.current.value,
      word_meaning: input_meaning.current.value,
      check: false,
    };
    dispatch(createWordnoteFB(newCard));
    alert("저장이 완료되었습니다");
    history.push("/");
  };
  const reviseList = () => {
    if (checkInput()) {
      return;
    }
    let reviseCard = {
      word_name: input_word.current.value,
      word_ex: input_ex.current.value,
      word_meaning: input_meaning.current.value,
      check: false,
    };
    dispatch(reviseWordnoteFB(reviseCard, words[detail_index].id));

    history.push("/");
  };
  React.useEffect(() => {
    if (detail_index + 1) {
      input_word.current.value = location.state.word_name;
      input_ex.current.value = location.state.word_ex;
      input_meaning.current.value = location.state.word_meaning;
    }
  }, []);

  return (
    <Write_container>
      <span style={{ fontSize: "20px", fontWeight: "800" }}>
        {detail_index + 1 ? "단어 수정하기" : "단어 추가하기"}
      </span>
      <div style={{ marginTop: "60px" }}>
        <Input_box>
          <span>단어</span>
          <input type="text" ref={input_word} />
        </Input_box>
        <Input_box>
          <span>예시</span>
          <input type="text" ref={input_ex} />
        </Input_box>
        <Input_box>
          <span>뜻</span>
          <input type="text" ref={input_meaning} />
        </Input_box>
      </div>
      <Route path="/write" exact>
        <Btn_plus onClick={addList}>추가하기</Btn_plus>
      </Route>
      <Route path="/write/:index">
        <Btn_plus onClick={reviseList}>수정하기</Btn_plus>
      </Route>
    </Write_container>
  );
};
const Write_container = styled.div`
  margin: 200px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 500px;
  height: 600px;
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Input_box = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  padding: 20px;
  input {
    margin-top: 10px;
    background: none;
    border: none;
    border-bottom: 2px solid black;
    height: 30px;
    padding-left: 10px;
  }
`;

const Btn_plus = styled.div`
  width: 110px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  color: white;
  border-radius: 40px;
  margin: 80px auto 0 auto;
`;
export default Write;
