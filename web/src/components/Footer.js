import React from 'react';

class Footer extends React.Component {
    render()
    {
        return (
            //Dynamic footer
            <div className="card-footer text-muted">{"Copyright Riley " + (new Date().getFullYear())}</div> 
        )
    }
}

export default Footer