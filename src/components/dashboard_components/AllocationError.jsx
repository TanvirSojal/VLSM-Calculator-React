import React from 'react';
const AllocationError = () => {
    return (
        <div className="container-fluid d-flex justify-content-center pt-4">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <p className="error-text">Error Occurred! Make sure you have enough IP space.</p>
                </div>
            </div>
        </div>
    )
}
export default AllocationError;