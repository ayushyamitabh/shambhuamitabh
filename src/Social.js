import React, {Component} from 'react';
import './App.css';
import fb from './res/facebook.png';
import ig from './res/instagram.png';
import em from './res/email.png';
class Social extends Component {
    openLink(url){
        var win = window.open(url,'_blank');
        win.focus();
    }
    render() {
        return (
            <div className="container footer">
                <div className="tile footer">
                    <div className="social">
                        <img 
                            onClick={()=>{
                                this.openLink('https://www.facebook.com/Shambhu.Amitabh')
                            }}
                            src={fb} />
                        <img 
                            onClick={()=>{
                                this.openLink('mailto:s_amitabh@yahoo.com?subject=Contact%20From%20Website')
                            }} 
                            src={em} />
                        <img 
                            onClick={()=>{
                                this.openLink('https://www.instagram.com/shambhuamitabh/')
                            }}
                            src={ig} />
                    </div>
                </div>
            </div>
        );
    }
}
export default Social;