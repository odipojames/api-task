

import { SET_RECORDS} from "../actions/types";

const InitialState = {


};

const recordsReducer = (state = InitialState, actions) => {
  switch (actions.type) {
    case SET_RECORDS:
      return { ...state, records: actions.payload };

    default:
      return state;
  }
};

export default recordsReducer;
