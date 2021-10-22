import React, { useState } from "react";
import { connect } from "react-redux";
import { addPlant } from "../actions";
import { useHistory } from "react-router";

const AddPlant = (props) => {
  const { push } = useHistory();
  const initialValues = {
    nickname: "",
    species: "",
    h2oFrequency: "",
  };
  const [newPlant, setNewPlant] = useState(initialValues);
  const handleChange = (e) => {
    setNewPlant({ ...newPlant, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addPlant(newPlant);
    push("/test");
  };
  return (
    <div className="addPlant">
      <h2>Add Plant</h2>
      <form onSubmit={handleSubmit}>
        <label>
          {" "}
          Plant Nickname: <br />
          <input
            type="text"
            name="nickname"
            value={newPlant.nickname}
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
            value={newPlant.species}
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
            value={newPlant.h2oFrequency}
            onChange={handleChange}
            placeholder="Enter Watering Frequency"
          />
        </label>
        <br />
        <br />
        <button>Add Plant</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    plantsArr: state.plantsArr,
  };
};

export default connect(mapStateToProps, { addPlant })(AddPlant);
