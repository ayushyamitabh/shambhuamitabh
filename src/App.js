import React, { Component } from 'react';
import './App.css';
import Home from './Home.js';
import Page from './Page.js';
import Admin from './Admin.js';
import NotFound from './NotFound.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'home',
      index: null
    };
    this.pageChanger = this.pageChanger.bind(this);
  }
  componentWillMount(){
    var page = window.location.pathname.split('/')[1];
    var index = window.location.pathname.split('/')[2];
    if (page) {
      this.setState({
        page: page,
        index: index
      })
    }
    window.history.pushState({}, document.title, "/" + '' );
  }
  pageChanger(page){
    this.setState({
      page: page,
      index: null
    })
  }
  render() {
    return (
      <div>
        {
          this.state.page === 'home' ?
            <Home changePage={this.pageChanger} />:
          this.state.page === 'pondering' || this.state.page === 'prose' || this.state.page === 'poetry'?
            <Page type={this.state.page} index={this.state.index} changePage={this.pageChanger} />:
          this.state.page === 'admin' ? 
            <Admin changePage={this.pageChanger} /> :
          <NotFound changePage={this.pageChanger}/>
        }
      </div>
    );
  }
}

export default App;