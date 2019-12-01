import { Form, Icon, Input, Button, Menu, Layout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import 'antd/lib/form/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/checkbox/style/css';
import './Register.css'

const { Header, Content, Footer } = Layout;

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: ''
        };

        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeFirstName = e => {
        const { value } = e.target;
        this.setState({
            firstName: value
        });
    }

    handleChangeLastName = e => {
        const { value } = e.target;
        this.setState({
            lastName: value
        });
    }

    handleChangePhone = e => {
        const { value } = e.target;
        this.setState({
            phoneNumber: value
        });
    }

    handleChangeEmail = e => {
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
        var url = 'http://onlinedocapi.eu-central-1.elasticbeanstalk.com/api/users/register';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "firstNameDto": this.state.firstName,
                "lastNameDto": this.state.lastName,
                "emailDto": this.state.email,
                "phoneNumberDto": this.state.phoneNumber,
                "passwordDto": this.state.password
            }),
        };
        return fetch(url, requestOptions)
            .then(function (response) {
                if (response.status === 200) {
                    return 'Ok';
                }
                else {
                    alert("Failed to register");
                }
            })
            .then(function (data) {
                console.log(data);
                window.location.href = 'http://localhost:3000/login';
            })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout className="layout customRegisterLayout">
                <Header style={{ background: '#fff' }}>
                    <div className="logo" style={{ float: 'left' }}>
                        <h1 style={{ color: 'black', fontSize: '32px' }}>Online doctor</h1>
                    </div>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px', float: 'right' }}
                    >
                        <Menu.Item key="1"><Link to="/">Strona główna</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/register">Zarejestruj się</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/login">Zaloguj</Link></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ minHeight: '600px' }}>
                    <Form onSubmit={this.handleSubmit} className="register-form">
                        <div>
                            <Form.Item>
                                {getFieldDecorator('firstName', {
                                    rules: [{ required: true, message: 'Please enter your first name!' }],
                                })(
                                    <Input
                                        placeholder="First name"
                                        style={{ width: '400px' }}
                                        onChange={(e) => {
                                            this.handleChangeFirstName(e)
                                        }}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('lastName', {
                                    rules: [{ required: true, message: 'Please enter your last name!' }],
                                })(
                                    <Input
                                        placeholder="Last name"
                                        style={{ width: '400px' }}
                                        onChange={(e) => {
                                            this.handleChangeLastName(e)
                                        }}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('phoneNumber', {
                                    rules: [{ required: true, message: 'Please enter your phone number!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Phone number"
                                        style={{ width: '400px' }}
                                        onChange={(e) => {
                                            this.handleChangePhone(e)
                                        }}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: 'Please input your email!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Email"
                                        style={{ width: '400px' }}
                                        onChange={(e) => {
                                            this.handleChangeEmail(e)
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
                            <Button style={{ float: 'none' }} htmlType="submit">
                                Register
                            </Button>
                        </div>
                    </Form>
                </Content>
            </Layout>
        );
    }
}