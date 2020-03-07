import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router";
import { LegitContext } from "./contexts/LegitContext";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ListingPage from "./components/ListingPage";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.scss";

function App() {
  let location = useLocation();
  const [loginState, setLoginState] = useState("");
  const [id, setId] = useState("");

  return (
    <LegitContext.Provider value={{ loginState, setLoginState, id, setId }}>
      <div className="App">
        <Navigation location={location} />
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <ProtectedRoute exact path="/listings" component={ListingPage} />
        </Switch>
      </div>
    </LegitContext.Provider>
  );
}

export default App;
