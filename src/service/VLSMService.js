import axios from 'axios'
import proxy from '../setupProxy';

class VLSMService{
    constructor() {
        this.allocationURL = "/allocation";
    }
    async getHostGroupAllocation(request){
        // console.log("Query: ", request);
        // const response = await fetch(this.allocationURL, request);
        // const data = await response.json();
        // return data;
        return axios.post(this.allocationURL, request)
            .then(response => {
                console.log("Response: ", response);
                return response.data;
            })
            .catch(error => {
                console.log("Error Occured in API!");
                return false;
            })
    }
}

export default VLSMService;