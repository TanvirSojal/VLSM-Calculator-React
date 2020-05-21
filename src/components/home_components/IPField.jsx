import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class IPField extends Component {
    constructor(props){
        super(props);
        this.state = {
            ip: "",
            redirect: false
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e){
        this.setState({ ip: e.target.value })     
    }

    handleInput(e){
        e.preventDefault();
        const {ip} = this.state;
        // console.log("From Home: " + ip);
        sessionStorage.setItem("ip", ip);
        return this.setState(
            {
                redirect: true
            }
        )
    }

    render(){
        const {redirect} = this.state;
        // go to dashboard page if redirect is set = true
        if (redirect){
            return <Redirect to={
                {
                    pathname: '/dashboard',
                    ip: this.state.ip
                }
                } />
        }
        return (
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-md-6 offset-md-3 pb-5 text-center">
                        <div className="ip-form">
                            <form onSubmit={this.handleInput} action="">
                                <div className="form-group">
                                    <input className="ip-input" type="text"
                                    pattern="^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/(3[0-2]|2[0-9]|1[0-9]|[0-9]))$"
                                    value={this.state.ip}
                                    onChange={this.handleInputChange}
                                    required="required" name="sourceIP" placeholder="e.g: 180.14.23.128/25"/>
                                </div>
                                <button className="ip-button">GO</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default IPField;