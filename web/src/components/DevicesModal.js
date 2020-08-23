import React from 'react';

class DevicesModal extends React.Component {
    constructor() {
        super()
        this.state = {
            displayModal: false
        }
    }

    render()
    {
        let i = 0;
        //Maps the sensordata to the table body
        const sensorData = this.props.sensorData.map(record => {
            return (
            <tr key={i++}>
                <td>{record.ts}</td>
                <td>{record.temp}</td>
                <td>{record.loc.lon}</td>
                <td>{record.loc.lat}</td>
            </tr>
                )
            }
        )
        return (
            <div className="modal" id="historyModal" onClick={this.props.handleClick} style={{display : this.props.displayModal ? 'block' : 'none'}} >
                    <div className="modal-dialog" >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Device History</h5>
                            </div>  
                            <div className="modal-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Time</th>
                                            <th>Temperature</th>
                                            <th>Latitude</th>
                                            <th>Longitude</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sensorData}
                                    </tbody>
                                </table>
                            </div>                      
                        </div>
                    </div>
                </div>
        )
    }
}



export default DevicesModal;