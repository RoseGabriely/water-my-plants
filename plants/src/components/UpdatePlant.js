import React, { useState } from "react";
import { connect } from "react-redux";
import { updatePlant, setCurrent } from "../actions";
import { useHistory } from "react-router";

const UpdatePlant = (props) => {
  const { push } = useHistory();
  const initialValues = {
    id: props.currentPlantInfo.id,
    nickname: props.currentPlantInfo.nickname,
    species: props.currentPlantInfo.species,
    h2oFrequency: props.currentPlantInfo.h2oFrequency,
  };
  const [updatedPlant, setUpdatedPlant] = useState(initialValues);

  const handleChange = (e) => {
    setUpdatedPlant({ ...updatedPlant, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.updatePlant(updatedPlant);
    props.setCurrent({
      id: null,
      nickname: "",
      species: "",
      h2oFrequency: "",
    });
    push("/plants");
  };
  return (
    <div className="updatePlant">
      <h2>Update Plant</h2>
      <form onSubmit={handleSubmit}>
        <label>
          {" "}
          Plant Nickname: <br />
          <input
            type="text"
            name="nickname"
            value={updatedPlant.nickname}
            onChange={handleChange}
            placeholder="Enter Nickname"
          />
        </label>
        <br />
        <label>
          Plant Species: <br />
          <input
            type="text"
            name="species"
            value={updatedPlant.species}
            onChange={handleChange}
            placeholder="Enter Species"
          />
        </label>
        <br />
        <label>
          Watering Frequency: <br />
          <input
            type="text"
            name="h2oFrequency"
            value={updatedPlant.h2oFrequency}
            onChange={handleChange}
            placeholder="Enter Watering Frequency"
          />
        </label>
        <br />
        <br />
        <button>Update Plant</button>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    plantsArr: state.plantsArr,
    currentPlantInfo: state.currentPlantInfo,
  };
};

export default connect(mapStateToProps, { updatePlant, setCurrent })(
  UpdatePlant
);
