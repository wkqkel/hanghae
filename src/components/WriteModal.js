import React from "react";
import styled from "styled-components";
import { Grid, Text, Input } from "../elements";
import { BiImages } from "react-icons/bi";
import { GiEarthAmerica } from "react-icons/gi";
import { RiLock2Fill } from "react-icons/ri";
import { BiListPlus } from "react-icons/bi";
import instance from "../shared/Request";
import { useDispatch } from "react-redux";
import { actionCreators as PostActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";

const WriteModal = (props) => {
  const dispatch = useDispatch();

  // 수정모드일때 인풋창 채우기
  React.useEffect(() => {
    if (props.edited.is_edit) {
      setPreviewImg(props.edited.postOne.thumbnail);
      $introduceInput.current.value = props.edited.postOne.introduce;
    }
  }, []);
  //프리뷰 이미지 서버에서 url 받아오기 및 수정, 삭제
  let [previewImg, setPreviewImg] = React.useState();
  const loadPreview = (e) => {
    let formData = new FormData();

    formData.append("image", e.target.files[0]);
    instance
      .post("/post/imagetest", formData)
      .then(function (response) {
        // console.log(response.data.url);
        // $preview.current.style.backgroundImage = response.data.url;
        setPreviewImg(response.data.url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // 포스팅 버튼 클릭
  const $introduceInput = React.useRef();
  const clickPostBtn = () => {
    const post = {
      title: props.title.current.value,
      tag: props.tags,
      contents: props.editorRef.current.getInstance().getMarkdown(),
      thumbnail: previewImg,
      introduce: $introduceInput.current.value,
    };
    if (props.edited.is_edit) {
      dispatch(PostActions.editPostDB(post, props.edited.postOne.postId));
    } else {
      dispatch(PostActions.addPostDB(post));
    }
  };

  // 에디티드 모드일때 인풋값 넣어주기

  return (
    <Background>
      <LeftBox>
        <Text size="20px" weight="500" margin="0 0 10px 0">
          포스트 미리보기
        </Text>

        {previewImg && (
          <Grid is_flex justifyContent="end">
            <ImgAfterBtn htmlFor="input-file">재업로드</ImgAfterBtn>
            <ImgAfterBtn
              onClick={() => {
                setPreviewImg();
              }}
            >
              제거
            </ImgAfterBtn>
          </Grid>
        )}
        <Preview previewImg={previewImg}>
          {!previewImg && (
            <BiImages style={{ fontSize: "92px", color: "#868E96" }}></BiImages>
          )}
          {!previewImg && (
            <ImgUploadBtn className="input-file-button" htmlFor="input-file">
              썸네일 업로드
            </ImgUploadBtn>
          )}
        </Preview>
        <input
          type="file"
          id="input-file"
          style={{ display: "none" }}
          onChange={loadPreview}
        />
        <IntroduceInput
          placeholder="당신의 포스트를 짧게 소개해보세요"
          ref={$introduceInput}
        ></IntroduceInput>
        <Grid justifyContent="end">
          <Text size="12px" margin="5px 0" color="#868E96">
            0/150
          </Text>
        </Grid>
      </LeftBox>
      <div
        style={{
          width: "1px",
          minHeight: "380px",
          background: "#e9ecf2",
          opacity: "0.7",
          margin: "0 30px",
        }}
      ></div>
      <RightBox>
        <Text size="20px" weight="500" margin="0 0 10px 0">
          공개 설정
        </Text>
        <Grid is_flex height="auto" justifyContent="space-between">
          <OpenBtn style={{ marginRight: "20px" }}>
            <GiEarthAmerica
              style={{ marginRight: "30px", fontSize: "24px" }}
            ></GiEarthAmerica>
            전체 공개
          </OpenBtn>
          <OpenBtn>
            <RiLock2Fill
              style={{ marginRight: "30px", fontSize: "24px" }}
            ></RiLock2Fill>
            비공개
          </OpenBtn>
        </Grid>
        <Grid>
          <Text size="20px" weight="500" margin="20px 0 10px 0">
            URL 설정
          </Text>
          <UrlInputBox>
            <Text color="#868E96" weight="300" margin="0 0 0 10px">
              /@wkqkel/
            </Text>
            <UrlInput></UrlInput>
          </UrlInputBox>
        </Grid>
        <Grid>
          <Text size="20px" weight="500" margin="20px 0 10px 0">
            시리즈 설정
          </Text>
          <OpenBtn style={{ width: "100%", color: "#20c997" }}>
            <BiListPlus
              style={{ marginRight: "15px", fontSize: "24px" }}
            ></BiListPlus>
            시리즈에 추가하기
          </OpenBtn>
        </Grid>

        <Grid is_flex justifyContent="end" margin="70px 0">
          <CancelBtn
            onClick={() => {
              props.clickModal();
            }}
          >
            취소
          </CancelBtn>
          <PostBtn
            onClick={() => {
              clickPostBtn();
            }}
          >
            {props.edited.is_edit ? "수정하기" : "출간하기"}
          </PostBtn>
        </Grid>
      </RightBox>
    </Background>
  );
};
const Background = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
  position: absolute;
  z-index: 99;
  animation: modal-bg-show 1s;
  @keyframes modal-bg-show {
    from {
      transform: translateY(100vh);
    }
    to {
      transform: translateY(0px);
    }
  }
`;
const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const IntroduceInput = styled.textarea`
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
  width: 320px;
  height: 110px;
  padding: 10px 15px;
  margin-top: 30px;
  color: black;
  font-weight: 300;
`;
const Preview = styled.div`
  width: 320px;
  height: 174px;
  background: #e9ecf2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: ${(props) =>
    props.previewImg ? `url(${props.previewImg})` : null};
  background-size: cover;
`;
const ImgUploadBtn = styled.label`
  width: 140px;
  height: 30px;
  background: white;
  border-radius: 5px;
  color: #20c997;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 500;
  margin: 10px auto;
  &: hover {
    background: rgba(255, 255, 255, 0.7);
  }
  cursor: pointer;
`;
const CancelBtn = styled.div`
  margin-right: 10px;
  padding: 8px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #12b886;
  border-radius: 5px;
  &: hover {
    background: #e9ecf2;
  }
  cursor: pointer;
`;
const PostBtn = styled.div`
  padding: 8px 18px;
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

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 380px;
  width: 320px;
`;

const OpenBtn = styled.div`
  width: 150px;
  height: 46px;
  cursor: pointer;
  background: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: #868e96;

  &: hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const UrlInputBox = styled.div`
  width: 100%;
  background: white;
  height: 36px;
  display: flex;
  justify-content: start;
  align-items: center;
`;
const UrlInput = styled.input`
  border: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #868e96;
  }
`;

const ImgAfterBtn = styled.label`
  margin: 7px 14px 7px 7px;
  color: #868e96;
  weight: 200;
  size: 15px;
  cursor: pointer;
  text-decoration: underline;
`;
export default WriteModal;
