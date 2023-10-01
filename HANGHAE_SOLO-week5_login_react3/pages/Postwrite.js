import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";
import Layout from "../elements/Layout";
import Preview from "../components/Preview";
const Postwrite = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const { history } = props;
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);

  // console.log(props.match.params.id);

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;

  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

  const [contents, setContents] = React.useState(_post ? _post.contents : "");

  const [checkedRadio, setRadio] = React.useState("");
  const changeRadio = (e) => {
    setRadio(e.target.value);
  };

  React.useEffect(() => {
    if (is_edit && !_post) {
      window.alert("포스트정보가 없어요");
      history.goBack();
      return;
    }
    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, []);
  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addPost = () => {
    dispatch(postActions.addPostFB(contents, checkedRadio));
  };

  const editPost = () => {
    console.log(post_id);
    dispatch(
      postActions.editPostFB(post_id, { contents: contents }, checkedRadio)
    );
  };

  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px 30%" center>
        <Text size="32px" bold>
          앗! 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          _onClick={() => {
            history.replace("/login");
          }}
        >
          로그인하러가기
        </Button>
      </Grid>
    );
  }
  return (
    <>
      <Grid padding="16px 30%">
        <Grid padding="16px">
          <Text margin="0px" size="36px" bold>
            {is_edit ? "게시물 수정" : "게시물 작성"}
          </Text>
          <Upload></Upload>
        </Grid>
        <Grid>
          {/* <Grid>
            <Text margin="0px" size="24px" bold></Text>
          </Grid> */}
          <Grid>
            <Input
              value="textLeft"
              is_radio
              label="텍스트 왼쪽"
              name="layout"
              _onChange={changeRadio}
            />
            <Layout margin="0px auto" width="30%" layout="textLeft">
              <Preview contents={contents} preview={preview}></Preview>
            </Layout>
          </Grid>
          <Grid>
            <Input
              value="textRight"
              is_radio
              label="텍스트 오른쪽"
              name="layout"
              _onChange={changeRadio}
            />
            <Layout margin="0px auto" width="30%" layout="textRight">
              <Preview contents={contents} preview={preview}></Preview>
            </Layout>
          </Grid>
          <Grid>
            <Input
              value="textTop"
              is_radio
              label="텍스트 위쪽"
              name="layout"
              _onChange={changeRadio}
              // checked={is_edit && _post.layout === "textTop" ? true : false}
            />
            <Layout margin="0px auto" width="30%">
              <Preview contents={contents} preview={preview}></Preview>
            </Layout>
          </Grid>

          <Input
            value={contents}
            multiline
            label="게시글 내용"
            placeholder="게시물 작성"
            _onChange={changeContents}
          ></Input>
          <Grid padding="16px">
            {is_edit ? (
              <Button
                _onClick={editPost}
                disable={!checkedRadio || !contents ? true : false}
              >
                게시글 수정
              </Button>
            ) : (
              <Button
                _onClick={addPost}
                disable={!checkedRadio || !contents ? true : false}
              >
                게시글 작성
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Postwrite;
