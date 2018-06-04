import React, {Component} from 'react';
import {Button, Card, CardContent, Divider, IconButton, LinearProgress, Typography} from '@material-ui/core';
import ShambhuAmitabh from './res/logo.png';
import AdminIcon from '@material-ui/icons/Security';
import fb from './res/facebook.png';
import em from './res/email.png';
import ig from './res/instagram.png';
import * as firebase from 'firebase';
import './Home.css';

export default class Home extends Component{
        constructor(props){
                super(props);
                this.state = {
                        aboutMe: null
                }
        }
        componentDidMount(){
                firebase.database().ref(`about_me`).once('value').then((snap)=>{
                        if (snap.val()){
                                this.setState({
                                        aboutMe: snap.val()
                                })
                        }
                })
        }
        render() {
                return(
                        <div className="home-container" data-aos='fade-up'  >
                                <img data-aos='fade-up'  className="logo-img" src={ShambhuAmitabh}  alt="Shambhu Amitabh"/>
                                <Typography data-aos='fade-up'  data-aos-delay={150} className="name" variant="headline" > Shambhu Amitabh</Typography>
                                <div className="button-bar">
                                        <Button className="section-button" data-aos='fade-up'  data-aos-delay={300} variant="outlined" color="primary" href="/section/poetry">
                                                Poetry
                                        </Button>
                                        <Button className="section-button" data-aos='fade-up'  data-aos-delay={300} variant="outlined" color="secondary" href="/section/pondering">
                                                Pondering
                                        </Button>
                                        <Button className="section-button" data-aos='fade-up'  data-aos-delay={300} variant="outlined" color="default" href="/section/prose">
                                                Prose
                                        </Button>
                                </div>
                                <Card data-aos='fade-up'  data-aos-delay={450} className="about-me">
                                        <CardContent>
                                                <Typography variant="subheading"> 
                                                        About Me
                                                </Typography>
                                                <Divider style={{margin: '5px 0'}} />
                                                <Typography variant="body2"> 
                                                        {this.state.aboutMe?this.state.aboutMe:<LinearProgress />}
                                                </Typography>
                                        </CardContent>
                                </Card>
                                <div className="button-bar">
                                        <IconButton data-aos='fade-up'  data-aos-delay={600} data-aos-offset={1} className="social-buttons" href="https://www.facebook.com/Shambhu.Amitabh">
                                                        <img className="social-button-icons" src={fb} alt="facebook" />
                                        </IconButton>
                                        <IconButton data-aos='fade-up'  data-aos-delay={600} data-aos-offset={1} className="social-buttons" href="mailto:s_amitabh@yahoo.com">
                                                        <img className="social-button-icons" src={em} alt="email"/>
                                        </IconButton>
                                        <IconButton data-aos='fade-up'  data-aos-delay={600} data-aos-offset={1} className="social-buttons" href="https://www.instagram.com/shambhuamitabh/">
                                                        <img className="social-button-icons" src={ig} alt="instagram"/>
                                        </IconButton>
                                </div>                                
                                <div className="button-bar">
                                        <IconButton data-aos='fade-up'  data-aos-delay={750} data-aos-offset={1} className="social-buttons" href="/admin" color="secondary">
                                                <AdminIcon />
                                        </IconButton>
                                </div>
                        </div>
                );
        }
}