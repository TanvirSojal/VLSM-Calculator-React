import axios from 'axios';

class VLSMService{
    constructor() {
        this.allocationURL = "https://vlsm-calculator.herokuapp.com/api/v1/vlsm-calculator/allocation";
    }
    async getHostGroupAllocation(request){
        console.log("Query: ", request);
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