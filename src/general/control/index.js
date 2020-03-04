import React from 'react';
import Webcam from '../../webcam';
// import ReactDOM from 'react-dom';
// import axios from 'axios';


class Control extends React.Component {

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <div className="box">
                <Webcam></Webcam>
                </div>
                <div className="box">Controls</div>
            </div>
        )
        
    }
}

export default Control