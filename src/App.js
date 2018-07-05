import React, { Component } from 'react';
import Add from './components/Add';
import Header from './components/Header';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import List from './components/List';
import InfoCompany from './components/InfoCompany';
import Edit from './components/Edit';

class App extends Component {
  render() {
    return (
      <Router>
        
          
          <div className="container-fluid">
              <Header/>                 
              <hr/>
              <Route path= "/add" component = {Add} />
              <Route path= "/list" component = {List} />
              <Route path= "/company/:key" component = {Edit} />
              
          </div>
      </Router>
    );
  }
}

export default App;
