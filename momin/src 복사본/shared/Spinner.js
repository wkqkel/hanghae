import React from "react"
import styled from "styled-components"

const Spinner = (props) => {
  return (
    // <Outter>
    //   <Eco style={{ color: "blue", fontSize: "150px" }} />
    // </Outter>
    <Outter>
      <img src="https://firebasestorage.googleapis.com/v0/b/megazine-11a01.appspot.com/o/images%2Fmomin1.png?alt=media&token=474370a1-1e4b-4883-83e0-dda39b708bd3" />
    </Outter>
  )
}

const Outter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
  z-index: 100;
`

export default Spinner
