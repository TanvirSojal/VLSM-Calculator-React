import axios from 'axios'

class VLSMService{
    constructor() {
        this.allocationURL = "http://vlsm-calculator.herokuapp.com/api/v1/vlsm-calculator/allocation";
    }
    getHostGroupAllocation(request){
        console.log("Query: ", request);
        const promise = this.getResponse(request);
        return promise;
        // const data =  promise.then(data => {
        //     console.log("DATA: ", data);
        //     return data;
        // });
        // console.log(typeof data);
    }

    getResponse(request){
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