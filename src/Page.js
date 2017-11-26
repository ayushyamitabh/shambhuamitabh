import React, {Component} from 'react';
import * as firebase from 'firebase';
import Social from './Social.js';
import './App.css';

class Page extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: 'loading',
            showIndex: null,
            showItem: false,
            share: false
        };
        this.openItem = this.openItem.bind(this);
        this.closeItem = this.closeItem.bind(this);
        this.copylink = this.copylink.bind(this);
    }
    componentWillMount() {
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
    openItem (index) {
        this.setState({
            showIndex: index,
            showItem: true
        })
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
    closeItem () {
        this.setState({
            showIndex: null,
            showItem: false
        })
    }
    render() {
        return(
            <div>
                {
                    this.state.showItem === false ?
                    <div className="app">
                        <div className="container">
                            <div className="tile page-title">
                                <h1>{this.props.type.toUpperCase()}</h1>
                                <h4>
                                    {
                                        this.props.type === 'pondering'?"I'VE BEEN PONDERING...":
                                        this.props.type === 'poetry'?"Roses are red, Violets are blue, Here's some poetry for you":
                                        this.props.type === 'prose'?"Daily dose of my prose":
                                        null
                                    }
                                </h4>
                                <h4><span onClick={()=>{this.props.changePage('home')}}>GO BACK HOME</span></h4>
                            </div>
                        </div>
                        <div className="container">
                            <div className="tile item-list">
                                {
                                    this.state.data === 'loading' ?
                                    <h4>LOADING...</h4>:
                                    <div className="items">
                                        {
                                            this.state.data.map((data, index)=>{
                                                return(
                                                    <Item open={()=>{this.openItem(index)}} key={index} data={data} />
                                                );
                                            })
                                        }
                                        <Item open={()=>{this.openItem(0)}} key={1} data={this.state.data[0]} />
                                        <Item open={()=>{this.openItem(0)}} key={2} data={this.state.data[0]} />
                                        <Item open={()=>{this.openItem(0)}} key={3} data={this.state.data[0]} />
                                        <Item open={()=>{this.openItem(0)}} key={4} data={this.state.data[0]} />
                                    </div>
                                }
                            </div>
                        </div>
                        <Social />
                    </div>:
                    <div className="app">
                        <div className="container">
                            <div className="tile full-title">
                                <h1>{this.state.data[this.state.showIndex].title}</h1>
                                <h4>
                                    <span>By {this.state.data[this.state.showIndex].by}</span>
                                    &nbsp;|&nbsp;
                                    <span>On {this.state.data[this.state.showIndex].date}</span>
                                </h4>
                            </div>
                        </div>
                        <div className="container control">
                            <div className="tile control">
                                <input onChange={()=>{null}} value={`shambhuamitabh.com/${this.props.type}/${this.state.showIndex}`} id="link" />
                                <h4>
                                    <span onClick={()=>{this.copylink()}}>
                                        {
                                            this.state.share === false ? 'SHARE' :
                                            'LINK COPIED'
                                        }
                                    </span>
                                    <span onClick={()=>{this.closeItem()}}>GO BACK</span>
                                </h4>
                            </div>
                        </div>
                        <div className="container">
                            <div className="tile full-item">
                                <img src={this.state.data[this.state.showIndex].imgsrc} />
                                <p>{this.state.data[this.state.showIndex].content}</p>
                            </div>
                        </div>
                        <Social />
                    </div>
                }
            </div>
        );
    }
}

function Item (props) {
    return (
        <div className="item" onClick={props.open}>
            <h4>{props.data.title}</h4>
            <img src={props.data.imgsrc} />
            <p>{props.data.shortdesc}</p>
        </div>
    );
}
export default Page;