import React, {Component} from 'react';
import './App.css';

class NotFound extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div className="app">
                <div className="container">
                    <div className="tile error">
                        <h1>PAGE NOT FOUND</h1>
                        <h3>SOMETHING WRONG WITH THAT URL</h3>
                        <h4 onClick={()=>{this.props.changePage('home')}}><span>GO BACK HOME</span></h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotFound;