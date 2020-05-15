import React, { Component } from 'react';
import VLSMService from '../../service/VLSMService';

class UseCounter extends Component {
    constructor(props){
        super(props);
        this.state = {
            appData: false
        }
    }
    componentDidMount(){
        const vlsmService = new VLSMService();
        const promise = vlsmService.getUseCount();
        // console.log("API has been called!")
        promise.then(data => {
            // console.log("returned", data);
            this.setState({appData: data});
        });
    }
    render(){
        return (
            <div>
                {this.state.appData && (
                    <div>
                        <div className="container-fluid">
                            <div className="row pt-5">
                                <div className="col-sm-6 offset-sm-3">
                                    <table className="counter-table">
                                        <tbody>
                                            <tr>
                                                <td className="counter-table-cell">
                                                    <p className="counter">{this.state.appData.useCount}</p>
                                                </td>
                                                <td className="counter-table-cell">
                                                    <p className="counter-tagline">Successful<br />Allocation</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default UseCounter;