class HostGroup{
    constructor(id, name, networkAddress, gatewayAddress, broadcastAddress, groupSize){
        this.id = id;
        this.name = name;
        this.networkAddress = networkAddress;
        this.gatewayAddress = gatewayAddress;
        this.broadcastAddress = broadcastAddress;
        this.groupSize = groupSize;
    }
}

export default HostGroup;