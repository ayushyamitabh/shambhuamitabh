import React, {Component} from 'react';
import ShambhuAmitabh from './res/logo.png';
import './Admin.css';
import * as firebase from 'firebase';
import { Button, Card, CardContent, TextField, Snackbar } from '@material-ui/core';

export default class Admin extends Component{
        constructor(props) {
                super(props);
                this.state =  {
                        notify:false,
                        notifyMessage: ''
                };
                this.notify = this.notify.bind(this);
                this.hideNotification = this.hideNotification.bind(this);
                this.login = this.login.bind(this);
        }
        componentDidMount(){
                firebase.auth().onAuthStateChanged((user)=>{
                        if(user){
                                this.notify('Logged in...');
                                this.props.history.push("/admin/home");
                        } else {
                                
                        }
                })
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
        login(){
                const em = document.getElementById('email').value;
                const pa = document.getElementById('password').value;
                firebase.auth().signInWithEmailAndPassword(em,pa);
        }
        render() {
                return(
                        <div className="admin-home-container" data-aos="">
                                <Snackbar 
                                        open={this.state.notify}
                                        message={this.state.notifyMessage}
                                        autoHideDuration={3000}
                                        onClose={this.hideNotification}
                                />
                                <img data-aos='fade-up'  className="admin-img" src={ShambhuAmitabh}  alt="Shambhu Amitabh"/>
                                <Card style={{width:'35%', marginTop: 10}} data-aos="slide-up">
                                        <CardContent style={{display:'flex', flexDirection:'column'}}>
                                                <TextField 
                                                        className="push-down"
                                                        required
                                                        id="email"
                                                        label="E-Mail"
                                                        type="email"
                                                />
                                                <TextField 
                                                        className="push-down"
                                                        id="password"
                                                        label="Password"
                                                        type="password"
                                                        required
                                                />
                                                <Button variant="outlined" color="primary" className="push-down" onClick={this.login}>
                                                        Login
                                                </Button>
                                                <Button variant="outlined" color="secondary" className="push-down" href="/">
                                                        Go Home
                                                </Button>
                                        </CardContent>
                                </Card>
                        </div>
                );
        }
}