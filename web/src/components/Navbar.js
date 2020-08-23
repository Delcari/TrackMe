import React from 'react';
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    render()
    {
        return (
        //Navbar items become links to the various paths
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">TrackMe</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#expanded-nav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="expanded-nav">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to="/devices">Devices</Link>
                    <Link className="nav-item nav-link" to="/register-device">Register Device</Link>
                    <Link className="nav-item nav-link" to="/send-command">Send Command</Link>
                    <Link className="nav-item nav-link" to="/about-me">About Me</Link>
                    <Link 
                    className="nav-item nav-link" 
                    to="/" 
                    onClick={this.props.handleClick}>
                    {this.props.isLoggedIn ? "Logout" : "Login"}
                    </Link>
                    
                    <div id='auth-nav' className='navbar-nav'></div>
                </div>
            </div>
        </nav>
        )
    }
}



export default Navbar;