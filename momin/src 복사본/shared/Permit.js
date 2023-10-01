import React from "react"
import styled from "styled-components"
import { history } from "../redux/configureStore"
import { useSelector } from "react-redux"
const Permit = (props) => {
  const is_login = useSelector((state) => state.user.is_login)

  if (is_login) {
    return (
      <React.Fragment>
        <WriteBtn
          onClick={() => {
            history.push("/write")
          }}
        >
          <WriteText>글쓰기</WriteText>
        </WriteBtn>
      </React.Fragment>
    )
  }
  return null
}
const WriteBtn = styled.div`
  width: 0px;
  height: 0px;
  border-top: 110px solid transparent;
  border-right: 140px solid #2ac1bc;
  position: fixed;
  bottom: 0;
  right: 0;

  @media only screen and (max-width: 375px) {
    border-top: 65px solid transparent;
    border-right: 80px solid #2ac1bc;
  }
`
const WriteText = styled.div`
  position: fixed;
  bottom: 25px;
  right: 12px;
  font-size: 18px;
  color: white;

  @media only screen and (max-width: 375px) {
    bottom: 12px;
    right: 6px;
    font-size: 12px;
  }
`
export default Permit
