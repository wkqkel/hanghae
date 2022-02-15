import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import instance from "../../shared/Request"

//Action Types
const SET_COMMENT = "SET_COMMENT"
const ADD_COMMENT = "ADD_COMMENT"
const DELETE_COMMENT = "DELETE_COMMENT"
const LOADING = "LOADING"

//Action Creators
const setComment = createAction(SET_COMMENT, (postId, contentList) => ({
  postId,
  contentList,
}))
const addComment = createAction(ADD_COMMENT, (postId, content) => ({
  postId,
  content,
}))
const deleteComment = createAction(DELETE_COMMENT, (postId, commentId) => ({
  postId,
  commentId,
}))

const loading = createAction(LOADING, (is_loading) => ({ is_loading }))

const initialState = {
  list: {},
  is_loading: false,
}

//댓글 조회
const getCommentFB = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/comment/${postId}`)
      .then((response) => {
        console.log(response.data)
        dispatch(setComment(postId, response.data.comments))
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

//댓글 추가
const addCommentDB = (postId, content) => {
  console.log(postId, content)
  return function (dispatch, getState, { history }) {
    instance
      .post(`/comment/${postId}`, content)
      .then((response) => {
        dispatch(addComment(postId, content))
      })
      .catch((error) => {
        console.log(error)
      })
      .then(() => {
        dispatch(getCommentFB(postId))
      })
  }
}

//댓글 삭제
const deleteCommentDB = (postId, commentId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/comment/delete/${commentId}`)
      .then(() => {
        window.alert("댓글 삭제가 완료되었습니다")
        dispatch(deleteComment(postId, commentId))
      })
      .catch((error) => {
        console.error(error)
      })
      .then(() => {
        dispatch(getCommentFB(postId))
      })
  }
}
export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId] = action.payload.contentList.reverse()
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId].unshift(action.payload.content)
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId].filter(
          (c, i) => c.commentId !== action.payload.commentId
        )
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading
      }),
  },
  initialState
)

const actionCreators = {
  getCommentFB,
  addCommentDB,
  setComment,
  addComment,
  deleteComment,
  deleteCommentDB,
}

export { actionCreators }
