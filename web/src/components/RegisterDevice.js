import React from 'react';
import $ from 'jquery'

class RegisterDevice extends React.Component {
    constructor()
    {
        super()
        this.state = {
            user: "",
            name: ""
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    
    //Handles device registration
    handleClick() {
        const {user, name} = this.state
        const body = {
            user: user,
            name: name,
            sensorData: []
        }

        $.post(`${process.env.REACT_APP_API_URL}/devices`, body)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
                console.error(`Error: ${error}`);
            });
    }

    //Handles input box input
    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    render()
    {
        return (
            <div className="container">
                <h1>Register New Device</h1>
                
                <div className="form-group">
                    <label htmlFor="device-user">User</label>
                    <input type="text" value={this.state.user} className="form-control" id="device-user" name="user" onChange={this.handleChange}></input>
                </div>
                    
                <div className="form-group">
                    <label htmlFor="device-name">Name</label>
                    <input type="text" value={this.state.name} className="form-control" id="device-name" name="name" onChange={this.handleChange}></input>
                </div>

                <button className="btn btn-success" onClick={this.handleClick}>Save</button>
            </div>
        )
    }
}



export default RegisterDevice;