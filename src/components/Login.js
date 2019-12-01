import { Form, Icon, Input, Button, Menu, Layout } from 'antd';
import React from 'react';
import 'antd/lib/form/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/checkbox/style/css';

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
                <Header>
                    <div className="logo" style={{ float: 'left' }}>
                        <h1 style={{ color: 'white', fontSize: '32px' }}>Online doctor</h1>
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px', float: 'right' }}
                    >
                        <Menu.Item key="1">Strona główna</Menu.Item>
                        <Menu.Item key="2">Zarejestruj się</Menu.Item>
                        <Menu.Item key="3">Zaloguj</Menu.Item>
                    </Menu>
                </Header>
                <Content>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vhs' }}></div>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
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
                                />,
                            )}
                        </Form.Item>
                        <Button style={{ float: 'none' }} type="primary" htmlType="submit" className="login-form-button">
                            Log in
                    </Button>
                        <div>
                            Or <a href="">register now!</a>
                        </div>
                    </Form>
                </Content>
            </Layout>
        );
    }
}