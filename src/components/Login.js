import { Form, Icon, Input, Button, Menu, Layout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import Auth from '../service/Auth';
import 'antd/lib/form/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/checkbox/style/css';
import './Login.css'

const { Header, Content, Footer } = Layout;

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        };

        this.handleChangeSearchValue = this.handleChangeSearchValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChangeSearchValue = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        await this.setState({
            [name]: value,
        });
    };

    onChange = e => {
        const { value } = e.target;
        this.setState({
            email: value
        });
    }

    onChangePassword = e => {
        const { value } = e.target;
        this.setState({
            password: value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        var url = 'http://onlinedocapi.eu-central-1.elasticbeanstalk.com/api/users/login';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "emailDto": this.state.email,
                "passwordDto": this.state.password
            }),
        };
        return fetch(url, requestOptions)
            .then(function (response) {
                if (response.status === 200 && response.ok) {
                    return response.json();
                }
                else {
                    alert("Failed to login");
                }
            })
            .then(function (data) {
                console.log(data);
                var obj = data;
                var almostToken = JSON.stringify(obj.token);
                var goodToken = almostToken.replace(/['"]+/g, '');
                Auth.authenticateUser(goodToken);
                window.location.href = 'http://localhost:3000/';
            })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout className="layout customLoginLayout">
                <Header style={{ background: '#fff' }}>
                    <div className="logo" style={{ float: 'left' }}>
                        <h1 style={{ color: 'black', fontSize: '32px' }}>Online doctor</h1>
                    </div>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['3']}
                        style={{ lineHeight: '64px', float: 'right' }}
                    >
                        <Menu.Item key="1"><Link to="/">Strona główna</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/register">Zarejestruj się</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/login">Zaloguj</Link></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ minHeight: '600px' }}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <div>
                            <Form.Item>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: 'Please enter your email!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="email"
                                        style={{ width: '400px' }}
                                        onChange={(e) => {
                                            this.onChange(e)
                                        }}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                        style={{ width: '400px' }}
                                        onChange={(e) => {
                                            this.onChangePassword(e)
                                        }}

                                    />,
                                )}
                            </Form.Item>
                            <Button style={{ float: 'none' }} htmlType="submit" className="login-form-button">
                                Log in
                    </Button>
                            <div>
                                Or <a href="/register">register now!</a>
                            </div>
                        </div>
                    </Form>
                </Content>
            </Layout>
        );
    }
}