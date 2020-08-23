import React from 'react';
import $ from 'jquery'


class DevicesBody extends React.Component {
    constructor () {
        super()
        this.state = {
            devices: []
        }
    }
    
    //Get the current users devices
    componentDidMount() {
        const currentUser = localStorage.getItem('user')

        $.get(`${process.env.REACT_APP_API_URL}/users/${currentUser}/devices`).then(response => {
            this.setState({devices: response})
        }
    )
}

    render()
    {
        const Devices = this.state.devices.map(device => (
        <tr key={device._id} data-device-id={device._id} onClick={this.props.handleClick}>
            <td>{device.user}</td>
            <td>{device.name}</td>
        </tr>))
        
        return (
            <tbody>
                {Devices}
            </tbody>
        )
    }
}



export default DevicesBody;