import React from "react";
// import ReactDOM from "react-dom";
import axios from "axios";
// import { useState } from "react";
import { Redirect } from "react-router";
import { identifier } from "@babel/types";

class NewClient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "http://octopi",
      port: "5000",
      username: "",
      authenabled: false,
      encoded: "",
      basicauth: {
        id: "",
        password: ""
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBasicAuth = this.handleBasicAuth.bind(this);
    // this.basicauth = this.basicauth.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    localStorage.setItem([name], value);
    // console.log(name, value)
    this.setState({
      [name]: value
    });
  }

  handleBasicAuth(event) {
    // const target = event.target;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const name = event.target.name;
    localStorage.setItem([name], value);
    this.setState({
      basicauth: {
        [name]: value
      }
    });
    // console.log(this.state.basicauth.id)
  }

  componentDidMount() {
    if (localStorage.getItem("exsistingUser")) {
    } else {
      localStorage.setItem("address", "http://octopi");
      localStorage.setItem("port", 5000);
    }
    // this.state.basicauth
  }

  //   setConnect(address, port) {
  //     localStorage.setItem("address", address);
  //     localStorage.setItem("port", port);
  //   }

  render() {
    if (localStorage.getItem("exsistingUser")) {
      return <Redirect to="/" />;
    }
    return (
      <div className="modal is-active">
        <form onSubmit={this.handleSubmit}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Welcome!</p>
              {/* <a
              className="delete"
              aria-label="close"
              onClick={this.closeModal}
            /> */}
            </header>

            <section className="modal-card-body">
              <p>Address Input</p>
              <input
                className="input"
                name="address"
                type="text"
                value={this.state.address}
                onChange={this.handleInputChange}
                // onInput={e => setAddress(e.target.value)}
              />
              <p>Port Input</p>
              <input
                className="input"
                name="port"
                type="number"
                value={this.state.port}
                onChange={this.handleInputChange}
              />
              <p>Username Input</p>
              <input
                className="input"
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleInputChange}
              />
              <br />
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="authenabled"
                  value={this.state.authenabled}
                  onChange={this.handleInputChange}
                />
                Enable Basic Authentication
              </label>
              <p>Basic Authentication Id</p>
              <input
                className="input"
                name="id"
                type="text"
                value={this.state.basicauth.id}
                onChange={this.handleBasicAuth}
                // onInput={e => setAddress(e.target.value)}
              />
              <p>Basic Authentication Password</p>
              <input
                className="input"
                name="password"
                type="password"
                value={this.state.basicauth.password}
                onChange={this.handleBasicAuth}
                // onInput={e => setAddress(e.target.value)}
              />
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" type="submit">
                Add
              </button>
              {/* <a className="button" onClick={this.closeModal}>
              Cancel
            </a> */}
            </footer>
          </div>
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    const address = this.state.address;
    const port = this.state.port;
    const user = this.state.username;
    const localState = this.state;

    // if (localState.authenabled) {
    //   localStorage.setItem(
    //     "encoded",
    //     btoa(this.state.basicauth.id + ":" + this.state.basicauth.password)
    //   );
    // }

    // console.log(localStorage.getItem("encoded"));

    function axconf() {
      if (localState.authenabled) {
        return {
          baseURL: address + ':' + port,
          auth: {
            username: localStorage.getItem("id"),
            password: localStorage.getItem("password")
          },
          rejectUnauthorized: false,
          withCredentials: false,
          headers: {
          "Access-Control-Allow-Origin" : '*'
          }
        };
      } else {
        return {
          baseURL: address + ':' + port,
          headers: {
            "Access-Control-Allow-Origin" : '*'
          }
        };
      }
    }
    console.log(axconf());
    // console.log(this.state.address)
    axios.get("/plugin/appkeys/probe", axconf()).then(res => {
      // console.log(res.status)
      if (res.status === 204) {
        //   console.log("supports key gen");
        window.open(address + ":" + port);
        // console.log(username);
        axios
          .post(
            "/plugin/appkeys/request",
            {
              user: user, //Username Input here
              app: "ReactClient"
            },
            axconf()
          )
          .then(res => {
            var apikey = window.setInterval(function() {
              axios
                .get("/plugin/appkeys/request/" + res.data.app_token, axconf())
                .then(response => {
                  if (response) {
                    if (response.status === 200) {
                      finishloop(apikey);
                      // console.log(response.data.api_key)
                      localStorage.setItem("api_key", response.data.api_key);
                      localStorage.setItem("exsistingUser", true);
                      window.location = "/";
                    }
                  }
                });
            }, 500);

            function finishloop(loopname) {
              clearInterval(loopname);
            }
          });
      } else {
        console.log('Unable to generate key');
      }
    });
  }
}

export default NewClient;
