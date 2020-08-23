import React from 'react';
import $ from 'jquery'

class SendCommand extends React.Component {
    constructor() {
        super()
        this.state = { 
            deviceid: "",
            command: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    //Handles input box input
    handleChange(event)
    {
        const { name, value } = event.target;
        this.setState({ 
            [name]: value
        })
    }

    //Handles sending commands
    handleClick() 
    {
        const { command, deviceid } = this.state

        $.post(`${process.env.REACT_APP_MQTT_URL}/send-command`, { deviceId: deviceid , command })
        .then(response => {
            console.log(response);
        })
    }
    render()
    {
        return (
        <div className="container">
            <h1>Send Command</h1>
            
            <div className="form-group"> 
                <label htmlFor="deviceid">Device ID</label>
                <textarea rows="1" className="form-control" value={this.state.deviceid} onChange={this.handleChange} id="deviceid" name="deviceid"></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="command">Command</label>
                <textarea rows="2" className="form-control" value={this.state.command} onChange={this.handleChange} id="command" name="command"></textarea>
            </div>

            
            <button className="btn btn-success" onClick={this.handleClick} id="send-command">Send</button>
        </div>
        )
    }
}

export default SendCommand