import React, {Component} from 'react';
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';
import Section from './Section';
import ViewItem from './ViewItem';
import Admin from './Admin';
import AdminHome from './AdminHome';
import AdminAdd from './AdminAdd';
import AdminEditSection from './AdminEditSection';
import AdminEditItem from './AdminEditItem';
export default class App extends Component{
        render(){
                return(
                        <Router>
                                <Switch>
                                        <Route exact path="/" component={Home} />
                                        <Route exact path="/admin" component={Admin} />
                                        <Route exact path="/admin/home" component={AdminHome} />
                                        <Route exact path="/admin/add" component={AdminAdd} />
                                        <Route exact path="/admin/edit/:section" component={AdminEditSection} />
                                        <Route exact path="/admin/edit/:section/:id" component={AdminEditItem} />
                                        <Route path="/section/:section" component={Section} />
                                        <Route path="/view/:section/:id" component={ViewItem} />
                                        <Route component={NotFound} />
                                </Switch>
                        </Router>
                );
        }
}