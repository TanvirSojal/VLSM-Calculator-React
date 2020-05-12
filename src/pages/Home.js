import React, {Component} from 'react';
import '../styles/Home.css';

import Logo from '../components/Logo';
import Jumbotron from '../components/Jumbotron';
import IPField from '../components/IPField';
import Footer from '../components/Footer';

class Home extends Component {
    render(){
        return (
            <div>
                <Logo />
                <Jumbotron />
                <IPField />
                <Footer />
            </div>
        )
    }
}

export default Home;