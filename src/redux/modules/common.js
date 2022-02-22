import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

const SAVE_PARAMS = "SAVE_PARAMS";

const saveParams = createAction(SAVE_PARAMS, (params) => ({
  params,
}));

const initialState = {
  params: "",
};
// 카테고리별 목록 가져오기

export default handleActions(
  {
    [SAVE_PARAMS]: (state, action) =>
      produce(state, (draft) => {
        draft.params = action.payload.params;
      }),
  },
  initialState
);

const actionCreators = {
  saveParams,
};
export { actionCreators };
