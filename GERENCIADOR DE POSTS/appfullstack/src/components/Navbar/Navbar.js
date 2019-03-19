import React, { Component } from "react";
import {Link, Redirect} from "react-router-dom";
import {logout} from "../../services/auth/logout/logout";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.setState({redirect: logout()});
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={'/'}/>)
        }
        if(sessionStorage.getItem("access_token")) {
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link to="/home" className="navbar-brand">Gerenciador de Posts</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/Home" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                   role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Usuários
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <Link to="/usuario/novo" className="dropdown-item">Novo</Link>
                                    <Link to="/usuarios" className="dropdown-item">Lista</Link>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                   role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Postagens
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <Link to="/post/novo" className="dropdown-item">Novo</Link>
                                    <Link to="/posts" className="dropdown-item">Listar</Link>
                                </div>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                   role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {sessionStorage.getItem("name")}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item" onClick={this.logout}>Sair</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        } else {
                return(
                    false
                )
        }
    }
}

export default Navbar;