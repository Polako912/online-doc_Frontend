import { Form, Icon, Input, Button, Menu, Layout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import 'antd/lib/form/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/checkbox/style/css';
import './Login.css'
const { Header, Content, Footer } = Layout;

export default class Login extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout className="layout">
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
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                        style={{ width: '400px' }}
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