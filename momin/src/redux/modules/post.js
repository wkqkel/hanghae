import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import instance from "../../shared/Request"
import {
  ConsoleCat,
  ConsoleWelcome,
  ConsoleWelcomeCss,
} from "../../shared/ConsoleCss"

// import axios from "axios"
const GET_POST = "SET_POST"
const ADD_POST = "ADD_POST"
const EDIT_POST = "EDIT_POST"
const DELETE_POST = "DELETE_POST"
const axios = require("axios")

const getPost = createAction(GET_POST, (postList, checkLoadAll) => ({
  postList,
  checkLoadAll,
}))
const addPost = createAction(ADD_POST, (post, checkLoadAll) => ({
  post,
  checkLoadAll,
}))
const editPost = createAction(EDIT_POST, (post, postId, isPush) => ({
  post,
  postId,
  isPush,
}))
const deletePost = createAction(DELETE_POST, (postId) => ({
  postId,
}))

const initialState = {
  list: [],
  is_loaded: false,
}
// 카테고리별 목록 가져오기
const getPostDB = (category) => {
  if (category) {
    return function (dispatch, getState, { history }) {
      axios
        .get(`http://13.125.190.53/post?category=${category}`)
        .then((response) => {
          // [{},{}]와 같은 배열형태로 디스패치 넘겨줌
          dispatch(getPost(response.data.post, false))
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
  // 전체목록 가져오기
  return function (dispatch, getState, { history }) {
    instance
      .get("/post")
      .then((response) => {
        // [{},{}]와 같은 배열형태로 디스패치 넘겨줌
        dispatch(getPost(response.data.post, true))
        console.log(ConsoleCat)
        console.log(ConsoleWelcome, ConsoleWelcomeCss)
        console.log("https://github.com/borobong2/FE_momin")
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

//게시물 1개 가져오기
const getOnePostDB = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/post/${postId}`)
      .then((response) => {
        dispatch(getPost(response.data.post))
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
//게시물 작성
const addPostDB = (post) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/post", post)
      .then((response) => {
        dispatch(addPost(post))
        window.alert("작성이 완료되었습니다")
        history.push("/")
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

//게시물 수정
const editPostDB = (post, postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .patch(`/post/modify/${postId}`, post)
      .then((response) => {
        window.alert("수정이 완료되었습니다")
        history.replace("/")
        dispatch(editPost(post, postId))
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

//게시물 삭제
const deletePostDB = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/post/delete/${postId}`)
      // axios
      //   .delete(`http://13.125.190.53/delete/${postId}`)
      .then((response) => {
        window.alert("삭제가 완료되었습니다")
        dispatch(deletePost(postId))
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

//참여하기
const addJoinDB = (postId, loginUserNameArray) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(`/post/join/${postId}`, loginUserNameArray)
      .then((response) => {
        dispatch(editPost(loginUserNameArray, postId, true))
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

//참여취소
const deleteJoinDB = (postId, loginUserNameArray) => {
  return function (dispatch, getState, { history }) {
    instance
      .patch(`/post/join/${postId}`, loginUserNameArray)
      .then((response) => {
        dispatch(editPost(loginUserNameArray, postId, false))
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.postList.reverse()
        draft.checkLoadAll = action.payload.checkLoadAll
        draft.is_loaded = true
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post)
        draft.is_loaded = true
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (e) => e.postId === action.payload.postId
        )
        if (action.payload.isPush) {
          draft.list[idx].curMembers.push(action.payload.post.userName)
          draft.is_loaded = true
        } else {
          draft.list[idx].curMembers = draft.list[idx].curMembers.filter(
            (e) => e !== action.payload.post.userName
          )
          draft.is_loaded = true
        }
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter(
          (e, i) => e.postId !== action.payload.postId
        )
        draft.is_loaded = true
      }),
  },
  initialState
)

const actionCreators = {
  getPost,
  addPost,
  editPost,
  deletePost,
  getPostDB,
  getOnePostDB,
  addPostDB,
  editPostDB,
  deletePostDB,
  addJoinDB,
  deleteJoinDB,
}
export { actionCreators }
