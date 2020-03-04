import React from "react";
// import ReactDOM from "react-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { axconf } from "../helpers";

library.add(fab, fas);

class Files extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploadFile: null,
      uploadFilename: "Choose File...",
      printFile: "",
      menu: false,
      sortMethod: 'recent'
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.getFiles = this.getFiles.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    // this.deleteFile = this.getFiles.bind(this);
  }
  onFormSubmit = e => {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.uploadFile).then(response => {
      console.log(response.data);
    });
    // this.getFiles();
  };
  onChange = e => {
    if (e.target.files[0]) {
      this.setState({
        uploadFile: e.target.files[0],
        uploadFilename: e.target.files[0].name
      });
    } else {
      this.setState({
        uploadFile: e.target.files[0],
        uploadFilename: "Choose File..."
      });
    }
    // console.log(e.target.files[0].name);
  };

  getFiles = () => {
    axios.get("/api/files", axconf()).then(res => {
      this.setState({
        files: res.data.files
      });
      // console.log(res.data.files.length)
      // for (var i = 0; i >= (res.data.files.legth - 1); i++) {
      //   console.log(i)
      // }
      // console.log(res.data.files[0].date)
    });
    //   this.forceUpdate()
  };
  timeConverter = UNIX_timestamp => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  };

  toggleMenu() {
    this.setState({ menu: !this.state.menu });
  }
  launchPrint = filename => {
    this.setState({
      menu: true,
      printFile: filename.target.name
    });
    console.log(this.state);
    console.log(filename.target.name);
  };
  printFile = filename => {
    console.log(filename.target.name);

    axios
      .post(
        "/api/files/local/" + filename.target.name,
        {
          command: "select",
          print: true
        },
        axconf()
      )
      .then(res => {
        console.log(res);
      });
  };
  printFileLater = filename => {
    this.setState({
      menu: false,
      printFile: filename.target.name
    });
    axios
      .post(
        "/api/files/local/" + this.state.printFile,
        {
          command: "select",
          print: false
        },
        axconf()
      )
      .then(res => {
        // console.log(res);
      });
  };
  deleteFile = fileName => {
    axios
      .delete("/api/files/local/" + fileName.target.name, axconf())
      .then(res => {
        console.log(res);
      });
    this.getFiles();
  };
  fileUpload = file => {
    const formData = new FormData();
    formData.append("file", file);
    // this.getFiles();
    return axios.post("/api/files/local/", formData, axconf());
  };

  componentDidMount = () => {
    var getFilesLoop = setInterval(() => {
      this.getFiles();
    }, 500);
  };
  componentWillUnmount = () => {
    clearInterval(this.getFilesLoop);
  };

  render() {
    const show = this.state.menu ? " is-active" : "";
    return (
      <div>
        <div class={"modal" + show}>
          <div class="modal-background" />
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Print Now?</p>
              <button
                class="delete"
                aria-label="close"
                onClick={this.toggleMenu}
              />
            </header>
            <section class="modal-card-body">
              Do you want to start printing now?
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success" onClick={this.printFileNow}>
                Yes
              </button>
              <button class="button is-danger" onClick={this.printFileLater}>
                No
              </button>
            </footer>
          </div>
        </div>
        <h1 className="title">G-Code Files</h1>

        {this.state.files.map(e => (
          <div className="box">
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{e.name}</strong>
                  <small> {this.timeConverter(e.date)}</small>
                  <br />
                  Location: {e.origin}
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  <a className="level-item" aria-label="print">
                    <button
                      className="button is-success"
                      onClick={this.printFile}
                      name={e.name}
                    >
                      <FontAwesomeIcon icon={["fas", "print"]} />
                    </button>
                  </a>
                  <a className="level-item" aria-label="delete">
                    <button
                      className="button is-danger"
                      onClick={this.deleteFile}
                      name={e.name}
                    >
                      <FontAwesomeIcon icon={["fas", "trash"]} />
                    </button>
                  </a>
                  <a className="level-item" aria-label="print">
                    <a
                      className="button is-primary"
                      href={e.refs.download}
                      download
                    >
                      <FontAwesomeIcon icon={["fas", "file-download"]} />
                    </a>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        ))}
        <form onSubmit={this.onFormSubmit}>
          <div class="field">
            <div class="file is-info has-name">
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  name="gcode"
                  onChange={this.onChange}
                  accept=".gcode, .stl"
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <FontAwesomeIcon icon="upload" />
                  </span>
                  <span class="file-label">Upload G-Code file…</span>
                </span>
                <span class="file-name">{this.state.uploadFilename}</span>
              </label>
            </div>
          </div>
          <button className="button" type="submit">
            Upload
          </button>
        </form>
      </div>
    );
  }
}

export default Files;
