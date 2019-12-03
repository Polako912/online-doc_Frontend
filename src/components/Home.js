import React from 'react';
import { Button, Layout, Menu, Breadcrumb, Input } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import 'antd/lib/message/style/css';
import { message } from 'antd';
import 'antd/dist/antd.css';
import './Home.css'

const { Header, Content, Footer } = Layout;

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            parameter: '',
            city: ''
        };
        this.handleChangeSearchValue = this.handleChangeSearchValue.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
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
            parameter: value
        });
    }

    onChangeCity = e => {
        const { value } = e.target;
        this.setState({
            city: value
        });
    }

    handleSearch = () => {
        localStorage.removeItem('parameter')
        localStorage.removeItem('city')
        if (this.state.parameter != '') {
            localStorage.setItem('parameter', this.state.parameter)
            localStorage.setItem('city', this.state.city)
            window.location.href = 'http://localhost:3000/searchResult'
        }
        else {
            message.info("Wyszukiwana fraza nie może być pusta")
        }
    }

    render() {
        return (
            <Layout className="layout customLayout">
                <Header style={{ background: '#fff' }}>
                    <div className="logo" style={{ float: 'left' }}>
                        <h1 style={{ color: 'black', fontSize: '32px' }}>Online doctor</h1>
                    </div>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px', float: 'right' }}
                    >
                        <Menu.Item key="1"><Link to="/">Strona główna</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/register">Zarejestruj się</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/login">Zaloguj</Link></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px', verticalAlign: 'middle' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>

                    </Breadcrumb>
                    <div className="formDiv">
                        <Input className="search"
                            placeholder="nazwisko/specjalizacja"
                            onChange={(e) => {
                                this.onChange(e)
                            }} />
                        <Input className="search"
                            placeholder="miasto"
                            onChange={(e) => {
                                this.onChangeCity(e)
                            }} />
                        <Button className="searchBtn" icon="search" onClick={this.handleSearch}>Search</Button>
                    </div>
                </Content>
                <Footer style={{ background: '#fff', textAlign: 'center' }}></Footer>
            </Layout>
        )
    }
}

export default Home