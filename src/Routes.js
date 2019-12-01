import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Home from './components/Home';
import { Form } from 'antd';
import Register from './components/Register';
import './components/Home.css'
import LandingPage from './components/LandingPage';
import SearchResult from './components/SearchResult';

const WrappedLoginForm = Form.create({ name: 'login' })(Login);
const WrappedRegistrationForm = Form.create({ name: 'register' })(Register)

export default () =>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={WrappedLoginForm} />
        <Route path="/mainView" exact component={LandingPage} />
        <Route path="/register" exact component={WrappedRegistrationForm} />
        <Route path="/searchResult" exact component={SearchResult} />
    </Switch>;