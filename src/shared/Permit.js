import React from "react"
import styled from "styled-components"
import { history } from "../redux/configureStore"

const Permit = (props) => {
  const is_session = localStorage.getItem("token") ? true : false
  console.log(is_session)
  if (is_session) {
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
`
const WriteText = styled.div`
  position: fixed;
  bottom: 25px;
  right: 12px;
  font-size: 18px;
  color: white;
`
export default Permit
