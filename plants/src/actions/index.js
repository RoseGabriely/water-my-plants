import axiosWithAuth from "../util";

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAIL = "FETCH_FAIL";
export const DELETE_PLANT = "DELETE_PLANT";
export const ADD_PLANT = "ADD_PLANT";
export const SET_CURRENT = "SET_CURRENT";
export const UPDATE_PLANT = "UPDATE_PLANT";

export const addPlantAction = (plant) => {
  return { type: ADD_PLANT, payload: plant };
};
export const fetchStart = () => {
  return { type: FETCH_START };
};
export const fetchSuccess = (plantData) => {
  return { type: FETCH_SUCCESS, payload: plantData };
};
export const fetchFail = (error) => {
  return { type: FETCH_FAIL, payload: error };
};
export const delPlant = (id) => {
  return { type: DELETE_PLANT, payload: id };
};
export const setCurrent = (plant) => {
  return { type: SET_CURRENT, payload: plant };
};
export const updateCurrentPlant = (updatedPlant) => {
  return { type: UPDATE_PLANT, payload: updatedPlant };
};

export const plantsStart = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    axiosWithAuth()
      .get("https://watergrows.herokuapp.com/api/plants")
      .then((res) => {
        dispatch(fetchSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchFail(err.response.data.message));
      });
  };
};
export const addPlant = (newPlant) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axiosWithAuth()
      .post("https://watergrows.herokuapp.com/api/plants", newPlant)
      .then((res) => {
        dispatch(addPlantAction(res.data));
      })
      .catch((err) => {
        dispatch(fetchFail(err.response.data.message));
      });
  };
};
export const deletePlant = (id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axiosWithAuth()
      .delete(`https://watergrows.herokuapp.com/api/plants/${id}`)
      .then((res) => {
        dispatch(delPlant(id));
      })
      .catch((err) => {
        dispatch(fetchFail(err.response));
      });
  };
};
export const updatePlant = (plant) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axiosWithAuth()
      .put(`https://watergrows.herokuapp.com/api/plants/${plant.id}`, plant)
      .then((res) => {
        dispatch(updateCurrentPlant(res.data));
      })
      .catch((err) => {
        dispatch(fetchFail(err.response));
      });
  };
};
