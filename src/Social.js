import React, { Component } from "react";
import iglogo from './res/instagram.png';
import fblogo from './res/facebook.png';
import './App.css';

class Social extends Component {
    render() {
        return( 
            <div className="tile social">
                <div className="social-links">
                <img src={fblogo} onClick={()=>{
                    var win = window.open('https://www.facebook.com/Shambhu.Amitabh','_blank');
                    win.focus();
                }}/>
                <img src={iglogo} onClick={()=>{
                    var win = window.open('https://www.instagram.com/shambhuamitabh/','_blank');
                    win.focus();
                }}/>
                <h3><a href="mailto:s_amitabh@yahoo.com?subject=Contact%20From%20Website"><span>CONTACT</span></a></h3>
                </div>
            </div>
        );
    }
}
export default Social;