import Node from './../model/Node'
import Link from './../model/Link'
import Topology from './../model/Topology'
import HostGroupRequest from '../model/HostGroupRequest';

class GNS3Util{
    // returns host groups from topology .gns3 file
    async getHostGroups(file){
        
        let hostGroups = [];

        const json = await this.readFileAsync(file);
        // promise.then(data => json = data)
        //        .catch(e => console.log("error occurred in file reading!"));
        // console.log(json);
        
        if (json){
            const topology = this.getTopology(json);
            hostGroups = this.computeHostGroups(topology);
        }

        return hostGroups;
    }

    // reading the file and returning promise
    readFileAsync(file) {
        return new Promise((resolve, reject) => {
            try{
                const reader = new FileReader(); 
                reader.onload = (e) => {
                    const contents = e.target.result;
                    resolve(JSON.parse(contents));
                };
                reader.readAsText(file);
            }
            catch(error){
                reject(error);
            }
        })
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

            const link = new Link(id, name, type, {node1, node2});
            linkList.push(link);
        }

        // console.log(linkList);
        return new Topology(nodeList, linkList);
    }

    // returns node type (pc, switch, router, ...)
    getNodeType(type){
        if (type.indexOf("vpcs") !== -1) return "pc"; // example: vpcs
        if (type.indexOf("switch") !== -1) return "Switch"; // example: ethernet_switch
        if (type.indexOf("dynamips") !== -1) return "router"; // this needs work
        return "node";
    }

    // run dfs/bfs to get component size
    computeHostGroups(topology){
        // console.log(topology);
        
        const {nodeList, linkList} = topology;

        // initialize graph
        let visited = {};
        let graph = [];
        const N = nodeList.length;
        for (let i = 0; i <= N; i++){
            graph[i] = [];
        }
        

        // connecting edges
        for (let i = 0; i < linkList.length; i++){
            const u = linkList[i].nodes.node1.id;
            const v = linkList[i].nodes.node2.id;

            graph[u].push(v);
            graph[v].push(u);
        }

        // console.log("Graph", graph);
        

        // bfs function to check component size
        
        const getComponentSize = (source) => {
            console.log(source);
        
            const queue = [source];
            let size = 0;
            visited[source] = 1;

            while(queue.length > 0){
                let u = queue[0];
                size++;
                queue.shift();
                console.log("current node:", u);
                
                for (let i = 0; i < graph[u].length; i++){
                    let v = graph[u][i];
                    if (visited[v]) continue;

                    visited[v] = 1;
                    queue.push(v);
                }
            }
            return size;
        }

        const hostGroups = []; // store host groups derived from the network
        let groupId = 0; // counter to assign unique id to all host groups

        for (let i = 0; i < linkList.length; i++){
            const link = linkList[i];

            // console.log(link);
            
            // handing link between router to router (size:1 + gateway:1 + broadcast:1)
            if (link.type === "interface"){

                const id = ++groupId;
                const name = link.name;
                let size = 0;                

                console.log("u: ", link.nodes.node1.id, " v:", link.nodes.node2.id);
                
                if (link.nodes.node1.type === "router" && link.nodes.node2.type === "router"){
                    visited[link.nodes.node1.id] = 1; // marking routers as visited so they don't get counted as host
                    visited[link.nodes.node2.id] = 1;
                    size = 1;
                }

                else if (link.nodes.node1.type === "router"){
                    visited[link.nodes.node1.id] = 1; // marking routers as visited so they don't get counted as host
                    size = getComponentSize(link.nodes.node2.id);
                }

                else{
                    visited[link.nodes.node2.id] = 1; // marking routers as visited so they don't get counted as host
                    size = getComponentSize(link.nodes.node1.id);
                }
    
                hostGroups.push(new HostGroupRequest(id, name, size));
            }
        }
        return hostGroups;
    }
}

export default GNS3Util;