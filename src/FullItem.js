import React, { Component } from 'react';
import * as firebase from 'firebase';
import iglogo from './res/instagram.png';
import fblogo from './res/facebook.png';
import './App.css';

class FullItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: {
                title: '',
                date: '',
                shortdesc: '',
                imgsrc: '',
                content: '',
                by:''
            }
        };
    }
    componentWillMount() {
        this.setState({
            data:this.props.data
        });
    }
    render () {
        return (
            <div className="App">
            <div className="top-banner">
                <h3><span onClick={this.props.back}>BACK</span></h3>
            </div>
                <div className="tile home fullitem-title">
                    <h1>{this.state.data.title}</h1>
                    <h3>
                        <span>By {this.state.data.by}</span>&nbsp;|&nbsp;
                        <span>{this.state.data.date}</span>
                    </h3>
                </div>
                <div className="tile about fullitem-content">
                    <img src={this.state.data.imgsrc} />
                    <p>{this.state.data.content}</p>
                </div>
                <div className="tile social">
                    <div className="social-links">
                    <img src={iglogo}/>
                    <img src={fblogo}/>
                    <h3><span>CONTACT</span></h3>
                    </div>
                </div>
            </div> 
        );
    }
};

export default FullItem;