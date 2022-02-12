import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"

const GET_POST = "SET_POST"
const ADD_POST = "ADD_POST"
const EDIT_POST = "EDIT_POST"
const DELETE_POST = "DELETE_POST"

const getPost = createAction(GET_POST, (postList) => ({ postList }))
const addPost = createAction(ADD_POST, (post) => ({ post }))
const editPost = createAction(EDIT_POST, (post, postId) => ({ post, postId }))
const deletePost = createAction(DELETE_POST, (postId) => ({
  postId,
}))

const initialState = {
  list: [
    {
      postId: 1,
      userId: "user1",
      title: "title1",
      userName: "test",
      contents:
        "콘텐츠내용입니다 콘텐츠내용입니다 콘텐츠내용입니다콘텐츠내용입니다 콘텐츠내용입니다 콘텐츠내용입니다콘텐츠내용입니다 콘텐츠내용입니다 콘텐츠내용입니다콘텐츠내용입니다 콘텐츠내용입니다 콘텐츠내용입니다",
      createDate: "2022-02-11",
      deadLine: "2022-02-28",
      maxMembers: 6,
      curMembers: ["user1", "user2", "user3"],
      category: "study",
    },
    {
      postId: 2,
      userId: "user1",
      title: "user2",
      userName: "title2",
      contents:
        "콘텐츠내용입니다 콘텐츠내용입니다 콘텐츠내용입니다콘텐츠내용입니다 콘텐츠내용입니다 콘텐츠내용입니다콘텐츠내용입니다 콘텐츠내용입니다 콘텐츠내용입니다콘텐츠내용입니다 콘텐츠내용입니다 콘텐츠내용입니다",
      createDate: "2022-02-11",
      deadLine: "2022-02-20",
      maxMembers: 5,
      curMembers: ["user1", "user2"],
      category: "study",
    },
    {
      postId: 3,
      userId: "user1",
      title: "user2",
      userName: "title2",
      contents:
        "콘텐츠내용입니다 콘텐츠내용입니다 콘텐츠내용입니다콘텐츠내용입니다 콘텐츠내용입니다 콘텐츠내용입니다콘텐츠내용입니다 콘텐츠내용입니다 콘텐츠내용입니다콘텐츠내용입니다 콘텐츠내용입니다 콘텐츠내용입니다",
      createDate: "2022-02-11",
      deadLine: "2022-02-20",
      maxMembers: 3,
      curMembers: ["user2"],
      category: "study",
    },
  ],
}

const getPostFB = () => {
  return function (dispatch, getState, { history }) {}
}

const addPostFB = () => {
  return function (dispatch, getState, { history }) {}
}
const editPostFB = () => {
  return function (dispatch, getState, { history }) {}
}

const deletePostFB = () => {
  return function (dispatch, getState, { history }) {}
}

export default handleActions(
  {
    [GET_POST]: (state, action) => {
      produce(state, (draft) => {
        draft.list = action.payload.postList
      })
    },
    [ADD_POST]: (state, action) => {
      produce(state, (draft) => {})
    },
    [EDIT_POST]: (state, action) => {
      produce(state, (draft) => {})
    },
    [DELETE_POST]: (state, action) => {
      produce(state, (draft) => {})
    },
  },
  initialState
)

const actionCreators = {
  getPost,
  addPost,
  editPost,
  deletePost,
  getPostFB,
  addPostFB,
  editPostFB,
  deletePostFB,
}
export { actionCreators }
