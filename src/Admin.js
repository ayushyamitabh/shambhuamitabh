import React, {Component} from 'react';
import './App.css';
import Social from './Social.js';
import * as firebase from 'firebase';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            password: '',
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
        }
        this.login = this.login.bind(this);
        this.setType = this.setType.bind(this);
        this.createItem = this.createItem.bind(this);
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                this.setState({loggedin: true});
            } else {
                this.setState({
                    loggedin: false
                })
            }
        })
    }
    login() {
        firebase.auth().signInWithEmailAndPassword('s_amitabh@yahoo.com', this.state.password);
    }
    setType(type){
        this.setState({
            type: type
        })
    }
    createItem() {
        this.setState({
            adding:true
        });
        var d = new Date;
        var newId = `${d.getMonth()+1}-${d.getDate()}-${d.getFullYear()}-${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
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
            existing[newId] = obj;
            firebase.database().ref(`${this.state.type}`).update(existing).then(()=>{
                this.setState({
                    type: false,
                    title: '',
                    by: '',
                    date: '',
                    content: '',
                    imgsrc: 'nset',
                    uploadpercent: 0,
                    shortdesc: '',
                    adding: false
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
            <div className="app">
                {
                    this.state.loggedin === false ?
                    <div className="app">
                        <div className="container">
                            <div className="tile admin-title">
                                <h1>Welcome, Shambhu!</h1>
                            </div>
                        </div>
                        <div className="container">
                            <div className="tile admin-password">
                                <input 
                                    onChange={(val)=>{
                                        this.setState({
                                            password: val.target.value
                                        })
                                    }} 
                                    type="password" 
                                    placeholder="PASSWORD"
                                    id="password"
                                />
                                <span className="login-btn" onClick={()=>{this.login()}}>
                                    LOGIN
                                </span>
                            </div>
                        </div>
                        <Social />
                    </div> :
                    <div className="app">
                        <div className="container">
                            <div className="tile admin-title">
                                <h1>Welcome, Shambhu!</h1>
                                <h4><span onClick={()=>{firebase.auth().signOut();}}>LOGOUT</span></h4>
                            </div>
                        </div>
                        <div className="container">
                            <div className="tile admin-choose">
                                <h4>
                                {
                                    this.state.type === false ?
                                    'What do you want to add?':
                                    `ADDING TO ${this.state.type.toUpperCase()}`
                                }
                                </h4>
                                <p>
                                {
                                    this.state.adding === true ?
                                    'Adding this entry, please wait...':
                                    null
                                }
                                </p>
                                {
                                    this.state.type === false ?
                                    <div className="choices">
                                        <h4 onClick={()=>{this.setType('pondering')}} >PONDERING</h4>
                                        <h4 onClick={()=>{this.setType('prose')}} >PROSE</h4>
                                        <h4 onClick={()=>{this.setType('poetry')}} >POETRY</h4>
                                    </div>:
                                    <div className="add-item">
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
                                                            uploadpercent: 0,
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
                                                                uploadpercent: 0,
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
                            </div>
                        </div>
                        <Social />
                    </div>
                }
            </div>
        );
    }
}

export default Admin;