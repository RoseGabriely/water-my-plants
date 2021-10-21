import React from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import "./css/App.css";
import styled from "styled-components";

//*Custom Components
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import PlantsList from "./components/PlantsList";
import UpdateAccount from "./components/UpdateAccount";
import PrivateRoute from "./components/PrivateRoute";
import UpdatePlant from "./components/UpdatePlant";

function App() {
  const { push } = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    push("/");
  };

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
            <StyledLink>
              <Link to="/" style={{ textDecoration: "none" }} onClick={handleLogout}>
                Logout
              </Link>
            </StyledLink>
          </StyledNav>
        </nav>
      </header>
      <Switch>
        <PrivateRoute path="/update-plant" component={UpdatePlant} />
        <PrivateRoute path="/update" component={UpdateAccount} />
        <PrivateRoute path="/plants" component={PlantsList} />
        <Route path="/sign-in">
          <Login />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

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
