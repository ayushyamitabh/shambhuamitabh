import React, { Component } from 'react';
import './App.css';
import logo from './res/logo.png';
import iglogo from './res/instagram.png';
import fblogo from './res/facebook.png';
import Page from './Page.js';
import PageNotFound from './PageNotFound.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      page:'home',
      uid:null
    };
    this.goHome = this.goHome.bind(this);
  }
  componentWillMount() {
    var section = window.location.pathname.split('/')[1];
    var uid = window.location.pathname.split('/')[2];
    if (section) {
      this.setState({
        page: section,
        uid: uid
      })
    }
  }
  goHome() {
    this.setState({
      page:'home',
      uid:null
    })
  }
  render() {
    return (
      <div>
      {
        this.state.page === 'home' ?
        <div className="App">
          <div className="tile home">
            <img src={logo} />
            <h1>SHAMBHU AMITABH</h1>
            <h3> 
              <span onClick={()=>{this.setState({page:'pondering'})}}>PONDERING</span>,&nbsp;
              <span onClick={()=>{this.setState({page:'prose'})}}>PROSE</span>, & &nbsp;
              <span onClick={()=>{this.setState({page:'poetry'})}}>POETRY</span>
            </h3>
          </div>
          <div className="tile about">
            <h1>ABOUT</h1>
            <h3>
              Immortalizing my pondering, prose, and poetry in Hindi & English
              inspired by my day to day routine as a proud father, husband, and son.
              <br />
              Currently stationed in Armenia.
              <br />
              <br />
              Lucky to have lived in Italy, Senegal, Nigeria, and United States of
              America as well.
            </h3>
          </div>
          <div className="tile social">
            <div className="social-links">
              <img src={iglogo}/>
              <img src={fblogo}/>
              <h3><span>CONTACT</span></h3>
            </div>
          </div>
        </div> :
        this.state.page === 'pondering' || 'prose' || 'poetry' ? 
        <Page type={this.state.page} uid={this.state.uid} back={()=>{this.goHome()}}/>:
        <PageNotFound />
      }

      </div>
    );
  }
}

export default App;
