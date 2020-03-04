import React from 'react';
import axios from 'axios';
import { Redirect } from "react-router";
import { axconf } from "../helpers"

class Stats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          printerstate: "Unknown",
          actualtooltemp: 0,
          actualbedtemp: 0,
          targettooltemp: 0,
          targetbedtemp: 0,
          printPercent: 0,
          exsistingUser: localStorage.getItem("exsistingUser"),
          timeRemaining: 0,
          totalTime: 0
        };
      }
      printTime = (time) => {
        // console.log(time)
        var actualtime = new Date(time * 1000)
        var seconds = (time).toFixed(2)
        var minutes = (time / 60).toFixed(2)
        var hours = (time / 3600 ).toFixed(2)
        // console.log(hours)
        return({
          hours: hours,
          minutes: minutes,
          seconds: seconds
        })
      }

      printTime = (time) => {

          var sec_num = parseInt(time, 10); // don't forget the second param
          var hours   = Math.floor(sec_num / 3600);
          var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
          var seconds = sec_num - (hours * 3600) - (minutes * 60);
      
          if (hours   < 10) {hours   = "0"+hours;}
          if (minutes < 10) {minutes = "0"+minutes;}
          if (seconds < 10) {seconds = "0"+seconds;}
          return hours+':'+minutes+':'+seconds;
      }
      printerstate() {

        let data = []
        axios
          .get("/api/printer", axconf()) //Url here
          .then(res => {
            data = res.data
            this.setState({
              printerstate: data.state.text,
              actualtooltemp: data.temperature.tool0.actual,
              actualbedtemp: data.temperature.bed.actual,
              targetbedtemp: data.temperature.bed.target,
              targettooltemp: data.temperature.tool0.target
              // actualtooltemp
            });
          });
          axios
          .get("/api/job", axconf()) //Url here
          .then(res => {
            data = res.data
            if (data.progress.completion == null) {
              this.setState({
                printPercent: null,
                totalTime: data.progress.printTime,
                timeRemaining: data.progress.printTimeLeft
              });
            } else {
              this.setState({
                printPercent: data.progress.completion,
                totalTime: data.progress.printTime,
                timeRemaining: data.progress.printTimeLeft
              });
            }
            
          });
      }
      componentDidMount() {
        this.setState({
          printerstate: "Unknown",
          actualtooltemp: 0,
          actualbedtemp: 0,
          targettooltemp: 0,
          targetbedtemp: 0,
          printPercent: '0',
          exsistingUser: localStorage.getItem("exsistingUser"),
          timeRemaining: 0,
          totalTime: 0
        });
        

        const printerStateLoop = setInterval(() => {
          this.printerstate();
          // console.log('polled')
      }, 500)
        window.setInterval(this.printerstate(), 1000);
      }

      componentWillUnmount = () => {
        clearInterval(this.printerStateLoop)
      }
    
      render() {
        const username = localStorage.getItem("username");
        if (!localStorage.getItem("exsistingUser")) {
          return <Redirect to="/auth/newclient/" />;
        }
    
        return (
            <div>
            <h1 className="title">Welcome Back, {username}</h1>
            <div className="tags has-addons">
              <span className="tag is-medium">Printer Status</span>
              <span className="tag is-primary is-medium">
                {this.state.printerstate}
              </span>
            </div>
            <div className="tags has-addons">
              <span className="tag is-medium">Bed Temp</span>
              <span className="tag is-primary is-medium">
                {this.state.actualbedtemp.toFixed(1)}
              </span>
              <span className="tag is-success is-medium">
                {this.state.targetbedtemp}
              </span>
            </div>
            <div className="tags has-addons">
              <span className="tag is-medium">Tool Temp</span>
              <span className="tag is-primary is-medium">
                {this.state.actualtooltemp.toFixed(1)}
              </span>
              <span className="tag is-success is-medium">
                {this.state.targettooltemp}
              </span>
            </div>  
            <div className="tags has-addons">
              <span className="tag is-medium">Print Percent</span>
              <span className="tag is-primary is-medium">
                {this.state.printPercent + '%'}
              </span>
              
            </div> 
            <progress class="progress is-medium is-primary" value={this.state.printPercent} max="100">{this.state.printPercent + '%'}</progress>
            {/* <div className="tags has-addons">
              <span className="tag is-medium"> Print Time Remaining</span>
              <span className="tag is-primary is-medium">
              {this.printTime(this.state.timeRemaining)}
              </span>
              
            </div> 
            <div className="tags has-addons">
              <span className="tag is-medium"> Print Time Remaining</span>
              <span className="tag is-primary is-medium">
              {this.printTime(this.state.totalTime)}
              </span>
              
            </div> */}
            </div> 

          
        )
      }
    }

export default Stats