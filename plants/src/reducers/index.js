import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  DELETE_PLANT,
  ADD_PLANT,
  SET_CURRENT,
  UPDATE_PLANT,
} from "../actions";

const initialState = {
  plantsArr: [],
  currentPlantInfo: {
    id: null,
    nickname: "",
    species: "",
    h2oFrequency: "",
  },
  isFetching: true,
  error: "",
};

//mapping plant array: (plant)=>
//action.payload.id === plant.id ? action.payload : plant

const plantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLANT:
      return {
        ...state,
        // plantsArr: action.payload,
        plantsArr: state.plantsArr.map((plant) =>
          action.payload.id === plant.id ? action.payload : plant
        ),
      };
    case SET_CURRENT:
      return {
        ...state,
        currentPlantInfo: action.payload,
      };
    case ADD_PLANT:
      return {
        ...state,
        plantsArr: [...state.plantsArr, action.payload],
      };
    case DELETE_PLANT:
      return {
        ...state,
        plantsArr: state.plantsArr.filter(
          (plant) => action.payload !== plant.id
        ),
      };
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
