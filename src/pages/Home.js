import React, {Component} from 'react';
import '../styles/Home.css';

import Logo from '../components/home_components/Logo';
import Jumbotron from '../components/home_components/Jumbotron';
import IPField from '../components/home_components/IPField';
import Footer from '../components/home_components/Footer';
import UseCounter from '../components/home_components/UseCounter';

class Home extends Component {
    render(){
        return (
            <div className="page-container">
                <div className="content-wrap">
                    <Logo />
                    <Jumbotron />
                    <IPField />
                    <UseCounter />
                </div>
                <Footer />
            </div>
        )
    }
}

export default Home;