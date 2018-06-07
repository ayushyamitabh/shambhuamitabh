import React, {Component} from 'react';
import {Avatar, Button, Card, Divider, IconButton, LinearProgress, Snackbar, Typography} from '@material-ui/core';
import * as firebase from 'firebase';
import ShambhuAmitabh from './res/logo.png';
import './Section.css';
export default class AdminEditSection extends Component{
        constructor(props) {
                super(props);
                this.state={
                        data: null,
                        loading: true
                };
                this.deleteEntry = this.deleteEntry.bind(this);
                this.notify = this.notify.bind(this);
                this.hideNotification = this.hideNotification.bind(this);
        }
        notify(message){
                this.setState({
                        notify: true,
                        notifyMessage: message
                })
        }
        hideNotification() {
                this.setState({
                        notify: false,
                        notifyMessage: ''
                })
        }
        componentDidMount(){
                firebase.database().ref(`${this.props.match.params.section}/`).once('value').then((snap)=>{
                        if(snap.val()){
                                this.setState({
                                        data: snap.val(),
                                        loading: false
                                })
                        }
                })
        }
        deleteEntry(key) {
                console.log(key);
                if (window.confirm('Are you sure you want to delete this entry?'))
                firebase.database().ref(`${this.props.match.params.section}/${key}`).set(null).then(()=>{
                        this.notify(`Deleted from ${this.props.match.params.section}.`);
                        window.location.reload();
                })
        }
        render() {
                return(
                        <div className="section-container" data-aos="">
                                <div style={{position: 'fixed', bottom: 0, zIndex: 100}}>
                                        <Snackbar 
                                                open={this.state.notify}
                                                message={this.state.notifyMessage}
                                                autoHideDuration={3000}
                                                onClose={this.hideNotification}
                                        />
                                </div>
                                {
                                        this.state.loading?
                                        <LinearProgress className="loading-bar"/>:
                                        null
                                }
                                <div className="section-header">
                                        <IconButton className="section-avatar" href="/" data-aos="fade-left">
                                                <Avatar src={ShambhuAmitabh} alt="Shambhu Amitabh" />
                                        </IconButton>
                                        <Typography variant="display2"  data-aos="fade-left" style={{flex:1}}>
                                               EDIT  {this.props.match.params.section.toUpperCase()}
                                        </Typography>
                                        <Button variant="outlined" href="/admin/home" color="secondary">
                                                Cancel
                                        </Button>
                                </div>
                                <Divider style={{margin:'5px 0'}}/>
                                {       this.state.data?
                                       Object.keys(this.state.data).map((key,index)=>{
                                               return(
                                                        <Card key={`item${index}`}  className="item-card"  elevation={6}>
                                                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                                                        <div style={{flex: 1}}>
                                                                                <Typography variant="subheading">{this.state.data[key].title}</Typography>
                                                                                <Typography variant="caption">{this.state.data[key].date}</Typography>
                                                                        </div>
                                                                        <Button variant="outlined" href={`/admin/edit/${this.props.match.params.section}/${key}`} size="small" style={{marginRight:7}}>
                                                                                Edit
                                                                        </Button>
                                                                        <Button variant="outlined" color="secondary" onClick={()=>{this.deleteEntry(key)}} size="small">
                                                                                Delete
                                                                        </Button>
                                                                </div>
                                                                <Divider style={{margin:5, marginBottom:5}} />
                                                                <Typography variant="caption">Short Description: {this.state.data[key].shortdesc}</Typography>
                                                        </Card>
                                               );
                                       }):null
                                }
                        </div>
                );
        }
}