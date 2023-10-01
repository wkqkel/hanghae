import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

// 액션 타입  정하기
const LOAD = "wordnote/LOAD";
const CREATE = "wordnote/CREATE";
const REVISE = "wordnote/REVISE";
const DELETE = "wordnote/DELETE";
const CHECK = "wordnote/CHECK";

// 초깃값 설정
const initialState = {
  list: [],
};

// 액션 생성 함수 작성
export const loadWordnote = (Word) => {
  return { type: LOAD, Word };
};

export const createWordnote = (newWord) => {
  return { type: CREATE, newWord };
};

export const reviseWordnote = (ReviseWord, ReviseIndex) => {
  return { type: REVISE, ReviseWord, ReviseIndex };
};

export const deleteWordnote = (DeleteIndex) => {
  return { type: DELETE, DeleteIndex };
};

export const checkWordnote = (checkIndex) => {
  return { type: CHECK, checkIndex };
};

//미들웨어 함수 작성
export const loadWordnoteFB = () => {
  return async function (dispatch) {
    const word_data = await getDocs(collection(db, "wordnote"));

    let word_list = [];

    word_data.forEach((e) => {
      word_list.push({ id: e.id, ...e.data() });
    });
    word_list
      .sort(function (a, b) {
        // console.log(+a["timestamp"]["nanoseconds"]);
        return +a["timestamp"]["seconds"] - +b["timestamp"]["seconds"];
      })
      .reverse();
    dispatch(loadWordnote(word_list));
  };
};

export const createWordnoteFB = (newWord) => {
  return async function (dispatch) {
    newWord = { ...newWord, timestamp: serverTimestamp() };
    const docRef = await addDoc(collection(db, "wordnote"), newWord);
    const word_data = { id: docRef.id, ...newWord };
    dispatch(createWordnote(word_data));
  };
};

export const reviseWordnoteFB = (ReviseData, ReviseId) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "wordnote", ReviseId);
    ReviseData = { id: docRef.id, ...ReviseData };
    await updateDoc(docRef, ReviseData);
    // 리덕스 수정해주기
    const _word_list = getState().Wordnote.list;
    const word_index = _word_list.findIndex((e) => {
      return e.id === ReviseId;
    });
    dispatch(reviseWordnote(ReviseData, word_index));
  };
};

export const deleteWordnoteFB = (ReviseId) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "wordnote", ReviseId);
    console.log(docRef);
    await deleteDoc(docRef);
    // 리덕스 수정해주기
    const _word_list = getState().Wordnote.list;
    const word_index = _word_list.findIndex((e) => {
      return e.id === ReviseId;
    });
    dispatch(deleteWordnote(word_index));
  };
};

// 리듀서 작성
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "wordnote/LOAD":
      return { list: action.Word };
    case "wordnote/CREATE":
      const new_Word_list = [action.newWord, ...state.list];
      // console.log(new_Word_list);
      return { list: new_Word_list };
    case "wordnote/REVISE":
      let revise_Word_list = state.list.map((e, i) => {
        return i === +action.ReviseIndex ? action.ReviseWord : e;
      });
      return { list: revise_Word_list };
    case "wordnote/DELETE":
      let deleted_Word_list = state.list.filter(
        (e, i) => i !== +action.DeleteIndex
      );
      return { list: deleted_Word_list };
    default:
      return state;
  }
}
