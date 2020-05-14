import React, { Component } from 'react';

class HostGroupInput extends Component {

    constructor(props){
        super(props);
        this.state = {
            groupName: "",
            groupSize: "",
            hostGroups: []
        }
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
        this.handleGroupSizeChange = this.handleGroupSizeChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleResetAll = this.handleResetAll.bind(this);
    }

    handleClearForm(e){
        this.setState({ groupName: "", groupSize: "" })
    }

    handleGroupNameChange(e){
        this.setState({ groupName: e.target.value })
    }
    handleGroupSizeChange(e){
        // if (this.state.groupSize === "")
        //     this.setState({ groupSize: Number(e.target.value) })
        // else
        this.setState({ groupSize: e.target.value })
    }

    handleResetAll(e){
        this.setState({hostGroups: []});
    }

    handleSubmitForm(e){
        e.preventDefault();
        console.log("submitted");
        const groupName = this.state.groupName;
        const groupSize = this.state.groupSize;
        this.state.hostGroups.push({groupName, groupSize});
        this.handleClearForm();
    }
    render(){
        const rows = this.state.hostGroups;
        let id = 1;
        let allocateButton = undefined;
        let hostGroupTable = undefined;

        const inputField = (
            <div className="container-fluid host-form pt-5 pb-5">
                    <form onSubmit={this.handleSubmitForm}>
                        <div className="row pb-4">
                            <div className="col-sm-6 offset-sm-3">
                                <p className="form-title">+ Add Host Group</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-1 offset-sm-3">
                                <label className="input-label" htmlFor="groupName">Group Name</label>
                            </div>
                            <div className="col-sm-5">
                                <input className="input-field" id="groupName" 
                                type="text" placeholder="Office Network" 
                                onChange={this.handleGroupNameChange}
                                value={this.state.groupName}
                                required
                                />
                            </div>
                        </div>
                        <div className="row pt-2">
                            <div className="col-sm-1 offset-sm-3">
                                <label className="input-label" htmlFor="groupSize">Number of Devices</label>
                            </div>
                            <div className="col-sm-5">
                                <input type="number" className="input-field"
                                id ="groupSize" placeholder="12"
                                onChange={this.handleGroupSizeChange}
                                value={this.state.groupSize}
                                required
                                />
                            </div>
                        </div>
                        <div className="row pt-2 pt-4">
                            <div className="col-sm-1 offset-sm-4">
                                <button className="form-button add-button">+ add</button>
                            </div>
                            <div className="col-sm-1">
                            {/* cross sign: ✘, ✖ */}
                            <button type="button" className=" form-button clear-button" onClick={this.handleClearForm}>✖ clear</button>
                            </div>
                            <div className="col-sm-3">
                                <button type="button" className=" form-button reset-button" onClick={this.handleResetAll}>⟳ reset all</button>
                            </div>
                        </div>
                    </form>
                </div>
        )

        if (rows.length) {
            allocateButton = (
                <div className="row pt-5">
                    <div className="col-sm-4 offset-sm-4">
                        <button>Calculate Subnet Allocation</button>
                    </div>
                </div>
            )

            hostGroupTable = (
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
                            </tbody>
                        </table>
                    </div>
            </div>
            )
        }
        
        return (
            <div>
                <div>
                    {inputField}
                </div>
                <div>
                    {/* <HostGroupTable rows={this.state.hostGroups}/> */}
                    {hostGroupTable}
                </div>
                <div>
                    {allocateButton}
                </div>
            </div>
        )
    }


}

export default HostGroupInput;