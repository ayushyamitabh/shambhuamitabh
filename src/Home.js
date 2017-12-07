import React, {Component} from 'react';
import './App.css';
import logo from './res/logo.png';
import Social from './Social.js';

class Home extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
        <div className="app">
            <div className="container">
                <div className="tile">
                    <img alt=''src={logo}/>
                    <h1>SHAMBHU AMITABH</h1>
                    <div className="sections">
                    <h4 onClick={()=>{this.props.changePage('pondering')}}><span>PONDERING</span> , </h4>
                    <h4 onClick={()=>{this.props.changePage('prose')}}><span>PROSE</span> , </h4>
                    <h4 onClick={()=>{this.props.changePage('poetry')}}><span>POETRY</span></h4>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="tile about">
                    <h1>ABOUT</h1>
                    <div className="line" />
                    <h4>
                    Immortalizing my pondering, prose, and poetry in Hindi & English
                    inspired by my day to day routine as a proud father, husband, and son.
                    Currently stationed in Armenia.
                    <br />
                    <br />
                    Lucky to have lived in Italy, Senegal, Nigeria, and United States of
                    America as well.
                    </h4>
                    <div className="line" />
                </div>
            </div>
            <div className="container types">
                <div className="tile types">
                    <div className="card" onClick={()=>{this.props.changePage('pondering')}}>
                        <h4>PONDERING</h4>
                    </div>
                    <div className="card" onClick={()=>{this.props.changePage('prose')}}>
                        <h4>PROSE</h4>
                    </div>
                    <div className="card" onClick={()=>{this.props.changePage('poetry')}}>
                        <h4>POETRY</h4>
                    </div>
                </div>
            </div>
            <Social />
        </div>
        );
    }
}

export default Home;