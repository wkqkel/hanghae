import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

// import axios from "axios"
const ADD_COMMENT = "ADD_COMMENT";
const GET_COMMENT = "GET_COMMENT";

//2. action creators (액션 생성 함수 만들기)
const addComment = createAction(ADD_COMMENT, (id, comment) => ({
  id,
  comment,
}));
const getComment = createAction(GET_COMMENT, (comment_list) => ({
  comment_list,
}));

//3.기본 상태값을 임의로 지정해줘야해!
const initialState = {
  list: [],
};
//5. 미들웨어 부분 작성하기 (백엔드에 데이터 보내주는 작업)

//코멘트 데이터 추가하기
const addCommentDB = (comment, postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(`/comment/${postId}`, comment)
      .then((response) => {
        console.log("dddd");
        dispatch(addComment(comment, postId));
        console.log(comment);
      })
      .catch((response) => {
        console.error(response);
      });
  };
};

// 코멘트 데이터 가져오기
const getCommentDB = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/comment/${postId}`)
      .then((response) => {
        dispatch(getComment([response.data.postId]));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

//4.reducer (리덕스에 저장하는 부분)
// 카테고리별 목록 가져오기
//여기서 comment_list 는 위에 2. action creators  부분에서 가져오는것
export default handleActions(
  {
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.comment_list;
      }),
  },
  initialState
);

const actionCreators = {
  getComment,
  getCommentDB,
  addComment,
  addCommentDB,
};
export { actionCreators };
