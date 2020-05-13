import React, { Component } from 'react';
import IPUtil from '../../algorithm/IPUtil'
import { Redirect } from 'react-router-dom';

class Header extends Component{
    constructor(props){
        super(props);
        this.navigateToHome = this.navigateToHome.bind(this);
        this.state = {
            stay: true
        }
    }

    navigateToHome(e){
        return this.setState(
            {
                stay: false
            }
        )
    }
    render(){
        if (!this.state.stay){
            return <Redirect to='/' />
        }

        const {ip} = this.props;
        const totalAvailable = IPUtil.getAvailableSpace(ip);
        return(
            <div className="container-fluid">
                <div className="row header">
                    <div className="col-sm-4">
                        <button className="app-button" onClick={this.navigateToHome}>
                            <p className="app-title">SUBMAX | <span className="app-name">VLSM CALCULATOR</span></p>
                        </button>
                    </div>
                    <div className="col-sm-4">
                        <p className="header-ip">Source IP: <span style={{color: 'whitesmoke'}}>{ip}</span></p>
                    </div>
                    <div className="col-sm-4">
                        <p className="header-ip">Available IP Space: <span style={{color: 'whitesmoke'}}>{totalAvailable}</span></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;