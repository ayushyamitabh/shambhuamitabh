import React, { Component } from 'react';
import * as firebase from 'firebase';
import Social from './Social.js';
import './App.css';

class FullItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            share:false,
            data: {
                title: '',
                date: '',
                shortdesc: '',
                imgsrc: '',
                content: '',
                by:''
            }
        };
        this.copylink = this.copylink.bind(this);
    }
    componentWillMount() {
        this.setState({
            data:this.props.data
        });
    }
    copylink() {
        var link = document.getElementById("link");
        link.select();
        document.querySelector('#link').select();
        document.execCommand('copy');
        this.setState({
            share:true
        });
        window.setTimeout(()=>{
            this.setState({
                share: false
            })
        },2000)
    }
    render () {
        return (
            <div className="App">
            <div className="top-banner">
                <input type="text" value={`https://shambhuamitabh.com/${this.props.type}/${this.props.index}`} id="link" />
                <h3>
                    <span onClick={this.copylink}>
                        {
                            this.state.share === false ? 'share' :
                            'link copied'
                        }
                    </span> 
                    <span onClick={this.props.back}>go back</span>
                </h3>
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
                <Social />
            </div> 
        );
    }
};

export default FullItem;