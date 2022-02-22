import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

const GET_LIKE = "SET_LIKE";
const ADD_LIKE = "ADD_LIKE";
const DELETE_LIKE = "DELETE_LIKE";

const getLike = createAction(GET_LIKE, (postList) => ({ postList }));
const addLike = createAction(ADD_LIKE, (postId) => ({ postId }));
const deleteLike = createAction(DELETE_LIKE, (postId) => ({ postId }));

const initialState = {
  list: [],
};

const getLikeDB = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/like`)
      .then((response) => {
        dispatch(getLike(response.data.list.map((e) => e.postId)));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
const addLikeDB = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(`/like/${postId}`)
      .then((response) => {
        dispatch(addLike(postId));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
const deleteLikeDB = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/like/${postId}`)
      .then((response) => {
        dispatch(deleteLike(postId));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export default handleActions(
  {
    [GET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.postList;
      }),
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.postId);
      }),
    [DELETE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        let Idx = draft.list.findIndex((e) => e === action.payload.postId);
        draft.list = draft.list.filter((e) => e !== action.payload.postId);
      }),
  },
  initialState
);

const actionCreators = {
  getLikeDB,
  addLikeDB,
  deleteLikeDB,
};
export { actionCreators };
