import { Link, Route, Switch } from "react-router-dom";
import "./css/App.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { plantsStart } from "./actions";
import styled from "styled-components";

//*Custom Components
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import PlantsList from "./components/PlantsList";
import CreateAccount from "./components/CreateAccount";
import UpdateAccount from "./components/UpdateAccount";

function App(props) {
  useEffect(() => {
    props.plantsStart();
  }, []);

  return (
    <div className="App">
      <header>
        <nav>
          <h1>Water My Plants</h1>
          <StyledNav>
            <StyledLink>
              <Link to="/" style={{ textDecoration: "none" }}>
                Home
              </Link>
            </StyledLink>
            <StyledLink>
              <Link to="/sign-in" style={{ textDecoration: "none" }}>
                Sign In
              </Link>
            </StyledLink>
            <StyledLink>
              <Link to="/plants" style={{ textDecoration: "none" }}>
                Plants
              </Link>
            </StyledLink>
          </StyledNav>
        </nav>
      </header>
      <Switch>
        <Route path="/create-account">
          <CreateAccount/>
        </Route>
        <Route path="/update">
          <UpdateAccount />
        </Route>
        <Route path="/sign-in">
          <Login />
        </Route>
        <Route path="/plants">
          <PlantsList />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default connect(null, { plantsStart })(App);

//
const StyledNav = styled.div`
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
