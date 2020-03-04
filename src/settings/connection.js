import React from "react";
import axios from "axios";
import { axconf } from "../helpers"
// import ReactDOM from 'react-dom';
// import axios from 'axios';

class Connection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baudrate: 0,
      port: "",
      savenew: true,
      currentsettings: {
        baudrate: 0,
        port: "",
        state: "unknown",
        printerprofile: ""
      },
      optionalsettings: {
        ports: [],
        baudrates: [],
        printerprofiles: [],
        portPref: "",
        baudPref: 0,
        profilePref: "",
        autoconnect: true
      }
      
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.onFormSubmit = this.onFormSubmit.bind(this);
    // this.onChange = this.onChange.bind(this);
    // this.fileUpload = this.fileUpload.bind(this);
    // this.getFiles = this.getFiles.bind(this);
    // this.toggleMenu = this.toggleMenu.bind(this);
    // this.deleteFile = this.getFiles.bind(this);
  }

  
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(name, value)
    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    // console.log(axconf())
    setInterval(() => {
        this.getCurrentConnectionSettings();
    }, 500)
  }
  componentDidUpdate = () => {
      
    this.selectCurrent();
  };

  saveConnectionSettings = () => { 
    // console.log(this.state)
    axios
    .post(
      "/api/connection",
      {
        command: "connect",
        port: this.state.port,
        baudrate: this.state.baudrate,
        save: this.state.savenew
      },
      axconf()
    )
    .then(res => {
      console.log(res);
    });
  }

  selectCurrent = () => {
    document
      .getElementById(this.state.currentsettings.baudrate)
      .setAttribute("selected", "selected");
    document
      .getElementById(this.state.currentsettings.port)
      .setAttribute("selected", "selected");
  };
  getCurrentConnectionSettings = () => {
    axios
      .get("/api/connection", axconf()
      )
      .then(res => {
        this.setState({
            baudrate: res.data.current.baudrate,
            port: res.data.current.port,
            savenew: false,
          currentsettings: {
            baudrate: res.data.current.baudrate,
            port: res.data.current.port,
            state: res.data.current.state,
            printerprofile: res.data.current.printerProfile
          },
          optionalsettings: {
            ports: res.data.options.ports,
            baudrates: res.data.options.baudrates,
            printerprofiles: res.data.options.printerProfiles[0],
            portPref: res.data.options.portPreference,
            baudPref: res.data.options.baudratePreference,
            profilePref: res.data.options.printerProfilePreference,
            autoconnect: res.data.options.autoconnect
          }
        });
        // return(res.data.current)
        // console.log(this.state.optionalsettings);
      });
    //   this.forceUpdate()
  };

  render() {
    // console.log()
    return (
      <div>
        <h1 className="title is-1">Settings</h1>
        <div className="box">
          <div class="tags has-addons">
            <span class="tag is-medium">
              <strong>Connection State</strong>
            </span>
            <span class="tag is-success is-medium">
              {this.state.currentsettings.state}
            </span>
          </div>

          {/* <p className="subtitle"> */}
            <div class="field has-addons">
              <p class="control">
                <a class="button">
                  <strong>Baudrate</strong>
                </a>
              </p>
              <p class="control">
                <div class="select">
                  <select name="baudrate" onChange={this.handleInputChange}>
                    {this.state.optionalsettings.baudrates.map(e => (
                      <option id={e}>{e}</option>
                    ))}
                  </select>
                </div>
              </p>
            </div>
            {/* <br /> */}
            <div class="field has-addons">
              <p class="control">
                <a class="button">
                  <strong>Port</strong>
                </a>
              </p>
              <p class="control">
                <div class="select">
                  <select name="port" onChange={this.handleInputChange}>
                    {this.state.optionalsettings.ports.map(e => (
                      <option id={e}>{e}</option>
                    ))}
                  </select>
                </div>
              </p>
            </div>
            <label class="checkbox">
            <input type="checkbox" name="savenew" onChange={this.handleInputChange}/>
             Save Connection Settings
            </label>
            <br></br><br />
            <a type="submit" class="button is-success" onClick={this.saveConnectionSettings}>Connect</a>
          {/* </p> */}
        </div>
      </div>
    );
  }
}

export default Connection;
