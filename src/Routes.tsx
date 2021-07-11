import React from "react";
import { Switch, Route } from "react-router-dom";
import TodoPage from "./pages/Todo";
import WeatherPage from "./pages/Weather";

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <TodoPage />
    </Route>
    <Route path="/weather">
      <WeatherPage />
    </Route>
    <Route path="/dashboard">
    </Route>
  </Switch>
);
export default Routes;
