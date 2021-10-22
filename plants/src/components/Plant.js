import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { deletePlant } from "../actions";

const Plant = (props) => {
  const { plant, deletePlant } = props;
  const { push } = useHistory();

  const handleUpdate = () => {
    push("/update-plant");
  };
  const handleDelete = () => {
    deletePlant(plant.id);
  };

  return (
    <div className="plant">
      <StyledPlant>
        <h2>Plant {plant.id}</h2>
        <h3>Nickname: {plant.nickname}</h3>
        <p>Species: {plant.species}</p>
        <p>Watering Frequency: {plant.h2oFrequency}</p>
        <button onClick={handleUpdate}>Update Plant</button>{" "}
        <button onClick={handleDelete}>Delete Plant</button>
      </StyledPlant>
    </div>
  );
};
export default connect(null, { deletePlant })(Plant);

const StyledPlant = styled.div`
  background-color: #fbe7c6;
  width: 30rem;
  padding: 0.5rem;
  margin: 0.5rem;
`;
