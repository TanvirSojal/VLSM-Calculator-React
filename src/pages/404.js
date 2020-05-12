import React, {Component} from 'react';
import '../styles/404.css';

class NotFound extends Component {
    render(){
        return (
            <div className="content">
                <p className="icon">404</p>
                <p className="message">This page does not exist!</p>
            </div>
        )
    }
}

export default NotFound;