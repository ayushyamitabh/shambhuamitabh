import React, {Component} from 'react';
import {Avatar, Button, Typography, Divider, Card, CardHeader, CardContent, CardActions, Snackbar} from '@material-ui/core';
import ShambhuAmitabh from './res/logo.png';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/NoteAdd';
import * as firebase from 'firebase';
import './Admin.css';
export default class AdminHome extends Component{
        constructor(props) {
                super(props);
                this.state = {
                        aboutme: '',
                        notify: false,
                        notifyMessage: ''
                };
                this.notify = this.notify.bind(this);
                this.hideNotification = this.hideNotification.bind(this);
                this.updateAboutMe = this.updateAboutMe.bind(this);
        }
        componentDidMount(){
                firebase.auth().onAuthStateChanged((user)=>{
                        if(user){
                                firebase.database().ref("/about_me").once('value').then((snap)=>{
                                        if (snap.val()){
                                                this.setState({
                                                        aboutme: snap.val()
                                                })
                                        }
                                })
                        } else {
                                this.props.history.push("/admin");
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
        updateAboutMe(){
                firebase.database().ref('/about_me').set(this.state.aboutme).then(()=>{
                        this.notify('Updated About Me');
                })
        }
        render() {
                return (
                        <div className="admin-home-container admin-home" data-aos="">
                                <div style={{position: 'fixed', bottom: 0, zIndex: 100}}>
                                        <Snackbar 
                                                open={this.state.notify}
                                                message={this.state.notifyMessage}
                                                autoHideDuration={3000}
                                                onClose={this.hideNotification}
                                        />
                                </div>
                                <div className="admin-home-header" data-aos="fade-up">
                                        <Avatar  src={ShambhuAmitabh} style={{marginRight:20}}/>
                                        <Typography variant="display1" style={{flex:1}}> Shambhu Amitabh </Typography>
                                        <Button variant="outlined" onClick={()=>{firebase.auth().signOut();}}>
                                                logout
                                        </Button>
                                </div>
                                <Divider style={{margin: '5px 0'}} />
                                <Card className="aboutme-card" data-aos="fade-up" data-aos-delay={150}>
                                        <CardHeader 
                                                title="About Me"
                                        />
                                        <CardContent>
                                                <textarea 
                                                        value={this.state.aboutme}
                                                        onChange={(e)=>{
                                                                this.setState({
                                                                        aboutme: e.target.value
                                                                })
                                                        }}
                                                />
                                        </CardContent>
                                        <CardActions style={{justifyContent:'flex-end'}}>
                                                <Button variant="outlined" color="primary" onClick={this.updateAboutMe}>
                                                        Save
                                                </Button>
                                        </CardActions>
                                </Card>
                                
                                <div className="button-bar push-down" style={{width:'100%'}} data-aos="fade-up" data-aos-delay={300}>
                                        <Button variant="outlined" color="primary" style={{flex: 1}} onClick={()=>{this.props.history.push("/admin/add")}}>
                                                <AddIcon style={{marginRight:10}}/> 
                                                Add New Entry
                                        </Button>
                                </div>
                                <div className="button-bar push-down" style={{width:'100%', justifyContent:'center'}} data-aos="fade-up" data-aos-delay={600}>
                                        <Button variant="outlined" color="secondary" style={{margin: '0 5px', flex: 1}} onClick={()=>{this.props.history.push("/admin/edit/poetry")}}><EditIcon style={{marginRight:10}}/>Poetry</Button>
                                        <Button variant="outlined" color="secondary" style={{margin: '0 5px', flex: 1}} onClick={()=>{this.props.history.push("/admin/edit/pondering")}}><EditIcon style={{marginRight:10}}/>Pondering</Button>
                                        <Button variant="outlined" color="secondary" style={{margin: '0 5px', flex: 1}} onClick={()=>{this.props.history.push("/admin/edit/prose")}}><EditIcon style={{marginRight:10}}/>Prose</Button>
                                </div>
                        </div>
                );
        }
}