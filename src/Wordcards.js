import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { deleteWordnoteFB } from "./redux/modules/Wordnote";

const Wordcards = (props) => {
  const words = useSelector((state) => state.Wordnote.list);

  const history = useHistory();
  const dispatch = useDispatch();

  const deleteList = (index) => {
    dispatch(deleteWordnoteFB(words[index].id));
  };

  return (
    <Cards_container>
      {words.map((e, i) => {
        return (
          <Card_wrap key={i} index={i}>
            <Card>
              <Card_front>
                <div className="word_name">{e.word_name}</div>
                <div className="word_ex">{e.word_ex}</div>
              </Card_front>
              <Card_back>
                <div className="word_meaning">{e.word_meaning}</div>
              </Card_back>
            </Card>
            <Btns>
              {/* <i className="fas fa-check"></i> */}
              <Link
                to={{
                  pathname: "/write/" + i,
                  state: {
                    word_name: e.word_name,
                    word_ex: e.word_ex,
                    word_meaning: e.word_meaning,
                  },
                }}
              >
                <FontAwesomeIcon icon={faEdit} className="icon" />
              </Link>
              <FontAwesomeIcon
                icon={faTrash}
                className="icon"
                onClick={() => {
                  deleteList(i);
                }}
              />
            </Btns>
          </Card_wrap>
        );
      })}
    </Cards_container>
  );
};

const Cards_container = styled.div`
  width: 72%;
  margin-top: 150px;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  overflow-y: auto;
  @media (max-width: 870px) {
    flex-wrap: initial;
    overflow-x: auto;
    height: 500px;
  }
`;
const Card_wrap = styled.div`
  position: relative;
  min-width: 320px;
  height: 450px;
`;
const Card_back = styled.div`
  display: flex
  top:0;
  opacity:0;
  .word_meaning {
    font-size: 42px;
    font-weight: 700;
    color:white;
  }
  position: absolute;
`;

const Card_front = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  .word_name {
    font-size: 42px;
    font-weight: 700;
  }
  .word_ex {
    font-size: 18px;
    color: rgb(9, 132, 227);
    font-weight: 200;
  }
`;
const Btns = styled.div`
  display: flex;
  font-size: 20px;
  position: absolute;
  bottom: 40px;
  right: 30px;
  .icon {
    margin: 4px;
    color: black;
  }
`;

let Card = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 20px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  &:hover {
    transform: rotateY(180deg);
    transition: transform 0.4s, background 0s linear;
    transition-delay: 0s, 0.1s;
    background: black;

    ${Card_back} {
      opacity: 1;
      position: absolute;
      transform: rotateY(180deg);
      transition: opacity 0s linear;
      transition-delay: 0.1s;
    }
    .word_ex {
      opacity: 0;
    }
    ~ ${Btns} {
      opacity: 0;
    }
  }
`;

export default Wordcards;
