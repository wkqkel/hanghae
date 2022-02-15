import React from "react"
import { Grid, Text, Button } from "../elements"
import { useSelector, useDispatch } from "react-redux"
import { actionCreators as postActions } from "../redux/modules/post"

const JoinBtn = (props) => {
  const dispatch = useDispatch()
  const loginUserId = localStorage.getItem("loginUserId")
  const loginUserName = localStorage.getItem("loginUserName")
  let [isJoin, setIsJoin] = React.useState(false)

  React.useEffect(() => {
    let { post } = props
    if (post && post.curMembers.includes(loginUserName)) {
      setIsJoin(true)
    }
  }, [])
  let { post } = props

  const clickJoin = () => {
    // 현재 참여인원수와 최대인원수가 같으면 모집마감
    // 모집마감일 경우 현재 미참여 인원은 클릭 불가
    if (
      post.curMembers.length === post.maxMembers &&
      !post.curMembers.includes(loginUserName)
    ) {
      alert("모집이 마감되었습니다")
      return
    }

    let loginUser = { userName: loginUserName }
    // 클릭시 isJoin여부 토글 트루일때 참여취소_삭제
    setIsJoin(!isJoin)
    if (isJoin) {
      dispatch(postActions.deleteJoinDB(post.postId, loginUser))
    } else {
      dispatch(postActions.addJoinDB(post.postId, loginUser))
    }
  }
  return (
    <>
      <Button width="100px" _onClick={clickJoin}>
        {post &&
        post.curMembers.length === post.maxMembers &&
        !post.curMembers.includes(loginUserName)
          ? "마감완료"
          : isJoin
          ? "참여취소"
          : "참여하기"}
      </Button>
    </>
  )
}

export default JoinBtn
