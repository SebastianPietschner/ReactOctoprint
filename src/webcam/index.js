import React from 'react';
// import ReactDOM from 'react-dom';
// import axios from 'axios';


class Webcam extends React.Component {

    componentDidMount() {
        
    }

    render() {
        const host = localStorage.getItem('address') + "/webcam/?action=stream"
        return (
        <div>
            <h1 className="title">Webcam</h1>
            <div className="tile">
                <img src={host} alt="Webcam"></img>
            </div>
        </div>
        )
        
    }
}

export default Webcam