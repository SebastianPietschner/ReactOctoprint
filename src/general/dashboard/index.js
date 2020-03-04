import React from "react";
import { Redirect } from "react-router";
import Webcam from "../../webcam";
import Files from "../../files";
import Stats from "../../stats";
import Connection from "../../settings/connection";
import Timelapse from "../../files/timelapse";

class Dashboard extends React.Component {
  componentDidMount() {}

  render() {
    if (!localStorage.getItem("exsistingUser")) {
      return <Redirect to="/auth/newclient/" />;
    }

    return (
      <div class="tile is-ancestor is-vertical">
        <div class="tile is-12 is-parent">
          <div class="tile is-child box">
            <Stats />
          </div>
          <div class="tile is-child box">
            <Webcam />
          </div>
          <div class="tile is-child box">
            <Connection />
          </div>
        </div>
        <div class="tile is-12 is-parent">


          <div class="tile is-child box">
            <Files />
          </div>
          <div class="tile is-child box">
            <Timelapse />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
