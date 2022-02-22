import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

// import axios from "axios"
const GET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

const getPost = createAction(GET_POST, (postList) => ({
  postList,
}));
const addPost = createAction(ADD_POST, (post) => ({
  post,
}));
const editPost = createAction(EDIT_POST, (post, postId) => ({
  post,
  postId,
}));
const deletePost = createAction(DELETE_POST, (postId) => ({
  postId,
}));

const initialState = {
  list: [],
};
// 카테고리별 목록 가져오기
const getPostDB = () => {
  // 전체목록 가져오기
  return function (dispatch, getState, { history }) {
    instance
      .get("/post")
      .then((response) => {
        dispatch(getPost(response.data.posts));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const getOnePostDB = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/post/${postId}`)
      .then((response) => {
        dispatch(getPost([response.data.post]));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const addPostDB = (post) => {
  // 전체목록 가져오기
  return function (dispatch, getState, { history }) {
    instance
      .post("/post", post)
      .then((response) => {
        dispatch(addPost(post));
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const editPostDB = (post, postId) => {
  // 전체목록 가져오기
  return function (dispatch, getState, { history }) {
    instance
      .patch(`/post/${postId}`, post)
      .then((response) => {
        dispatch(editPost(post, postId));
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const removePostDB = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/post/${postId}`)
      .then((response) => {
        dispatch(deletePost(postId));
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.postList.reverse();
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (e) => e.postId === action.payload.postId
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),

    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(111);
        draft.list = draft.list.filter(
          (e) => e.postId !== action.payload.postId
        );
      }),
  },
  initialState
);

const actionCreators = {
  getPost,
  getOnePostDB,
  getPostDB,
  addPostDB,
  removePostDB,
  editPostDB,
};
export { actionCreators };
