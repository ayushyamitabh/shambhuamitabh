import React, {Component} from 'react';
import * as firebase from 'firebase';
import Social from './Social.js';
import './App.css';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pass: '',
            loggedin: false,
            type: false,
            uploadpercent: 0,
            adding: false,
            title: '',
            by: '',
            date: '',
            content: '',
            imgsrc: 'nset',
            filename: '',
            shortdesc: ''
        };
        this.login = this.login.bind(this);
        this.createItem = this.createItem.bind(this);
    }
    componentWillMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                this.setState({
                    loggedin: true
                })
            } else {
                this.setState({
                    loggedin: false
                })
            }
        })
    }
    login() {
        firebase.auth().signInWithEmailAndPassword("s_amitabh@yahoo.com",this.state.pass)
        .then(()=>{
            this.setState({
                loggedin: true
            })
        })
    }
    createItem() {
        this.setState({
            adding:true
        });
        var obj = {
            by: this.state.by,
            content: this.state.content,
            date: this.state.date,
            imgsrc: this.state.imgsrc,
            shortdesc: this.state.shortdesc,
            title: this.state.title
        };
        firebase.database().ref(`${this.state.type}`).once('value',(snap)=>{
            var existing = snap.val();
            existing.unshift(obj);
            firebase.database().ref(`${this.state.type}`).update(existing).then(()=>{
                this.setState({
                    type: false,
                    title: '',
                    by: '',
                    date: '',
                    content: '',
                    imgsrc: 'nset',
                    shortdesc: ''
                })
            })
        })
    }
    uploader = (event) => {
        const file = event.target.files[0];
        firebase.storage().ref(`${this.state.type}/${file.name}`).put(file,{a:null})
        .on('state_changed',(snapshot)=>{
            var progress = Math.round(100 * snapshot.bytesTransferred / snapshot.totalBytes);
            this.setState({
                uploadpercent: progress
            })
        },()=>{
           alert('There was a problem uploading the image, please try again.');
        },(arg)=>{
            firebase.storage().ref(`${this.state.type}/${file.name}`).getDownloadURL()
            .then((url)=>{
                this.setState({
                    imgsrc: url,
                    filename: file.name
                })
            })
        })
    };
    render () {
        return (
            <div className="App">
                <div className="tile home admin">
                    <h1>WELCOME, SHAMBHU!</h1>
                    {
                        this.state.loggedin === true ?
                        <h3><span onClick={()=>{firebase.auth().signOut()}}>LOGOUT</span></h3>:
                        null
                    }
                </div>
                <div className="tile about password">
                {
                    this.state.loggedin === true ?
                    <div>
                    {
                        this.state.type === false ?
                        <div className="portal">
                            <h3>WHAT DO YOU WANT TO ADD?</h3>
                            <div className="types">
                                <h3><span onClick={()=>{this.setState({type:'pondering'})}}>PONDERING</span></h3>
                                <h3><span onClick={()=>{this.setState({type:'prose'})}}>PROSE</span></h3>
                                <h3><span onClick={()=>{this.setState({type:'poetry'})}}>POETRY</span></h3>
                            </div>
                        </div>:
                        <div className="entry">
                            {
                                this.state.adding === false ? null:
                                <h1> ADDING POST ... PLEASE WAIT. </h1>
                            }
                            <h3 id="imageheading">IMAGE</h3>
                            <progress value={this.state.uploadpercent} max={100}/>
                            <input type="file" id="image" onChange={this.uploader}/>
                            <input 
                                id='title' 
                                type="text" 
                                onChange={(val)=>{this.setState({title:val.target.value})}}
                                placeholder="TITLE" />
                            <input 
                                id='by' 
                                type="text" 
                                onChange={(val)=>{this.setState({by:val.target.value})}}
                                placeholder="BY" />
                            <input 
                                id='date' 
                                type="text" 
                                onChange={(val)=>{this.setState({date:val.target.value})}}
                                placeholder="DATE" />
                            <textarea 
                                id='shortdesc' 
                                type="text" 
                                onChange={(val)=>{this.setState({shortdesc:val.target.value})}}
                                placeholder="SHORT DESCRIPTION (140 CHAR MAX)" 
                                maxLength={140} 
                                rows={4}/>
                            <p>{this.state.shortdesc.length}/140</p>
                            <textarea 
                                id='content' 
                                onChange={(val)=>{this.setState({content:val.target.value})}}
                                type="text" 
                                rows={4}
                                placeholder="CONTENT" />
                            <p>{this.state.content.length}</p>
                            <h3>
                                <span 
                                    onClick={()=>{
                                        if (this.state.imgsrc === 'nset'){
                                            this.setState({
                                                type:false,
                                                title: '',
                                                by: '',
                                                date: '',
                                                content: '',
                                                imgsrc: 'nset',
                                                filename: '',
                                                shortdesc: ''
                                            }); 
                                        } else {
                                            firebase.storage()
                                            .ref(`${this.state.type}/${this.state.filename}`)
                                            .delete().then(()=>{
                                                this.setState({
                                                    type:false,
                                                    title: '',
                                                    by: '',
                                                    date: '',
                                                    content: '',
                                                    imgsrc: 'nset',
                                                    filename: '',
                                                    shortdesc: ''
                                                }); 
                                            }).catch((err)=>{
                                                alert('Something went wrong. Try cancelling again.')
                                            })
                                        }
                                    }}
                                >
                                    CANCEL
                                </span>
                                <span onClick={()=>{this.createItem()}}>SUBMIT</span>
                            </h3>
                        </div>
                    }
                    </div>:
                    <div>
                        <input 
                            type="password" 
                            placeholder="ENTER PASSWORD..."
                            onChange={(val)=>{this.setState({pass:val.target.value})}} 
                        />
                        <h3><span onClick={()=>{this.login()}}>LOGIN</span></h3>
                    </div>
                }
                </div>
                <Social />
            </div>
        );
    }
}

export default Admin;