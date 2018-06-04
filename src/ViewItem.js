import React, {Component} from 'react';
import * as firebase from 'firebase';
import {Avatar, Card, Divider,ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails,  IconButton, LinearProgress, Snackbar, Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShambhuAmitabh from './res/logo.png';
import './ViewItem.css';
import ShareIcon from '@material-ui/icons/Share';
export default class ViewItem extends Component{
        constructor(props){
                super(props);
                this.state = {
                        data: null, 
                        loading: true,
                        notify: false,
                        notifyMsg: ''
                }
                console.log(this.props.match.params.section, this.props.match.params.id);
        }
        componentDidMount(){
                firebase.database().ref(`${this.props.match.params.section}/${this.props.match.params.id}`).once('value').then((snap)=>{
                        if (snap.val()){
                                this.setState({
                                        data: snap.val(), 
                                        loading: false
                                })
                        }
                })
        }
        render() {
                return( 
                        <div className="viewitem-container" data-aos="">
                                <div style={{position: 'fixed', bottom: 0, zIndex: 100}}>
                                        <Snackbar 
                                                open={this.state.notify}
                                                message={this.state.notifyMsg}
                                                autoHideDuration={3000}
                                                onClose={()=>{this.setState({notify:false, notifyMsg:''})}}
                                        />
                                </div>
                                {
                                        this.state.loading?
                                        <LinearProgress className="loading-bar"/>:
                                        null
                                }                                
                                <div className="section-header" style={{width:'100%'}}>
                                        <IconButton className="section-avatar" href="/" data-aos="fade-left">
                                                <Avatar src={ShambhuAmitabh} alt="Shambhu Amitabh" />
                                        </IconButton>
                                        <Typography variant="display2"  data-aos="fade-left" style={{flex:1}}>
                                                {this.props.match.params.section.toUpperCase()}
                                        </Typography>
                                        <Typography variant="caption"  data-aos="fade-left">Share</Typography>
                                        <IconButton style={{marginRight:5}}
                                                onClick={()=>{
                                                        const str = window.location.href;
                                                        const el = document.createElement('textarea');
                                                        el.value = str;
                                                        document.body.appendChild(el);
                                                        el.select();
                                                        document.execCommand('copy');
                                                        document.body.removeChild(el);
                                                        this.setState({
                                                                notify: true,
                                                                notifyMsg: 'Link copied'
                                                        })
                                                }}
                                        >
                                                <ShareIcon />
                                        </IconButton>
                                </div>
                                <Divider style={{margin:'5px 0'}}/>
                                {
                                        this.state.data?
                                        <div data-aos="">
                                                <Card data-aos="fade-up" className="titledate-card">
                                                        <Typography style={{textAlign: 'center'}} variant="display1">{this.state.data.title}</Typography>
                                                        <Typography style={{textAlign: 'center'}} variant="subheading">By {this.state.data.by}</Typography>
                                                        <Typography style={{textAlign: 'center'}} variant="caption">{this.state.data.date}</Typography>
                                                </Card>
                                                {
                                                        this.state.data.imgsrc !== 'nset'?
                                                                <ExpansionPanel style={{marginTop: 10}}>
                                                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                                                <Typography >Image</Typography>
                                                                        </ExpansionPanelSummary> 
                                                                        <ExpansionPanelDetails style={{display:'flex', justifyContent:'center'}}>
                                                                                <img className="content-img" src={this.state.data.imgsrc} alt="content"/>
                                                                        </ExpansionPanelDetails>
                                                                </ExpansionPanel>
                                                        :null
                                                }
                                                
                                                <Card data-aos="fade-up"  className="titledate-card">
                                                                <textarea value={this.state.data.content} disabled/>
                                                </Card>
                                        </div>
                                        :null
                                }
                        </div>
                );
        }
}