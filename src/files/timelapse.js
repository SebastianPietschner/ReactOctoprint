import React from "react";
// import ReactDOM from "react-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { axconf } from "../helpers";

library.add(fab, fas);

class Timelapse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      shortFiles: [],
      numfiles: 5,
      menu: false
    };
    // this.onFormSubmit = this.onFormSubmit.bind(this);
    // this.onChange = this.onChange.bind(this);
    // this.fileUpload = this.fileUpload.bind(this);
    this.getTimelapse = this.getTimelapse.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  }

  getTimelapse = () => {
    axios.get("/api/timelapse", axconf()).then(res => {
      //   console.log(res)
      this.setState({
        files: res.data.files
      });
    });
    //   this.forceUpdate()
  };

  toggleMenu() {
    this.setState({ menu: !this.state.menu });
  }

  deleteFile = fileName => {
    axios
      .delete("/api/files/local/" + fileName.target.name, axconf())
      .then(res => {
        console.log(res);
      });
    this.getTimelapse();
  };

  componentDidMount = () => {
    var getFilesLoop = setInterval(() => {
      this.getTimelapse();
    }, 500);
    // localStorage.setItem("timelapsenum", 5);
  };
  componentWillUnmount = () => {
    clearInterval(this.getFilesLoop);
  };

  maxmin = () => {
      const maxitem = Number(localStorage.getItem("timelapsenum"))
      const leastitem = Number(localStorage.getItem("timelapsenum") - 5)
      if(maxitem <= 5) {
        const lessitem = document.getElementsById(lessitem)[0]
        lessitem.setAttribute("disabled", "disabled");
      } else {

      }
      
  }
  

  increaseNumFiles = () => {
    const numfiles = localStorage.getItem("timelapsenum");
    localStorage.setItem("timelapsenum", Number(numfiles) + 5);
    console.log("new page", localStorage.getItem("timelapsenum"));
  };
  decreaseNumFiles = () => {
    const numfiles = localStorage.getItem("timelapsenum");
    localStorage.setItem("timelapsenum", Number(numfiles) - 5);
    console.log("new page", localStorage.getItem("timelapsenum"));
  };
  pagination = () => {
    return Number(localStorage.getItem("timelapsenum"));
  };
  setPagination = (page) => {
    localStorage.setItem("timelapsenum", page * 5)
  }
  render() {
    const show = this.state.menu ? " is-active" : "";
    return (
      <div>
        {/* <div class={"modal" + show}>
          <div class="modal-background" />
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Print Now?</p>
              <button class="delete" aria-label="close" onClick={this.toggleMenu}/>
            </header>
            <section class="modal-card-body">
              Do you want to start printing now?
            </section>
            <footer class="modal-card-foot">
              <button
                class="button is-success"
                onClick={this.printFileNow}
              >
                Yes
              </button>
              <button class="button is-danger" onClick={this.printFileLater}>No</button>
            </footer>
          </div>
        </div> */}
        <h1 className="title">Timelapse Files</h1>

        {this.state.files
          .slice(this.pagination() - 5, this.pagination())
          .map(e => (
            <div className="box">
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{e.name}</strong>
                    <small> {e.date}</small>
                    <br />
                    Size: {e.size}
                  </p>
                </div>
                <nav className="level is-mobile">
                  <div className="level-left">
                    <a className="level-item" aria-label="print">
                      <button
                        className="button is-success"
                        //   onClick={this.launchPrint}
                        //   name={e.name}
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
                      <a className="button is-primary" href={e.url} download>
                        <FontAwesomeIcon icon={["fas", "file-download"]} />
                      </a>
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          ))}
        {/* <a className="button is-primary" onClick={this.increaseNumFiles}>
          <FontAwesomeIcon icon={["fas", "file-download"]} />
        </a>
        <a className="button is-info" onClick={this.decreaseNumFiles}>
          <FontAwesomeIcon icon={["fas", "file-download"]} />
        </a> */}
        <nav
          class="pagination is-centered"
          role="navigation"
          aria-label="pagination"
        >
          <a class="pagination-previous" onClick={this.decreaseNumFiles} name="lessitem">Previous</a>
          <a class="pagination-next" onClick={this.increaseNumFiles} name="moreitem">Next page</a>
          <ul class="pagination-list" >
            <li>
              <a class="pagination-link" aria-label="Goto page 1" onClick={this.setPagination(1)}>
                1
              </a>
            </li>
            <li>
              <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li>
              <a class="pagination-link" aria-label="Goto page 45">
              {this.pagination() / 5 - 1}
              </a>
            </li>
            <li>
              <a
                class="pagination-link is-current"
              >
                {(this.pagination()) / 5}
              </a>
            </li>
            <li>
              <a class="pagination-link" aria-label="Goto page 47">
              {(this.pagination()/5) + 1}
              </a>
            </li>
            <li>
              <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li>
              <a class="pagination-link" aria-label="Goto page 86">
                86
              </a>
            </li>
          </ul> 
        </nav>
      </div>
    );
  }
}

export default Timelapse;
