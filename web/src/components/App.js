import React from 'react';
import Navbar from './Navbar';
import Login from './Login'
import Devices from './Devices.js'
import RegisterDevice from './RegisterDevice'
import SendCommand from './SendCommand'
import AboutMe from './AboutMe'
import Footer from './Footer'
import Register from './Register';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import $ from 'jquery'


class App extends React.Component {
constructor() 
{
  super()

  this.state = {
    username: "",
    password: "",
    isLoggedIn: localStorage.getItem('user') ? true : false,
    authError: null
  }

  this.handleLogin = this.handleLogin.bind(this)
  this.handleChange = this.handleChange.bind(this)
  this.handleLogout = this.handleLogout.bind(this)
}



  handleLogin() {
    const { username, password } = this.state
    
    //Authenticates the User, updates states based on outcome
    $.post(`${process.env.REACT_APP_API_URL}/authenticate`,{ user: username, password } )
    .then(response => {
        if (response.success)
        {
            localStorage.setItem('user', username)
            this.setState({isLoggedIn: true, authError: null})
            console.log(response)
        }
        else
        {
            this.setState({authError: response})
        } 
            
    })
  }

  //Handles input box input
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ 
        [name]: value
    })
  }

  //Handles logout
  handleLogout() { 
    this.setState({isLoggedIn: false})
    localStorage.removeItem('user')
  }

  render() {
    return (
      //Route users based on path and isLoggedIn status
      <Router>
        <Navbar isLoggedIn={this.state.isLoggedIn} handleClick={this.handleLogout}/>
            <Switch>
              <Route exact path="/">
                <Login 
                handleClick={this.handleLogin} 
                handleChange={this.handleChange}
                error={this.state.authError} 
                isLoggedIn={this.state.isLoggedIn} 
                />
              </Route>
              <Route path="/register-device">
                {!this.state.isLoggedIn ? <Redirect to="/" /> : <RegisterDevice />}
              </Route>
                <Route path="/send-command">
                {!this.state.isLoggedIn ? <Redirect to="/" /> : <SendCommand />}
              </Route>
              <Route path="/devices">
                {!this.state.isLoggedIn ? <Redirect to="/" /> : <Devices />}
              </Route>
              <Route path="/about-me">
                {!this.state.isLoggedIn ? <Redirect to="/" /> : <AboutMe />}
              </Route>
              <Route path="/registration">
                <Register />
              </Route>
            </Switch>
            <Footer />
        </Router>
      );
  }
}
export default App