import React from "react";
import styled, { withTheme } from "styled-components";
import { Text } from ".";

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
    Radius,
    border,
  } = props;

  const styles = {
    width,
    bg,
  };

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
  );
};

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
  padding: "12px 4px",
  border: "1px solid #212121",
  Radius: "5px",
};
const ElInput = styled.input`
  border: ${(props) => props.border};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: ${(props) => props.border};
  border-radius: ${(props) => props.Radius};
  background-color: ${(props) => props.bg};
`;
export default Input;

//
// ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
