import axios from 'axios';
require('dotenv').config();

class VLSMService {
    constructor() {
        this.allocationURL = process.env.REACT_APP_VLSM_API;
        this.useCountURL = process.env.REACT_APP_STAT_API;
    }
    async getHostGroupAllocation(request) {
        // console.log("Query: ", request);
        // const response = await fetch(this.allocationURL, request);
        // const data = await response.json();
        // return data;
        return axios.post(this.allocationURL, request)
            .then(response => {
                // console.log("Response: ", response);
                return response.data;
            })
            .catch(error => {
                // console.log("Error Occurred in API!");
                return false;
            })
    }

    async getUseCount() {
        return axios.get(this.useCountURL)
            .then(response => {
                // console.log("Response: ", response);
                return response.data;
            })
            .catch(error => {
                // console.log("Error Occurred in API!");
                return false;
            })
    }
}

export default VLSMService;