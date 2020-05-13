import React, {Component} from 'react';
import '../styles/Dashboard.css';
import Header from '../components/dashboard_components/Header';
import Calculator from '../components/dashboard_components/Calculator';

class Dashboard extends Component {

    constructor(props){
        super(props);
        this.sourceIP = sessionStorage.getItem("ip");
    }
    render(){
        const ip = this.sourceIP;
        console.log("From Dashboard " + this.sourceIP);
        if (ip){
            return (
                <div>
                    <Header ip={ip}/>
                    <Calculator />
                </div>
            )
        }
    }
}

export default Dashboard;