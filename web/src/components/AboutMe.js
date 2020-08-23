import React from 'react';

class AboutMe extends React.Component {
    render()
    {
        return (
            <div className="container">
                <h1>
                    Riley Dellios
                </h1>
                
                <h2>About Me:</h2>
                <p>
                    My hobbies include programming, fishing and weightlifting, I have experience with python, cpp, and c# using both functional and object-oriented programming paridigms. I additionally intend to achieve a high distinction for this unit.
                </p>
                
                <h3>Completed Units</h3>
                <ul className="list-group">  
                    <li className="list-group-item">SEB101: Engineering Physics</li>
                    <li className="list-group-item">SEJ101: Design Fundamentals</li>
                    <li className="list-group-item">SIT199: Applied Algebra and Statistics</li>
                    <li className="list-group-item">SIT102: Introduction to Programming</li>
                    <li className="list-group-item">SIT103: Data and Information Management</li>
                    <li className="list-group-item">SIT107: Software Engineering 1: Connecting the Cyber and Physical Worlds</li>
                    <li className="list-group-item">SIT122: Robotics Studio</li>
                    <li className="list-group-item">SIT192: Discrete Mathematics</li>
                    <li className="list-group-item">SIT210: Embedded Systems Development</li>
                    <li className="list-group-item">SIT232: Object-Oriented Development</li>
                </ul>
            </div>
        )
    }
}

export default AboutMe