import React, { Component } from 'react';
import HostGroupTable from './HostGroupTable'
import VLSMService from '../../service/VLSMService';
import IPUtil from '../../algorithm/IPUtil';
import IPAllocationRequest from '../../model/IPAllocationRequest';
import GNS3Util from '../../algorithm/GNS3Util'
import FileMaker from '../../service/FileMaker';

class HostGroupInput extends Component {

    constructor(props){
        super(props);
        this.state = {
            groupName: "",
            groupSize: "",
            hostGroups: [],
            queryResult: false,
            topologyFile: false
        }
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
        this.handleGroupSizeChange = this.handleGroupSizeChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleResetAll = this.handleResetAll.bind(this);
        this.handleAllocationRequest = this.handleAllocationRequest.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleFileSubmit = this.handleFileSubmit.bind(this);
        this.handleDownloadCSV = this.handleDownloadCSV.bind(this);
    }

    handleClearForm(e){
        this.setState({ groupName: "", groupSize: "" })
    }

    handleGroupNameChange(e){
        this.setState({ groupName: e.target.value })
    }
    handleGroupSizeChange(e){
        this.setState({ groupSize: e.target.value })
    }

    handleResetAll(e){
        this.setState({hostGroups: [], queryResult: false});
    }

    handleSubmitForm(e){
        e.preventDefault();
        // console.log("submitted");
        const id = this.state.hostGroups.length + 1;
        const name = this.state.groupName;
        const size = Number(this.state.groupSize);
        
        this.setState(prevState => ({
            hostGroups: [...prevState.hostGroups, {id, name, size}],
            queryResult: false
        }));
        // this.state.hostGroups.push({id, name, size});
        this.handleClearForm();
    }


    handleAllocationRequest(e){
        if (this.state.hostGroups.length === 0)
            return;
  
        const vlsmService = new VLSMService();
        const sourceIP = IPUtil.getIPObject(sessionStorage.getItem("ip"));
        const ipAllocationRequest = new IPAllocationRequest(sourceIP, this.state.hostGroups);
        const promise = vlsmService.getHostGroupAllocation(ipAllocationRequest);
        promise.then(data => { // this part is asynchronous
            // console.log("Query Result!", data);
            this.setState({queryResult : data});
        });   
    }

    handleUpload(e){
        const file = e.target.files[0];
        this.setState({topologyFile: file});
    }

    handleFileSubmit(e){
        const file = this.state.topologyFile;
        
        const gns3Util = new GNS3Util();
        const promise = gns3Util.getHostGroups(file, Number(this.state.hostGroups.length+1)); // get hostGroupRequestList
        promise.then(hostGroups => {
            // console.log("host groups", hostGroups);
            
            this.setState(prevState => ({
                hostGroups: [...prevState.hostGroups, ...hostGroups],
                queryResult: false
            }));
        });
        
    }

    handleDownloadCSV(e){
        if (this.state.queryResult === false)
            return;

        const fileMaker = new FileMaker();
        // method to invoke result file download
        fileMaker.downloadAsCSV(this.state.queryResult);
    }

    render(){
        const rows = this.state.hostGroups;
        let allocateButton = false;
        let hostGroupTable = false;
        let result = false;
        let downloadButton = false;
   

        if (this.state.queryResult){
            result = (
                <HostGroupTable rows={this.state.queryResult}/>
            )

            downloadButton = (
                <div className="container-fluid">
                    <div className="row pt-3 pb-4">
                        <div className="col-sm-2 offset-sm-5">
                            <button className="download-button"
                                    onClick={this.handleDownloadCSV}
                            >Download .CSV</button>
                        </div>
                    </div>
                </div>
            )
        }

        const inputField = (
            <div className="container-fluid host-form pt-5 pb-5">
                    <form onSubmit={this.handleSubmitForm}>
                        <div className="row pb-4">
                            <div className="col-sm-6 offset-sm-3">
                                <p className="form-title">Add Host Group</p>
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
                    {/* GNS3 file upload section */}
                    <div className="row pt-5">
                        <div className="col-sm-6 offset-sm-3">
                            <p className="form-title">Upload GNS3 Topology</p><span className="badge badge-warning">alpha</span>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-sm-2 offset-sm-3">
                            <input className="gns3-upload"
                                    type="file"
                                    id="fileUploader"
                                    accept=".gns3"
                                    onChange={this.handleUpload}/>
                        </div>
                        <div className="col-sm-2">
                            <button className="gns3-upload-button"
                                    onClick={this.handleFileSubmit}>⇡ upload</button>
                        </div>
                    </div>
                </div>
        )

        if (rows.length) {
            allocateButton = (
                <div className="row pt-5">
                    <div className="col-sm-4 offset-sm-4">
                        <button className="allocate-button" onClick={this.handleAllocationRequest}>Calculate Subnet Allocation</button>
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
                                    return <tr key={row.id}>
                                            <th scope="row">{row.id}</th>
                                            <td>{row.name}</td>
                                            <td>{row.size}</td>
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
                <div>
                    {result}
                </div>
                <div>
                    {downloadButton}
                </div>
            </div>
        )
    }


}

export default HostGroupInput;