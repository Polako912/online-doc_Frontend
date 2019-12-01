import React from 'react';
import { Layout, Menu, Breadcrumb, Input } from 'antd';
import 'antd/dist/antd.css';
import './Home.css'
const { Header, Content, Footer } = Layout;
const { Search } = Input;
class Home extends React.Component {
    render() {
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
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>

                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 600 }}>
                        <Search
                            className="search"
                            placeholder="specjalizacja/nazwisko"
                            onSearch={value => console.log(value)}
                        />
                        <Search
                            className="search"
                            placeholder="miasto"
                            onSearch={value => console.log(value)}
                        />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

export default Home