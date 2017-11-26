import React, { Component } from 'react';
import './App.css';
import logo from './res/logo.png';
import Admin from './Admin.js';
import Social from './Social.js';
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
          <Social />
        </div> :
        this.state.page === 'pondering' ? 
        <Page type={this.state.page} uid={this.state.uid} back={()=>{this.goHome()}}/>:
        this.state.page === 'prose' ? 
        <Page type={this.state.page} uid={this.state.uid} back={()=>{this.goHome()}}/>:
        this.state.page === 'poetry' ? 
        <Page type={this.state.page} uid={this.state.uid} back={()=>{this.goHome()}}/>:
        this.state.page === 'admin' ?
        <Admin /> :
        <PageNotFound back={()=>{this.goHome()}} />
      }

      </div>
    );
  }
}

export default App;
