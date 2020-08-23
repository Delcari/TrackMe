import React from 'react';
import { Link } from "react-router-dom";

import $ from 'jquery'



class Register extends React.Component {
    constructor()
    {
        super()
        
        this.state = {
            username: "",
            password: "",
            confirm: ""
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    //Handles user registration
    handleClick() {
            const { username, password, confirm } = this.state

            if (password === confirm) {
                $.post(`${process.env.REACT_APP_API_URL}/registration`, { user: username, password })
                .then(response =>{
                    console.log(response)
                });
            }
        }
    
    //Handles input box input
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ 
            [name]: value
        })
    }

    render()
    {
        return (
            <div className="container">

            <h1>Registration</h1>

            <label htmlFor="reg-username">username</label>
            <input type="text" className="form-control" onChange={this.handleChange} value={this.state.username} name="username" id="reg-username"></input>

            <label htmlFor="reg-password">password</label>
            <input type="text" className="form-control" onChange={this.handleChange} value={this.state.password} name="password" id="reg-password"></input>

            <label htmlFor="reg-confirm">confirm</label>
            <input type="text" className="form-control" onChange={this.handleChange} value={this.state.confirm} name="confirm" id="reg-confirm"></input>

            <div id="reg-message"></div>
            <button id="register" onClick={this.handleClick} className="btn btn-success">Register</button>

            <p>Already have an account? Login <Link to="/">here</Link></p>
            </div>
        )
    }
}

export default Register;