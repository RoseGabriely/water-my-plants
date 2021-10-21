import { FETCH_START, FETCH_SUCCESS, FETCH_FAIL } from "../actions";

const initialState = {
  plantsArr: [],
  isFetching: true,
  error: "",
};

const plantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        isFetching: true,
        error: "",
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        plantsArr: action.payload,
        isFetching: false,
        error: "",
      };
    case FETCH_FAIL:
      return {
        ...state,
        plantsArr: [],
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default plantsReducer;
