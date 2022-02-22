import React from "react";
import styled from "styled-components";

const FlexibleTextarea = (props) => {
  const { width, size } = props;
  const styles = {
    width,
    size,
  };
  const textRef = React.useRef();
  const handleResizeHeight = React.useCallback(() => {
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  return (
    <Textarea
      ref={textRef}
      placeholder="게시글 입력하기.."
      onInput={handleResizeHeight}
      {...styles}
    />
  );
};

FlexibleTextarea.defaultProps = {
  width: "100%",
  padding: "10px",
  size: "14px",
};
const Textarea = styled.textarea`
  width: ${(props) => props.width};
  font-size: ${(props) => props.size};
  padding: ${(props) => props.padding};
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
`;
export default FlexibleTextarea;
