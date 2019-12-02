import React from 'react';
import { Descriptions, Table } from 'antd';
import 'antd/lib/table/style/css';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Button, Layout, Menu, Breadcrumb, Input } from 'antd';
import Auth from '../service/Auth';

const { Header, Content, Footer } = Layout;

const columnsAppointments = [
    { title: 'Imię lekarza', dataIndex: 'doctorName', key: 'doctorName' },
    { title: 'Nazwisko lekarza', dataIndex: 'doctorLastName', key: 'doctorLastName' },
    { title: 'Specjalizacja', dataIndex: 'specialization', key: 'specialization' },
    { title: 'Data', dataIndex: 'date', key: 'date' },
    { title: 'Adres', dataIndex: 'address', key: 'address' },
    { title: 'Godzina', dataIndex: 'hour', key: 'hour' }
];

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            appointments: [],
            regexDate: new RegExp(/\d{4}-\d{2}-\d{2}[T]/),
            regexTime: new RegExp(/[T]\d{2}:\d{2}:\d{2}/)
        }
    };

    componentDidMount() {
        axios.get('http://onlinedocapi.eu-central-1.elasticbeanstalk.com/api/appointments',
            {
                headers: {
                    'Authorization': `Bearer ${Auth.getToken()}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                const appointments = response.data;
                this.setState({ appointments });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { appointments } = this.state
        const appointmentData = appointments.map(a => ({
            doctorName: a.doctorDto.firstNameDto,
            doctorLastName: a.doctorDto.lastNameDto,
            specialization: a.doctorDto.specializationDto,
            date: (a.dateDto.replace(this.state.regexTime, '')),
            address: a.locationDto.streetNameDto + " " + a.locationDto.streetNumberDto + "/" + a.locationDto.officeNumberDto + " " + a.locationDto.cityDto + " " + a.locationDto.zipCodeDto,
            hour: (a.dateDto.replace(this.state.regexDate, ''))
        }));
        return (
            <Layout className="layout customView">
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
                        <Menu.Item key="3"><Link to="/login">Wyloguj się</Link></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px', verticalAlign: 'middle', justifyContent: 'center', width: '60%', margin: 'auto' }}>
                    <div>
                        <Table
                            columns={columnsAppointments}
                            dataSource={appointmentData}
                        />
                    </div >
                </Content>
                <Footer style={{ background: '#fff', textAlign: 'center' }}></Footer>
            </Layout>
        )
    }
}