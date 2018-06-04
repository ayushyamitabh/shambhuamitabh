import React, {Component} from 'react';
import {Avatar, Button, Card, Divider, IconButton, LinearProgress, Typography} from '@material-ui/core';
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
        render() {
                return(
                        <div className="section-container" data-aos="">
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
                                                                        <Button variant="outlined" href={`/admin/edit/${this.props.match.params.section}/${key}`}>
                                                                                Edit
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