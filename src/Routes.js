import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Home from './components/Home';
import { Form } from 'antd';
import Register from './components/Register';
import './components/Home.css'

const WrappedLoginForm = Form.create({ name: 'login' })(Login);
const WrappedRegistrationForm = Form.create({ name: 'register' })(Register)

export default () =>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={WrappedLoginForm} />
        <Route path="/register" exact component={WrappedRegistrationForm} />
    </Switch>;