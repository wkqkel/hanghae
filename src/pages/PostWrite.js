import React from "react";
import styled, { keyframes } from "styled-components";
import { Grid, Text } from "../elements";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

import { AiOutlineArrowLeft } from "react-icons/ai";
import WriteModal from "../components/WriteModal";
import { history } from "../redux/configureStore";
import axios from "axios";
import instance from "../shared/Request";
const PostWrite = () => {
  // 토스트에디터 사용

  // 태그 데이터 관리 및 추가 함수
  const $tagInputGuide = React.useRef();
  const [isModal, setIsModal] = React.useState(false);
  const [tagData, setTagData] = React.useState([]);
  const [title, setTitle] = React.useState();
  const addTag = (e) => {
    if (
      (e.keyCode === 13 || e.keyCode === 188) &&
      !tagData.includes(e.target.value)
    ) {
      setTagData([...tagData, e.target.value.split(",")[0]]);
      e.target.value = "";
    }
  };
  // 모달창 구현 함수
  const clickModal = () => {
    setIsModal(!isModal);
  };

  const editorRef = React.useRef();
  React.useEffect(() => {
    if (editorRef.current) {
      // 기존에 Image 를 Import 하는 Hook 을 제거한다.
      editorRef.current.getInstance().removeHook("addImageBlobHook");

      // 새롭게 Image 를 Import 하는 Hook 을 생성한다.
      editorRef.current
        .getInstance()
        .addHook("addImageBlobHook", (blob, callback) => {
          (async () => {
            let formData = new FormData();

            formData.append("image", blob);

            const { data: filename } = await axios.post(
              "http://13.125.157.182:3000/post/imagetest",
              formData
              // {
              //   header: { "content-type": "multipart/formdata" },
              // }
            );
            // .then((response) => {
            //   console.log(response);
            // });
            const imageUrl = filename.url;
            // // Image 를 가져올 수 있는 URL 을 callback 메서드에 넣어주면 자동으로 이미지를 가져온다.
            callback(imageUrl, "image");
          })();
          return false;
        });
    }
    return () => {};
  }, [editorRef]);

  return (
    <>
      <Container>
        {isModal && (
          <WriteModal isModal={isModal} clickModal={clickModal}></WriteModal>
        )}
        {/* <Left> */}
        <LeftTop>
          <TitleInput placeholder="제목을 입력하세요"></TitleInput>
          <div
            style={{
              width: "54px",
              height: "6px",
              background: "#495057",
              margin: "20px 0px",
            }}
          ></div>
          <TagBox>
            {tagData.map((e, i) => {
              return (
                <TagCircle
                  key={i}
                  onClick={() => {
                    setTagData(tagData.filter((t) => t !== e));
                  }}
                >
                  {e}
                </TagCircle>
              );
            })}
            <TagInput
              placeholder="태그를 입력하세요"
              onFocus={() => {
                $tagInputGuide.current.style.opacity = 1;
                $tagInputGuide.current.style.zIndex = 1;
              }}
              onBlur={() => {
                $tagInputGuide.current.style.opacity = 0;
                $tagInputGuide.current.style.zIndex = 0;
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 188) {
                  e.preventDefault();
                  if (e.target.value) {
                    addTag(e);
                  }
                } else {
                  addTag(e);
                }
              }}
            />
            <TagInputGuide ref={$tagInputGuide}>
              <div style={{ display: "inline-block" }}>
                쉼표 혹은 엔터를 입력하여 태그를 등록 할 수 있습니다.
              </div>
              <div style={{ display: "inline-block" }}>
                등록된 태그를 클릭하면 삭제됩니다
              </div>
            </TagInputGuide>
          </TagBox>
        </LeftTop>
        <Editor
          placeholder="당신의 이야기를 적어보세요..."
          previewStyle="vertical"
          height="80vh"
          initialEditType="markdown"
          useCommandShortcut={true}
          onChange={() => {
            const innerTxt = editorRef.current.getInstance().getMarkdown();
            console.log(innerTxt);
            // setText(innerTxt);
          }}
          ref={editorRef}
        />
        <BottomBar>
          <Grid is_flex justifyContent="space-between">
            <QuitBtn
              onClick={() => {
                history.push("/");
              }}
            >
              <AiOutlineArrowLeft
                style={{ marginRight: "10px", fontSize: "16px" }}
              ></AiOutlineArrowLeft>
              나가기
            </QuitBtn>
            <Grid is_flex justifyContent="end">
              <SaveBtn>임시저장</SaveBtn>
              <PostBtn onClick={clickModal}>출간하기</PostBtn>
            </Grid>
          </Grid>
        </BottomBar>
      </Container>
      {/* </Left> */}
    </>
  );
};
const Container = styled.div`
  scroll: none;
  height: 100vh;
  overflow: hidden;
`;
const Left = styled.div`
  width: 50%;
  height: auto;
`;
const Right = styled.div`
  width: 50%;
  height: 100vh;
`;
const LeftTop = styled.div`
  padding: 25px 45px 0px 45px;
`;
const TitleInput = styled.input`
  width: 50%;
  height: auto;
  font-size: 42px;
  font-weight: bold;
  letter-spacing: 2px;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #868e96;
  }
`;

const BottomBar = styled.div`
  width: 50vw;
  height: 58px;
  border-radius: 3px 3px 0 0;
  background: white;
  position: absolute;
  bottom: 0;
  box-shadow: 0 4px 14px 2px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  font-weight: 500;
  padding: 15px;
`;

const QuitBtn = styled.div`
  width: 102px;
  height: 36px;
  cursor: pointer;
  font-weight: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  &: hover {
    background: #f5f5f5;
  }
`;
const SaveBtn = styled.div`
  margin-right: 10px;
  padding: 5px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #12b886;
  border-radius: 5px;
  &: hover {
    background: #f5f5f5;
  }
  cursor: pointer;
`;
const PostBtn = styled.div`
  padding: 5px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #12b886;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &: hover {
    background: #20c997;
  }
`;

const TagBox = styled.div`
  position: relative;
  width: 50%;
  margin-bottom: -40px;
`;
const TagInput = styled.input`
  font-size: 18px;
  border: none;
  color: #495057;
  font-weight: 300;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #868e96;
  }
`;

const TagInputGuide = styled.div`
  background: #343a40;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  & > * {
    color: white;
    font-size: 12px;
  }
  position: relative;
  top: 18px;
  opacity: 0;
  transition: opacity 0.2s ease-in;
`;

const TagCircle = styled.div`
  display: inline-block;
  padding: 5px 14px;
  background: #f5f5f5;
  color: #12b886;
  border-radius: 20px;
  margin: 3px;
  font-size: 14px;
`;

// const Modal = keyframes`
// from {
//   transform: translateY(100vh);
// }
// to {
//   transform: translateY(0px);
// }
// `;

export default PostWrite;
