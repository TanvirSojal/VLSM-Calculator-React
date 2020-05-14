class IPAllocationRequest{
    constructor(sourceNetworkAddress, hostGroupRequestList){
        this.sourceNetworkAddress = sourceNetworkAddress;
        this.hostGroupRequestList = hostGroupRequestList;
    }
}

export default IPAllocationRequest;