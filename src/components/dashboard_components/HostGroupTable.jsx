import React, { Component } from 'react';

// this component is not used
class HostGroupTable extends Component {
    render(){
        const rows = this.props.rows;
        let id = 1;
        return (
            <div>
                <div className="container-fluid">
                    <div className="row pt-5">
                        <div className="col-sm-6 offset-sm-3">
                            <table className="table table-dark host-table">
                                <thead>
                                    <tr className="host-table-head">
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Size</th>
                                    </tr>
                                </thead>
                                <tbody className="host-table-body">
                                    {rows.map(row => {
                                        return <tr key={id}>
                                                <th scope="row">{id++}</th>
                                                <td>{row.groupName}</td>
                                                <td>{row.groupSize}</td>
                                            </tr>
                                    })}
                                    {/* <tr>
                                        <th scope="row">1</th>
                                        <td>My Office</td>
                                        <td>4</td>
                                    </tr> */}
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