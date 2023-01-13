import { SET_RECORDS} from "./types";

export const setRecords = (change) => (dispatch) => {
  return dispatch({ type:SET_RECORDS, payload: change });
};
