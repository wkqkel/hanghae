import React from "react";
import styled from "styled-components";
import { Text, Grid } from "./index";

const Input = (props) => {
  const {
    multiline,
    label,
    _onChange,
    placeholder,
    type,
    value,
    is_submit,
    onSubmit,
    is_radio,
    name,
    checked,
  } = props;

  if (is_radio) {
    return (
      <label>
        <Grid is_flex width="200px">
          <ElRadio
            type="radio"
            value={value}
            name={name}
            onChange={_onChange}
          ></ElRadio>
          {label && (
            <Text margin="0px" size="20px" bold>
              {label}
            </Text>
          )}
        </Grid>
      </label>
    );
  }

  if (multiline) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea
          rows={10}
          onChange={_onChange}
          placeholder={placeholder}
          value={value}
        />
      </Grid>
    );
  }

  return (
    <>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        {is_submit ? (
          <ElInput
            type={type}
            onChange={_onChange}
            placeholder={placeholder}
            value={value}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
          />
        ) : (
          <ElInput type={type} onChange={_onChange} placeholder={placeholder} />
        )}
      </Grid>
    </>
  );
};

Input.defaultProps = {
  multiline: false,
  label: false,
  placeholder: "텍스트를 입력해주세요",
  // 입력할 때 텍스트 값이 변하는데, 얘의 부모컴포넌트가 알아서 리덕스에 저장하든가 ,api요청해야하니 콜백함수 받아와야함.
  _onChange: () => {},
  type: "text",
  value: "",
  onSubmit: () => {},
  is_submit: false,
  is_radio: false,
  name: "",
  checked: false,
};

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  resize: none;
`;

const ElRadio = styled.input`
  width: 22px;
  height: 22px;
`;
export default Input;
