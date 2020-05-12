import React, {Component} from 'react';
import '../styles/Dashboard.css';

class Dashboard extends Component {

    constructor(props){
        super(props);
        this.sourceIP = this.props.location.ip;
    }
    render(){
        const ip = this.sourceIP || "";
        console.log("From Dashboard " + this.sourceIP);
        
        return (
            <div>
                <h3 style={{color: 'white'}}>Your Source IP: {ip}</h3>
            </div>
        )
    }
}

export default Dashboard;