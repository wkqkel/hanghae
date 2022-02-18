import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

// import axios from "axios"
const GET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const axios = require("axios");

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
        console.log(response.data);
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
        draft.list = action.payload.postList;
      }),
  },
  initialState
);

const actionCreators = {
  getPostDB,
};
export { actionCreators };
