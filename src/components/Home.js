import React from 'react';
import { Button, Layout, Menu, Breadcrumb, Input } from 'antd';
import 'antd/dist/antd.css';
import './Home.css'

const { Header, Content, Footer } = Layout;

class Home extends React.Component {
    render() {
        return (
            <Layout className="layout customLayout">
                <Header style={{background: '#fff'}}>
                    <div className="logo" style={{ float: 'left' }}>
                        <h1 style={{ color: 'black', fontSize: '32px' }}>Online doctor</h1>
                    </div>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px', float: 'right' }}
                    >
                        <Menu.Item key="1">Strona główna</Menu.Item>
                        <Menu.Item key="2">Zarejestruj się</Menu.Item>
                        <Menu.Item key="3">Zaloguj</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px', verticalAlign: 'middle'}}>
                    <Breadcrumb style={{ margin: '16px 0' }}>

                    </Breadcrumb>
                    <div className="formDiv">
                        <Input className="search" placeholder="nazwisko/specjalizacja" />
                        <Input className="search" placeholder="miasto" />
                        <Button className="searchBtn" icon="search">Search</Button>
                    </div>
                </Content>
                <Footer style={{ background: '#fff', textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

export default Home