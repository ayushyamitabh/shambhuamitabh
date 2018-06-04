import React, {Component} from 'react';
import './Admin.css';
import ShambhuAmitabh from './res/logo.png';
import { Avatar, Button, Card, CardHeader, CardContent,TextField,  Typography, InputLabel, LinearProgress, Snackbar } from '@material-ui/core';
import { Select, MenuItem  }from 'material-ui';
import UploadIcon from '@material-ui/icons/CloudUpload';
import Save from '@material-ui/icons/Save';
import * as firebase from 'firebase';
export default class AdminAdd extends Component{
        constructor(props){
                super(props);
                this.state={
                        eType: '',
                        id: '',
                        by: '',
                        content: ' ',
                        date: '',
                        imgsrc: '',
                        shortdesc: '',
                        title: '',
                        uploadpercent: 0,
                        uploading: true
                };
                this.uploader = this.uploader.bind(this);
                this.createItem = this.createItem.bind(this);
                this.notify = this.notify.bind(this);
                this.hideNotification = this.hideNotification.bind(this);
        }
        componentDidMount() {
                firebase.database().ref(`${this.props.match.params.section}/${this.props.match.params.id}`).once('value').then((snap)=>{
                        if(snap.val()) {
                                const data = snap.val();
                                this.setState({
                                        eType: this.props.match.params.section,
                                        id: this.props.match.params.id,
                                        by: data.by,
                                        content: data.content,
                                        date: data.date,
                                        imgsrc: data.imgsrc,
                                        shortdesc: data.shortdesc,
                                        title: data.title,
                                        uploadpercent: data.imgsrc === 'nset' ? 0 : 100,
                                        uploading: false
                                })
                        } else {
                                this.notify("Couldn't get the data for this entry.")
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
        uploader = (event) => {
                this.setState({
                        uploading: true
                })
                const file = event.target.files[0];
                if (file && this.state.uploadpercent !== 100) {
                        firebase.storage().ref(`${this.state.eType}/${file.name}`).put(file,{a:null})
                        .on('state_changed',(snapshot)=>{
                                var progress = Math.round(100 * snapshot.bytesTransferred / snapshot.totalBytes);
                                this.setState({
                                        uploadpercent: progress
                                })
                        },()=>{
                                alert('There was a problem uploading the image, please try again.');
                                this.setState({
                                        uploading: false
                                })
                        },(arg)=>{
                                firebase.storage().ref(`${this.state.eType}/${file.name}`).getDownloadURL()
                                .then((url)=>{
                                                this.setState({
                                                        imgsrc: url,
                                                        uploading: false
                                                })
                                })
                        })
                }
        }
        createItem(){
                this.setState({
                        uploading: true
                });
                if (this.state.title === '' || this.state.by === '' || this.state.content === ' ' || this.state.date === '' || this.state.shortdesc === ''){
                        this.notify("Looks like you're missing something.");
                        this.setState({
                                uploading: false
                        })
                } else {
                        const obj = {
                                by: this.state.by,
                                content: this.state.content,
                                date: this.state.date,
                                imgsrc: this.state.imgsrc,
                                shortdesc: this.state.shortdesc,
                                title: this.state.title
                        };
                        firebase.database().ref(`${this.state.eType}/${this.state.id}`).set(obj).then(()=>{
                                this.notify('Successfully added new entry.');
                                this.props.history.push('/admin/home');
                        }).catch((err)=>{
                                this.notify(err.message);
                        })
                }

        }
        render(){
                return(
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
                                        <div style={{flex:1}}>
                                                <Typography variant="subheading"> Shambhu Amitabh </Typography>
                                                <Typography variant="caption"> Add An Entry </Typography>
                                        </div>
                                        <Button variant="outlined" href="/admin/home">
                                                Cancel
                                        </Button>
                                </div>
                                <Card className="add-card push-down" data-aos="fade-up" data-aos-delay={150}>
                                        <CardHeader 
                                                title="Pick a type"
                                        />
                                        <CardContent>
                                                <InputLabel htmlFor="type">Entry Type</InputLabel>
                                                <Select
                                                        disabled={true}
                                                        id="type"
                                                        name="type"
                                                        value={this.state.eType}
                                                        onChange={(e)=>{
                                                                this.setState({
                                                                        eType: e.target.value
                                                                })
                                                        }}
                                                        fullWidth
                                                >
                                                        <MenuItem value='poetry'>Poetry</MenuItem>
                                                        <MenuItem value='pondering'>Pondering</MenuItem>
                                                        <MenuItem value='prose'>Prose</MenuItem>
                                                </Select>
                                        </CardContent>
                                </Card>
                                {
                                        this.state.eType !== '' ?
                                        <div data-aos="" style={{width:'100%', margin:0}}>
                                                <LinearProgress variant="determinate" value={this.state.uploadpercent} className="push-down" style={{width:'100%'}} data-aos="fade-up" data-aos-delay={300}/>
                                                <input
                                                        style={{display:'none'}}
                                                        accept="image/*"
                                                        id="image"
                                                        multiple={false}
                                                        type="file"
                                                        onChange={this.uploader}
                                                        disabled={this.state.uploading || this.state.uploadpercent === 100}
                                                />
                                                <label htmlFor="image" style={{width:'100%'}}>
                                                        <Button variant="outlined" component="span" fullWidth color="primary"  disabled={this.state.uploading || this.state.uploadpercent === 100}>
                                                                <UploadIcon style={{marginRight:10}} />  Upload Image
                                                        </Button>
                                                </label>
                                                <Card className="add-card push-down" data-aos="fade-up" data-aos-delay={450}>
                                                        <CardHeader 
                                                                title="Data"
                                                        />
                                                        <CardContent>
                                                                <TextField 
                                                                        disabled={this.state.uploading}
                                                                        className="push-down"
                                                                        fullWidth
                                                                        label="Title"
                                                                        required
                                                                        value={this.state.title}
                                                                        onChange={(e)=>{
                                                                                if (e.target.value.length <= 30)
                                                                                this.setState({
                                                                                        title:e.target.value
                                                                                })
                                                                        }}
                                                                        helperText={`${this.state.title.length}/30`}
                                                                />
                                                                <TextField 
                                                                        disabled={this.state.uploading}
                                                                        helperText={`${this.state.by.length}/50`}
                                                                        className="push-down"
                                                                        fullWidth
                                                                        label="By"
                                                                        required
                                                                        value={this.state.by}
                                                                        onChange={(e)=>{
                                                                                if (e.target.value.length <= 50)
                                                                                this.setState({
                                                                                        by:e.target.value
                                                                                })
                                                                        }}
                                                                />
                                                                <TextField 
                                                                        disabled={this.state.uploading}
                                                                        helperText={`${this.state.date.length}/50`}
                                                                        className="push-down"
                                                                        fullWidth
                                                                        label="Date"
                                                                        required
                                                                        value={this.state.date}
                                                                        onChange={(e)=>{
                                                                                if (e.target.value.length <= 50)
                                                                                this.setState({
                                                                                        date:e.target.value
                                                                                })
                                                                        }}
                                                                />
                                                                <TextField 
                                                                        disabled={this.state.uploading}
                                                                        helperText={`${this.state.shortdesc.length}/140`}
                                                                        className="push-down"
                                                                        fullWidth
                                                                        label="Short Description"
                                                                        required
                                                                        value={this.state.shortdesc}
                                                                        onChange={(e)=>{
                                                                                if (e.target.value.length <= 140)
                                                                                this.setState({
                                                                                        shortdesc:e.target.value
                                                                                })
                                                                        }}
                                                                />
                                                                <TextField 
                                                                        disabled={this.state.uploading}
                                                                        helperText={this.state.content.length}
                                                                        className="push-down"
                                                                        fullWidth
                                                                        label="Content"
                                                                        required
                                                                        multiline
                                                                        rows={4}
                                                                        value={this.state.content}
                                                                        onChange={(e)=>{
                                                                                this.setState({
                                                                                        content:e.target.value
                                                                                })
                                                                        }}
                                                                />
                                                        </CardContent>
                                                </Card>
                                                <Button variant="outlined" component="span" fullWidth color="secondary"  className="push-down" onClick={this.createItem}>
                                                        <Save style={{marginRight:10}} /> Save Entry
                                                </Button>
                                        </div>
                                        :null
                                }
                        </div>
                );
        }
}