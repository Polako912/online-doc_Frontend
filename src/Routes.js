import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Home from './components/Home';
import { Form } from 'antd';

const WrappedRegistrationForm = Form.create({ name: 'register' })(Login);

export default () =>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={WrappedRegistrationForm} />
    </Switch>;