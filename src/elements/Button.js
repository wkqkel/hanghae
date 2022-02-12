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
  } = props

  const styles = {
    margin,
    width,
    padding,
    color,
    bg,
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
  bg: "212121",
}

const ElButton = styled.button`
  box-sizing: border-box;
  border: none;
  width: ${(props) => props.width};
  background-color: ${(props) => (props.disabled ? "#808080;" : "#212121;")};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  ${(props) => (props.margin ? `margin:${props.margin};` : "")};
`

export default Button
