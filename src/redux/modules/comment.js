import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

// import axios from "axios"
const ADD_COMMENT = "ADD_COMMENT";
const GET_COMMENT = "GET_COMMENT";
const REMOVE_COMMENT = "REMOVE_COMMENT";

//2. action creators (액션 생성 함수 만들기)
const addComment = createAction(ADD_COMMENT, (postId, comment) => ({
  postId,
  comment,
}));

const removeComment = createAction(REMOVE_COMMENT, (commentId) => ({
  commentId,
}));

const getComment = createAction(GET_COMMENT, (commentList) => ({
  commentList,
}));

//3.기본 상태값을 임의로 지정해줘야해!
const initialState = {
  commentList: [],
};
//5. 미들웨어 부분 작성하기 (백엔드에 데이터 보내주는 작업)

// 코멘트 데이터 서버에서 가져오기
const getCommentDB = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/comment/${postId}`)
      .then((response) => {
        console.log(response.data.comments);
        // respons.date는 서버에서 받아 올 때 쓰는거야
        //아래 addCommnetDB 부분은 프론트에서 가지고 있는 값이기 때문에 따로 respons를 사용안한거!
        dispatch(getComment(response.data.comments));
        console.log(postId);
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

//코멘트 데이터 추가하기
//addCommentDB() 안에 순서는 dispatch 함수가 일치 할 때 뒤에 괄호안에 인자도 일치시켜야함
//여기 클론코딩에서는 연결되는 부분은 CommenWrite.js에서 setAddComment에 있는 dispatch부분!
const addCommentDB = (postId, comment, userId) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(`/comment/${postId}`, comment)
      .then((response) => {
        console.log("서버에잘들어갔뉘");
        //addComment() 순서를 꼭 맞춰줘야해! 모든함수는 꼭 순서,갯수를 맞춰야해
        //2. action creators에서 addCommnet에서 가져오는 값을 꼭 가져와야하고, 그 외에 값들(userId,pastTime은...?)

        const commentBox = {
          postId: postId,
          ...comment,
          userId,
          pastTime: "방금전",
        };
        dispatch(addComment(postId, commentBox));
        console.log(commentBox);
      })
      .catch((response) => {
        console.error(response);
      });
  };
};

const removeCommentDB = (commentId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/comment/${commentId}`, commentId)
      .then((response) => {
        console.log("삭제인디요!!!!!");
        //removeComment() 순서를 꼭 맞춰줘야해! 모든함수는 꼭 순서,갯수를 맞춰야해
        //2. action creators에서 addCommnet의 부분과 같아야해

        dispatch(removeComment(commentId));
        console.log(commentId);
      })
      .catch((response) => {
        console.error(response);
      });
  };
};

//---------------------------------------------------------------------------------------------
// 수정부분 미완성
// const editPostDB = (commentId, comment) => {
//   return function (dispatch, getState, { history }) {
//     instance
//       .patch(`/comment/${commentId}`, post)
//       .then((response) => {
//         dispatch(editPost(post, postId));
//         history.push("/");
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };
// };
//---------------------------------------------------------------------------------------------

//4.reducer (리덕스에 저장하는 부분)
// 카테고리별 목록 가져오기
//여기서 commentList 는 위에 2. action creators  부분에서 가져오는것
export default handleActions(
  {
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.comment);
        draft.commentList.unshift(action.payload.comment);
      }),
    //reverse은 가져오는 데이터배열을 반대로 해주는!
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList = action.payload.commentList.reverse();
      }),

    [REMOVE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList = draft.commentList.filter(
          (c) => c.commentId !== action.payload.commentId
        );
      }),
    //---------------------------------------------------------------------------------------------
    // 수정부분 미완성
    // [EDIT_COMMENT]: (state, action) =>
    //   produce(state, (draft) => {
    //     let idx = draft.commentList.findIndex(
    //       (e) => e.commentId === action.payload.commentId
    //     );
    //     draft.commentList[idx] = {
    //       ...draft.commentList[idx],
    //       ...action.payload.comment,
    //     };
    //   }),
  },
  //---------------------------------------------------------------------------------------------

  initialState
);

const actionCreators = {
  getComment,
  getCommentDB,
  addComment,
  addCommentDB,
  removeComment,
  removeCommentDB,
};
export { actionCreators };
