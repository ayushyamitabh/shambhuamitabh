import React, {Component} from 'react';
import {Avatar,Button, Card, Typography} from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';
import './NotFound.css';
import ShambhuAmitabh from './res/logo.png';
export default class NotFound extends Component{
        render(){
                return(
                        <div className="notfound-container" data-aos="">
                                <Avatar src={ShambhuAmitabh} alt="Shambhu Amitabh" className="notfound-avatar"/>
                                <Card className="notfound-card" elevation={10}>
                                        <Typography variant="headline">Oops...</Typography>
                                        <Typography variant="subheading">Looks like that page doesn't exist</Typography>
                                </Card>
                                <Button style={{marginTop:10}} variant="outlined" color="primary" href="/">
                                       <BackIcon style={{marginRight:10}}/> Go Back
                                </Button>
                        </div>
                );
        }
}