import React from 'react';
import { Descriptions, Table } from 'antd';
import axios from 'axios';
import 'antd/lib/table/style/css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Button, Layout, Menu, Breadcrumb, Input } from 'antd';
import { Divider, Tag } from 'antd';
import { Dropdown, Icon } from 'antd';
import { DatePicker } from 'antd';

const { Header, Content, Footer } = Layout;

const { RangePicker } = DatePicker;

export default class SearchResult extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            doctros: []
        };
        this.columnsDoctors = [
            { title: 'Imię lekarza', dataIndex: 'doctorName', key: 'doctorName' },
            { title: 'Nazwisko lekarza', dataIndex: 'doctorLastName', key: 'doctorLastName' },
            { title: 'Specjalizacja', dataIndex: 'specialization', key: 'specialization' },
            {
                key: 'date', render: () => <DatePicker showTime placeholder="Wybierz datę" />
            },
            {
                key: 'operation', render: () => <a onClick={this.handleAppointment}>Umów się na wizytę</a>,
            }
        ];
        this.handleAppointment = this.handleAppointment.bind(this);
    };

    componentDidMount() {
        axios.get('http://onlinedocapi.eu-central-1.elasticbeanstalk.com/api/doctors/' + localStorage.getItem('parameter'),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                const doctros = response.data;
                this.setState({ doctros });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleAppointment = () => {

    }

    render() {
        const header = localStorage.getItem('token') ? <Header style={{ background: '#fff' }}>
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
        </Header> :
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
                    <Menu.Item key="1"><Link to="/mainView">Twoje wizyty</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/">Wyszukaj lekarza</Link></Menu.Item>
                    <Menu.Item key="3" onClick={() => { localStorage.removeItem('token') }}><Link to="/">Wyloguj się</Link></Menu.Item>
                </Menu>
            </Header>
        const { doctros } = this.state
        const doctorData = doctros.map(d => ({
            id: d.idDto,

            doctorName: d.firstNameDto,
            doctorLastName: d.lastNameDto,
            specialization: d.specializationDto,
            phoneNumber: d.phoneNumberDto
        }));
        return (
            <Layout className="layout customView">
                {header}
                <Content style={{ padding: '0 50px', verticalAlign: 'middle', justifyContent: 'center', width: '60%', margin: 'auto' }}>
                    <div>
                        <Table
                            columns={this.columnsDoctors}
                            expandedRowRender={record => <p style={{ margin: 0 }}>Numer telefonu: {record.phoneNumber}</p>}
                            dataSource={doctorData}
                        />
                    </div >
                </Content>
                <Footer style={{ background: '#fff', textAlign: 'center' }}></Footer>
            </Layout>
        )
    }
}