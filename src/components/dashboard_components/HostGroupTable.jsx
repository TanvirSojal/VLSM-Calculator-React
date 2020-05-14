import React, { Component } from 'react';

// this component is not used
class HostGroupTable extends Component {
    render(){
        const rows = this.props.rows;
        console.log("From table", rows);
    
        return (
            <div>
                <div className="container-fluid">
                    <div className="row pt-5">
                        <div className="col-sm-8 offset-sm-2">
                            <table className="table table-dark result-table">
                                <thead>
                                    <tr className="result-table-head">
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Group Size</th>
                                    <th scope="col">Network Address</th>
                                    <th scope="col">Gateway Address</th>
                                    <th scope="col">Broadcast Address</th>
                                    </tr>
                                </thead>
                                <tbody className="result-table-body">
                                    {rows.map(row => {
                                        return <tr key={row.id}>
                                                <th scope="row">{row.id}</th>
                                                <td>{row.name}</td>
                                                <td>{row.groupSize}</td>
                                                <td>{row.networkAddress.addressNotation}</td>
                                                <td>{row.gatewayAddress.addressNotation}</td>
                                                <td>{row.broadcastAddress.addressNotation}</td>
                                            </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HostGroupTable;