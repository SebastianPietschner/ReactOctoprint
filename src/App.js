import React from "react";
// import logo from './logo.svg';
import "./App.scss";

import Dashboard from "./general/dashboard";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NewClient from "./auth/newclient";
import Control from "./general/control";
import Terminal from "./general/terminal";
import Library from "./plugins/library";
import Store from "./plugins/store";
import Settings from "./settings";
import Webcam from "./webcam";
import Files from "./files";
import Nav from "./nav";
import Stats from "./stats";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Nav />
            <Route path="/" exact component={Dashboard} />
            <Route path="/general/control/" component={Control} />
            <Route path="/general/terminal/" component={Terminal} />
            <Route path="/plugins/library/" component={Library} />
            <Route path="/plugins/store/" component={Store} />
            <Route path="/settings/" component={Settings} />
            <Route path="/webcam/" component={Webcam} />
            <Route path="/files/" component={Files} />
            <Route path="/auth/newclient/" component={NewClient} />
            <Route path="/stats/" component={Stats} />
        </Router>
      </header>
    </div>
  );
}

export default App;
