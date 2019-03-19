import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {logout} from "../../services/auth/logout/logout";
import {refresh} from "../../services/auth/refresh/refresh";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
        this.setState({redirect: refresh()});
    }

    logout() {
        this.setState({redirect: logout()});
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={'/'}/>)
        }
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="jumbotron bg-light rounded border-secondary">
                                <h1 className="display-4">
                                    Bem vindo ao Gerenciador de Postagens
                                </h1>
                                <p className="lead">
                                    Realize alterações nas suas postagens de forma rápida e prática.
                                </p>
                                <hr className="my-4"/>
                                <ul className="list-group text-center">
                                    <li className="list-group-item"><h3>Aqui você consegue</h3></li>
                                    <li className="list-group-item">Adicionar e Atualizar Posts</li>
                                    <li className="list-group-item">Tirar e colocar no ar seus Posts</li>
                                    <li className="list-group-item">Criar usuários colaboradores</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;