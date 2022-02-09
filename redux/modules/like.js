import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import { actionCreators as postActions } from "./post";
import firebase from "firebase/compat/app";

const GET_LIKE = "GET_LIKE";
const ADD_LIKE = "ADD_LIKE";
const DELETE_LIKE = "DELETE_LIKE";

const getLike = createAction(GET_LIKE, (like_list, user_id) => ({
  like_list,
  user_id,
}));
const addLike = createAction(ADD_LIKE, (post_id, user_id) => ({
  post_id,
  user_id,
}));
const deleteLike = createAction(DELETE_LIKE, (post_id, user_id) => ({
  post_id,
  user_id,
}));

const initialState = {
  list: {},
};
const getLikeFB = () => {
  return function (dispatch, getState, { history }) {
    const user_id = getState().user.user.uid;

    const likeDB = firestore.collection("like");
    likeDB
      .where("user_id", "==", user_id)
      .get()
      .then((docs) => {
        let list = [];
        docs.forEach((doc) => {
          let post_id = doc.data().post_id;
          list.push(post_id);
        });
        dispatch(getLike(list, user_id));
      });
  };
};
const addLikeFB = (post_id) => {
  return function (dispatch, getState, { history }) {
    const likeDB = firestore.collection("like");
    const user_id = getState().user.user.uid;
    const _likeDB = { post_id: post_id, user_id: user_id };
    likeDB.add(_likeDB).then(() => {
      const postDB = firestore.collection("post");
      const increment = firebase.firestore.FieldValue.increment(1);
      postDB
        .doc(post_id)
        .update({ like_cnt: increment })
        .then((_post) => {
          // 리덕스의 라이크에도 포스트목록 추가
          dispatch(addLike(post_id, user_id));
          // 리덕스의 포스트도 like_cnt+=1
          const post = getState().post.list.find((e) => e.id === post_id);
          // if (post) {
          dispatch(
            postActions.editPost(post_id, {
              like_cnt: parseInt(post.like_cnt) + 1,
            })
          );
          // }
        });
    });
  };
};

const deleteLikeFB = (post_id) => {
  return function (dispatch, getState, { history }) {
    const user_id = getState().user.user.uid;
    const likeDB = firestore.collection("like");
    likeDB
      .where("user_id", "==", user_id)
      .where("post_id", "==", post_id)
      .get()
      .then((docs) => {
        let delete_id = "";
        docs.forEach((doc) => {
          delete_id = doc.id;
        });
        likeDB.doc(delete_id).delete();
        const postDB = firestore.collection("post");
        const increment = firebase.firestore.FieldValue.increment(-1);
        console.log(post_id);
        postDB
          .doc(post_id)
          .update({ like_cnt: increment })
          .then((_post) => {
            // 리덕스의 포스트도 like_cnt+=1
            const post = getState().post.list.find((e) => e.id === post_id);
            // if (post) {
            dispatch(
              postActions.editPost(post_id, {
                like_cnt: parseInt(post.like_cnt) - 1,
              })
            );
            // }
            dispatch(deleteLike(post_id, user_id));
          });
      });
  };
};

export default handleActions(
  {
    [GET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.user_id] = action.payload.like_list;
      }),
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        if (!draft.list[action.payload.user_id]) {
          draft.list[action.payload.user_id] = [action.payload.post_id];
        } else {
          draft.list[action.payload.user_id].push(action.payload.post_id);
        }
      }),
    [DELETE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        // draft.list = draft.list[action.payload.user_id].filter(
        //   (e) => e !== action.payload.post_id
        // );
        draft.list = {
          [action.payload.user_id]: draft.list[action.payload.user_id].filter(
            (e) => e !== action.payload.post_id
          ),
        };
      }),
  },
  initialState
);

const actionCreators = {
  getLikeFB,
  addLikeFB,
  deleteLikeFB,
};
export { actionCreators };
