import React, {Component} from "react";
import {Link} from "react-router-dom";
import history from './../../../include/history';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: '',
            term: '',
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onInputChange = (event) => {
        this.setState({term: event.target.value});
    }

    handleSubmit = () => {

        if(window.location.pathname !== "/") {
            console.log(window.location.pathname);
            this.props.setTerm(this.state.term);
           history.push("/");
        } else {
            this.props.setTerm(this.state.term);
        }
    }

    render() {
        return (
            <div>
                <div className="container fixed-top">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <nav className="navbar navbar-expand-lg navbar-light bg-light rounded border margin-top-20">
                                <Link className="navbar-brand" to="/">Programe Já!<div className="sr-only"><h1 className="h1">Programe Já!</h1></div></Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon" />
                                </button>

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav mr-auto">

                                    </ul>
                                    <div className="form-inline my-2 my-lg-0">
                                        <input className="form-control mr-sm-2"
                                               type="search"
                                               name="tag"
                                               placeholder="Procurar"
                                               aria-label="Search"
                                               onChange={this.onInputChange}
                                               value={this.props.term}
                                        />
                                        <button
                                            className="btn btn-outline-secondary my-2 my-sm-0"
                                            type="submit"
                                            onClick={this.handleSubmit}
                                            ref={btn => {
                                                this.btn = btn;
                                            }}>
                                            Procurar
                                        </button>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;
