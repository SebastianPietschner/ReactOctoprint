import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Nav extends React.Component {

    componentDidMount() {

    }

    constructor(props) {
        super(props);
        this.state = {
            menu: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({ menu: !this.state.menu })
    }



    render() {

        const show = (this.state.menu) ? " is-active" : "";

        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
                    </a>

                    <a role="button" className="navbar-burger burger" onClick={this.toggleMenu}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbar" className={"navbar-menu" + show}>
                    <div className="navbar-start">
                    <div className="navbar-item has-dropdown is-hoverable">
                        <Link className="navbar-link" to="/">Dashboard</Link>
                        <div className="navbar-dropdown">
                            <Link className="navbar-item" to="/general/control/">Control</Link>
                            <Link className="navbar-item" to="/general/terminal/">Terminal</Link>
                        </div>
                    </div>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">Plugins</a>
                        <div className="navbar-dropdown">
                            <Link className="navbar-item" to="/plugins/library/">Library</Link>
                            <Link className="navbar-item" to="/plugins/store/">Store</Link>
                        </div>
                    </div>
                    <Link className="navbar-item" to="/webcam/">Camera</Link>
                    <Link className="navbar-item" to="/files/">Files</Link>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                        <Link className="navbar-item" to="/settings/">Settings</Link>
                        </div>
                    </div>
                </div>
            </nav>
        )

    }
}

export default Nav