import React from 'react';
import $ from 'jquery'
import DevicesBody from './DevicesBody';
import DevicesModal from './DevicesModal'

class Devices extends React.Component {
    constructor() 
    {
        super()
        
        this.state = {
            _id: "",
            showModal: false,
            sensorData: []
        }
        
        this.handleClick = this.handleClick.bind(this)
        this.hideModal = this.hideModal.bind(this)
    }

    //Update and display modal when an member of the devices table is clicked
    handleClick(event) {
        const id = event.currentTarget.getAttribute('data-device-id')
        $.get(`${process.env.REACT_APP_API_URL}/devices/${id}/device-history`, (response) => {
            this.setState({sensorData: response, showModal: true})
        })
    }

    //Hide the modal upon click
    hideModal() {
        this.setState({showModal: false})
    }

    render()
    {
        return (
            <div className="container">
                <h1>Devices</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Device</th>
                        </tr>
                    </thead>
                    <DevicesBody handleClick={this.handleClick}/>
                </table>
                <DevicesModal handleClick={this.hideModal}  sensorData={this.state.sensorData} displayModal={this.state.showModal}/>
            </div>
        )
    }
}



export default Devices;