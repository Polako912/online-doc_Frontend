import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Home from './components/Home';

export default () =>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
    </Switch>;