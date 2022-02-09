import React from "react";
import { Button } from "../elements";
// import { storage } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = (props) => {
  const dispatch = useDispatch();
  const fileInput = React.useRef();
  const is_uploading = useSelector((state) => state.image.uploading);
  const selectFile = (e) => {
    // console.log(e.target.files[0]);
    // console.log(fileInput.current.files[0]);
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // console.log(reader.result);
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const uploadFB = () => {
    let image = fileInput.current?.files[0];
    dispatch(imageActions.uploadImageFB(image));
  };
  return (
    <>
      <input
        type="file"
        ref={fileInput}
        onChange={selectFile}
        disabled={is_uploading}
      />
      {/* <Button _onClick={uploadFB}>업로드하기</Button> */}
    </>
  );
};

export default Upload;
