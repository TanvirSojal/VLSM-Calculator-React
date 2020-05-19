import Node from './../model/Node'
import Link from './../model/Link'
import Graph from './../algorithm/IPUtil'
import Topology from './../model/Topology'

class GNS3Util{
    // returns host groups from topology .gns3 file
    getHostGroups(file){
        this.processFile(file);

        return [];
    }

    // get graph of network from the gns3 savefile
    getTopology(json){
        let counter = 0;
        let marked = {};
        let typeOf = {};
        let nodeTable = {}; // dictionary to store nodes against their ids

        // get {links, nodes} attributes in an object
        const {links, nodes} = json.topology;
        
        const nodeList = [];
        const linkList = [];

        for (let i = 0; i < nodes.length; i++){
            const id = ++counter; // assigning numerical id instead of hash
            marked[nodes[i].node_id] = counter; // storing id against hash_id
            const name = nodes[i].name;
            const type = this.getNodeType(nodes[i].node_type);
            const node = new Node(counter, name, type); 
            typeOf[counter] = type; // storing type of node corresponding its id
            nodeList.push(node);

            nodeTable[id] = node;
        }
        // console.log(nodeList);

        // resetting counter for working with links
        counter = 0;

        for (let i = 0; i < links.length; i++){
            const id = ++counter;
            const node1_id = marked[ links[i].nodes[0].node_id ];
            const node2_id = marked[ links[i].nodes[1].node_id ];
            

            

            let type = "normal";
            if (typeOf[node1_id] === "router" || typeOf[node2_id] === "router"){
                type = "interface";
            }

            const node1 = nodeTable[node1_id];
            const node2 = nodeTable[node2_id];
            let name = ""; // name format Router1_0_Switch1_1 [node1Name_node1Port_node2Name_node2Port]
            if (typeOf[node1_id] === "router"){
                name = node1.name + "_" + links[i].nodes[0].port_number + "_" + node2.name + "_" + links[i].nodes[1].port_number;
            }
            else if (typeOf[node2_id] === "router"){
                name = node2.name + "_" + links[i].nodes[1].port_number + "_" + node1.name + "_" + links[i].nodes[0].port_number;
            }
            else{
                name = node1.name + "_" + links[i].nodes[0].port_number + "_" + node2.name + "_" + links[i].nodes[1].port_number;
            }

            const link = new Link(id, name, type, {node1_id, node2_id});
            linkList.push(link);
        }

        // console.log(linkList);
        this.getComponentSize(new Topology(nodeList, linkList));
    }

    // returns node type (pc, switch, router, ...)
    getNodeType(type){
        if (type.indexOf("vpcs") !== -1) return "pc";
        if (type.indexOf("switch") !== -1) return "Switch";
        if (type.indexOf("router") !== -1) return "router";
        return "node";
    }

    // run dfs/bfs to get component size
    getComponentSize(topology){
        console.log(topology);
        
    }

    processFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const contents = e.target.result;
            this.getTopology(JSON.parse(contents));
            return;
        };
        reader.readAsText(file);
    }
}

export default GNS3Util;