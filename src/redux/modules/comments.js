import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import instance from "../../shared/Request"

const SET_COMMENT = "SET_COMMENT"
const ADD_COMMENT = "ADD_COMMENT"

const LOADING = "LOADING"

const setComment = createAction(SET_COMMENT, (postId, contentList) => ({
  postId,
  contentList,
}))
const addComment = createAction(ADD_COMMENT, (postId, content) => ({
  postId,
  content,
}))

const loading = createAction(LOADING, (is_loading) => ({ is_loading }))

const initialState = {
  list: {},
  is_loading: false,
}

const getCommentFB = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/comment/${postId}`)
      .then((response) => {
        console.log(response.data)
        dispatch(setComment(response.data.content))
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId] = action.payload.contentList
      }),
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {}),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading
      }),
  },
  initialState
)

const actionCreators = {
  getCommentFB,
  setComment,
  addComment,
}

export { actionCreators }
