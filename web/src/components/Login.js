import React from 'react';
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";


class Login extends React.Component {
    render()
    {
    //Redirect the user to the devices page upon login
    if(this.props.isLoggedIn) return (<Redirect to="/devices" />)
    
        return (
            <div className="container">
            <h1>Login</h1>

            <label htmlFor="login-user">username</label>
            <input type="text" className="form-control" id="login-user" name="username" onChange={(e) => this.props.handleChange(e)}></input>
            
            <label htmlFor="login-pass">password</label>
            <input type="text" className="form-control" id="login-pass" name="password" onChange={(e) => this.props.handleChange(e)}></input>
            
            <div id="login-message" className={this.props.error ? "alert alert-danger" : ""}>{this.props.error}</div>
            <button onClick={this.props.handleClick} className="btn btn-success">Login</button>
            
            <p>Don't have an account? Create one <Link to="/registration">here</Link></p>
        </div>
        )
    }
}



export default Login;