import React, { useEffect } from "react";
import { plantsStart } from "../actions";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Plant from "./Plant";

const PlantsList = (props) => {
  const { push } = useHistory();
  const { plantsStart } = props;

  useEffect(() => {
    plantsStart();
  }, [plantsStart]);

  const handleClick = () => {
    push("/");
  };

  return (
    <div className="PlantsList">
      <header>
        <StyledNav>
          <StyledLink>
            <Link to="/update" style={{ textDecoration: "none" }}>
              Update Account
            </Link>
          </StyledLink>
        </StyledNav>
      </header>
      <StyledPlantsList>
        <div>
          <h2>Plants List</h2>
          {!props.isFetching &&
            props.plantsArr.map((plant) => {
              return <Plant key={plant.id} plant={plant} />;
            })}
        </div>
      </StyledPlantsList>
      <button onClick={handleClick}>Add Plant</button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    plantsArr: state.plantsArr,
    isFetching: state.isFetching,
  };
};

export default connect(mapStateToProps, { plantsStart })(PlantsList);

const StyledPlantsList = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled.div`
  padding: 0.8rem;
  margin: 0.5rem;
  text-decoration: none;
  background-color: #a0e7e5;
  transition: 0.2s;
  &:hover {
    background: #b4f8c8;
  }
`;
