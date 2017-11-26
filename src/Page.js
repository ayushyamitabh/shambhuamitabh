import React, { Component } from 'react';
import * as firebase from 'firebase';
import FullItem from './FullItem.js';
import Social from './Social.js';
import './App.css';

class Page extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: 'loading',
            showIndex: null,
            showItem: false
        };
        this.openItem = this.openItem.bind(this);
        this.closeItem = this.closeItem.bind(this);
    }
    componentWillMount(){
        firebase.database().ref(`${this.props.type}`).once('value',(snap)=>{
            if(snap) {
                this.setState({
                    data: snap.val()
                })
            }
            if (this.props.uid) {
                if (this.props.uid < this.state.data.length) {
                    this.setState({
                        showIndex: this.props.uid,
                        showItem: true
                    })
                }
            }
        })
    }
    openItem(index){
       this.setState({
           showIndex: index,
           showItem: true
       })
    }
    closeItem(){
        this.setState({
            showIndex: null,
            showItem: false
        })
    }
    render () {
        return (
            <div>
            {
                this.state.showItem === false ?
                <div className="App">
                    <div className="tile home pondering">
                        <h1><span>{this.props.type.toUpperCase()}</span></h1>
                        <h3><span onClick={this.props.back}>←BACK</span></h3>
                    </div>
                    <div className="tile about">
                    {
                        this.state.data === 'loading' ? 
                        <div className="pondering-content" >
                            <Item imgsrc={null} title="Loading" shortdesc="Please wait...." />
                            <Item imgsrc={null} title="Loading" shortdesc="Please wait..." />
                            <Item imgsrc={null} title="Loading" shortdesc="Please wait..." /> 
                        </div> :
                        <div className="pondering-content">
                        {
                            this.state.data.map((data, index)=>{
                                return(
                                    <Item 
                                        click={()=>{this.openItem(index)}}
                                        key={`item${index}`} 
                                        imgsrc={data.imgsrc} 
                                        title={data.title} 
                                        shortdesc={data.shortdesc} 
                                    />                                
                                );
                            })
                        }
                        </div>
                    }
                    </div>
                    <Social />
                </div> :
                <FullItem type={this.props.type} index={this.state.showIndex} back={()=>{this.closeItem()}} data={this.state.data[this.state.showIndex]} />
            }
            </div>
        );
    }
};

export default Page;

function Item (props) {
    return (
        <div className="item" onClick={props.click}>
            <div className="circ-image">
                <img src={props.imgsrc} />
            </div>
            <h3>{props.title}</h3>
            <p>{props.shortdesc}</p>
        </div>
    );
}