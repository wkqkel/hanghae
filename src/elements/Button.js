import React from "react"
import styled from "styled-components"

const Button = (props) => {
  const {
    text,
    _onClick,
    children,
    margin,
    width,
    padding,
    disable,
    bg,
    color,
    cursor,
  } = props

  const styles = {
    margin,
    width,
    padding,
    color,
    bg,
    cursor,
  }

  return (
    <>
      <ElButton {...styles} onClick={_onClick} disabled={disable}>
        {text ? text : children}
      </ElButton>
    </>
  )
}

Button.defaultProps = {
  text: false,
  _onClick: () => {},
  children: null,
  margin: false,
  padding: "12px 0px",
  disable: false,
  color: "#fff",
  width: "100%",
  cursor: "pointer",
  bg: "#212121",
}

const ElButton = styled.button`
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  width: ${(props) => props.width};
  background-color: ${(props) => (props.disabled ? "#333434;" : "#8b8b8b;")};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  ${(props) => (props.margin ? `margin:${props.margin};` : "")};
  cursor: ${(props) => props.cursor};
`

export default Button
