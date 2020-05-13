import React from 'react';

const Jumbotron = () => {
    return (
        <div className="container-fluid">
            <div className="jumbotron col-md-6 offset-md-3 text-center">
                <div className="jumbotron-text">
                    Calculate Optimal Subnet Allocation For Your Networks<span style={{color: "gold"}}>.</span>
                </div>
                <div className="jumbotron-text">
                    Enter the IP that your ISP provided you in <a className ="cidr" target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing">CIDR</a> notation (a.b.c.d/mask) and hit GO to start<span style={{color: "gold"}}>.</span>
                </div>
            </div>
        </div>
    )
}

export default Jumbotron;