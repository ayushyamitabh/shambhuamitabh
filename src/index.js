import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import * as firebase from 'firebase';

import AOS from 'aos';
import "../node_modules/aos/dist/aos.css";
AOS.init();
AOS.refresh();
var config = {
    apiKey: "AIzaSyADshFEc7Lnh92HjorrhvKqV1jKpUhx88k",
    authDomain: "shambhuamitabh-main.firebaseapp.com",
    databaseURL: "https://shambhuamitabh-main.firebaseio.com",
    projectId: "shambhuamitabh-main",
    storageBucket: "shambhuamitabh-main.appspot.com",
    messagingSenderId: "462371653709"
};
firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
