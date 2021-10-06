import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


// View page
import LoginPage from './view/LoginPage';
import ImagePage from './view/ImagePage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Login" component={LoginPage} />
        <Route path="/Image" component={ImagePage} />
        <Route exact path="/">
          <Redirect to={"/Login"}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
