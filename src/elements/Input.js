import React from "react"
import styled, { withTheme } from "styled-components"
import { Text } from "."

const Input = (props) => {
  const {
    _onChange,
    placeholder,
    type,
    value,
    is_submit,
    onSubmit,
    is_radio,
    name,
    checked,
    multiline,
    label,
    width,
    disable,
    bg,
    _onKeyDown,
    _ref,
    _onFocus,
  } = props

  const styles = {
    width,
    bg,
  }

  return (
    <>
      {label && <Text margin="0px">{label}</Text>}
      <ElInput
        {...styles}
        type={type}
        onChange={_onChange}
        placeholder={placeholder}
        value={value}
        disabled={disable}
        onKeyDown={_onKeyDown}
        ref={_ref}
        onFocus={_onFocus}
      />
    </>
  )
}

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  width: "100%",
  _onChange: () => {},
  _onClick: () => {},
  disable: false,
  bg: "white",
  _onKeyDown: () => {},
  _ref: () => {},
  _onFocus: () => {},
}
const ElInput = styled.input`
  border: 1px solid #212121;
  width: ${(props) => props.width};
  padding: 12px 4px;
  box-sizing: border-box;
  border: 2px solid #9dcabf;
  border-radius: 5px;
  background-color: ${(props) => props.bg};
`
export default Input
