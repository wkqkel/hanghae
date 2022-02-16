import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"

const Banner = () => {
  return (
    <Container>
      <FontAwesomeIcon icon={faAngleLeft} />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 300px;
  background: black;
  font-size: 30px;
  color: white;
`
export default Banner
