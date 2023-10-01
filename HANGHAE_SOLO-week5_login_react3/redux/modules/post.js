import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";
// import image from "./image";
import { actionCreators as imageActions } from "./image";
// import user from "./user";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";
const DELETE_POST = "DELETE_POST";

const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};

const initialPost = {
  // user_info: {
  //   id: 0,
  //   user_name: "sangwon",
  //   user_profile:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFNOndR8Z4s9bo4Ltu2IKe6hDYCa8pUYbvUg&usqp=CAU",
  // },
  image_url: "https://i1.sndcdn.com/artworks-000565263134-tp1vxr-t500x500.jpg",
  contents: "",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
  layout: "",
};

const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    let _paging = getState().post.paging;
    if (_paging.start && !_paging.next) {
      return;
    }

    dispatch(loading(true));
    const postDB = firestore.collection("post");

    let query = postDB.orderBy("insert_dt", "desc");
    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];
        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };
        docs.forEach((doc) => {
          // console.log(doc.id, doc.data());
          let _post = doc.data();

          let post = Object.keys(_post).reduce(
            (acc, cur) => {
              if (cur.indexOf("user_") !== -1) {
                return {
                  ...acc,
                  user_info: { ...acc.user_info, [cur]: _post[cur] },
                };
              }
              return { ...acc, [cur]: _post[cur] };
            },
            { id: doc.id, user_info: {} }
          );
          post_list.push(post);
        });
        console.log(_paging.next);
        if (post_list.length > size) {
          post_list.pop();
        }
        dispatch(setPost(post_list, paging));
      });

    // postDB.get().then((docs) => {
    //   docs.forEach((doc) => {
    //     // console.log(doc.id, doc.data());
    //     let _post = doc.data();
    //     let post = Object.keys(_post).reduce(
    //       (acc, cur) => {
    //         if (cur.indexOf("user_") !== -1) {
    //           return {
    //             ...acc,
    //             user_info: { ...acc.user_info, [cur]: _post[cur] },
    //           };
    //         }
    //         return { ...acc, [cur]: _post[cur] };
    //       },
    //       { id: doc.id, user_info: {} }
    //     );
    //     post_list.push(post);
    //   });
    //   dispatch(setPost(post_list));
    // });
  };
};

const addPostFB = (contents = "", layout = "textTop") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    const _user = getState().user.user;
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
      layout: layout,
    };

    const _image = getState().image.preview;
    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload
      .then((snapshot) =>
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            // console.log(url);
            return url;
          })
          .then((url) => {
            postDB
              .add({ ...user_info, ..._post, image_url: url })
              .then((doc) => {
                let post = {
                  user_info: { ...user_info },
                  ..._post,
                  id: doc.id,
                  image_url: url,
                };
                dispatch(addPost(post));
                history.replace("/");
                dispatch(imageActions.setPreview(null));
              })
              .catch((err) => {
                window.alert("앗! 포스팅 작성에 실패했어요~");
                console.log("post 작성 실패", err);
              });
          })
      )
      .catch((err) => {
        window.alert("앗! 이미지 업로드에 문제가 있어요!");
        console.log(err);
      });
  };
};

const editPostFB = (post_id = null, post = {}, layout = "textTop") => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("정보가 없어요");
      return;
    }
    const _image = getState().image.preview;
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];
    console.log(_post);
    const postDB = firestore.collection("post");
    console.log(post);

    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update({ ...post, layout: layout })
        .then((doc) => {
          dispatch(editPost(post_id, { ...post, layout: layout }));
          history.replace("/");
        });
      return;
    } else {
      const user_id = getState().user.user.uid;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload
        .then((snapshot) =>
          snapshot.ref
            .getDownloadURL()
            .then((url) => {
              return url;
            })
            .then((url) => {
              postDB
                .doc(post_id)
                .update({ ...post, image_url: url, layout: layout })
                .then((doc) => {
                  dispatch(
                    editPost(post_id, {
                      ...post,
                      image_url: url,
                      layout: layout,
                    })
                  );
                  history.replace("/");
                  dispatch(imageActions.setPreview(null));
                })
                .catch((err) => {
                  window.alert("앗! 포스팅 작성에 실패했어요~");
                  console.log("post 작성 실패", err);
                });
            })
        )
        .catch((err) => {
          window.alert("앗! 이미지 업로드에 문제가 있어요!");
          console.log(err);
        });
    }
  };
};

const getOnePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        let _post = doc.data();
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );
        dispatch(setPost([post], { start: null, next: null, size: 3 }));
      });
  };
};

const deletePostFB = (post_id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    postDB
      .doc(post_id)
      .delete()
      .then((doc) => {
        dispatch(deletePost(post_id));
        history.replace("/");
        alert("삭제가 완료되었습니다.");
      });
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);

        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);

        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
        draft.is_loading = false;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((e) => e.id !== action.payload.post_id);
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  editPost,
  getPostFB,
  addPostFB,
  editPostFB,
  getOnePostFB,
  deletePostFB,
};
export { actionCreators };
