import React from "react"

import { Grid, Text, Button, Input } from "../elements"
import styled from "styled-components"
import { history } from "../redux/configureStore"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as postActions } from "../redux/modules/post"

const PostWrite = (props) => {
  // params를 이용해 주소창 뒤의 postId값을 받아와서 여부에 따라 수정, 작성 구분
  const post_id = props.match.params.id
  const is_edit = post_id ? true : false
  const post_list = useSelector((state) => state.post.list)
  const postOne = post_list.find((p) => p.postId === post_id)
  // const post_data = post_list[post_idx];
  const dispatch = useDispatch()

  // 사용자에게 입력받아야할 값의 인풋 태그 선택
  const $title = React.useRef(null)
  const $category = React.useRef(null)
  const $contents = React.useRef(null)
  const $deadLine = React.useRef(null)
  const $maxMembers = React.useRef(null)

  React.useEffect(() => {
    // 새로고침시 리덕스 데이터가 날라갔을 때 주소창에서 postId를 받아서 하나만 다시요청
    if (!post_list.length) {
      dispatch(postActions.getOnePostDB(post_id))
    }

    //요청은 들어오는데 현재 그전에 아래 if문이 실행되기 전에 위에서 useSelect가 실행되서, 정보가 존재하지않는에러발생중
    if (is_edit && !postOne) {
      alert("포스팅정보가 존재하지않아요")
      history.replace("/")
      return
    }
    //수정모드시 인풋 디폴트값
    if (is_edit) {
      $title.current.value = postOne.title
      $contents.current.value = postOne.contents
      $deadLine.current.value = postOne.deadLine
      $maxMembers.current.value = postOne.maxMembers
    }
  }, [])

  // 오늘 날짜 YYYY-MM-DD형식으로 추출
  const offset = new Date().getTimezoneOffset() * 60000
  let todayDate = new Date(Date.now() - offset).toISOString().split("T")[0]

  // 오늘 날짜+999일 YYYY-MM-DD형식으로 추출
  const now = new Date()
  let todayPlus999 = new Date(now.setDate(now.getDate() + 999))
  todayPlus999 = todayPlus999.toISOString().split("T")[0]

  // 제출하기 버튼 클릭시 실행되는 함수

  const addPost = () => {
    // 인풋창 5개중에 미입력된 있을 시 해당 인풋창 입력 요청 알림메시지.
    let tags = [$category, $title, $contents, $deadLine, $maxMembers]
    let alert = [
      "카테고리를 선택해주세요",
      "제목을 입력해주세요",
      "본문내용을 입력해주세요",
      "마감날짜를 선택해주세요",
      "최대 인원수를 설정해주세요",
    ]
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].current.value === "") {
        window.alert(alert[i])
        return
      }
    }
    // post 스키마에 맞춰서 변수 생성_ edit여부에 따라 바뀌지않아야할 값 삼항연산자로 체크.
    let post = {
      userId: "userId",
      title: $title.current.value,
      userName: "userName",
      contents: $contents.current.value,
      createDate: is_edit ? postOne.createDate : todayDate,
      deadLine: $deadLine.current.value,
      maxMembers: $maxMembers.current.value,
      curMembers: is_edit ? postOne.curMembers : ["userName"],
      category: $category.current.value,
    }
    // is_edit여부에 따라 다른 액션함수 요청
    if (is_edit) {
      dispatch(postActions.editPostDB(post, post_id))
    } else {
      dispatch(postActions.addPostDB(post))
    }
  }

  return (
    <Container>
      <Grid margin="30px 0px">
        <Grid is_flex>
          <Category ref={$category}>
            <option value="">카테고리</option>
            <option value="스터디">스터디</option>
            <option value="투어">투어</option>
            <option value="스포츠">스포츠</option>
            <option value="반려동물">반려동물</option>
            <option value="게임/오락">게임/오락</option>
            <option value="영화/예술">영화/예술</option>
            <option value="봉사활동">봉사활동</option>
          </Category>
          <Title placeholder="제목을 입력해주세요" ref={$title}></Title>
        </Grid>
        <Grid is_flex padding="10px">
          <Text color="white" bold>
            {"userName"}
          </Text>
          <Text color="white" bold>
            {"createDate"}
          </Text>
        </Grid>
        <Contents placeholder="내용을 입력해주세요" ref={$contents}></Contents>
        <Grid is_flex>
          <Grid width="auto">
            <Grid is_flex>
              <Text>
                <DeadLine
                  type="date"
                  name="theday"
                  min={todayDate}
                  max={todayPlus999}
                  ref={$deadLine}
                ></DeadLine>
              </Text>
              <MaxMembers
                type="number"
                name="favnum"
                min="2"
                max="9"
                placeholder="참가인원선택"
                ref={$maxMembers}
              ></MaxMembers>
            </Grid>
          </Grid>
          <Grid is_flex margin="0px 5px">
            <Text></Text>
            <Button width="100px" _onClick={addPost}>
              {is_edit ? "수정하기" : "작성하기"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

PostWrite.defaultProps = {
  postId: "1",
  userId: "",
  title: "제목11",
  userName: "모미니",
  contents: "같이 스터디 하실분을 구합니다!!!",
  createDate: "2022-02-12",
  deadLine: "2022-02-28",
  maxMembers: 6,
  curMembers: 1,
  category: "스터디",
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0% 15%;
  @media only screen and (max-width: 768px) {
    padding: 0% 3%;
  }
`

const Category = styled.select`
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #9dcabf;
  color: white;
  padding: 16px 10px;
  width: 20%;
  text-align: center;
  margin-right: 3px;
  border: none;
  @media only screen and (max-width: 768px) {
    width: 30%;
  }
`

const Title = styled.input`
  box-sizing: border-box;
  border-radius: 10px;
  border: 2px solid #9dcabf;
  width: 80%;
  padding: 15px;
`

const Contents = styled.textarea`
  box-sizing: border-box;
  border-radius: 10px;
  border: 2px solid #9dcabf;
  width: 100%;
  padding: 15px;
  height: 30vh;
  resize: none;
`

const DeadLine = styled.input`
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #9dcabf;
  color: white;
  padding: 16px 10px;
  text-align: center;
  margin-right: 3px;
  border: none;
`

const MaxMembers = styled.input`
  width: 120px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #9dcabf;
  color: white;
  padding: 17px 10px;
  text-align: center;
  margin-right: 3px;
  border: none;
  &::placeholder {
    color: white;
  }
`
export default PostWrite
