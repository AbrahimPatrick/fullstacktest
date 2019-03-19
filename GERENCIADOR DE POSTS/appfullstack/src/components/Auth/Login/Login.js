import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {login} from "../../../services/auth/login/login";
import {Alert} from "react-bootstrap";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grant_type: "password",
            client_id: "1",
            client_secret: "s07mA3yV6TgvOJtMz2nZIdTZWthgcJIMnMG3VplG",
            email: "",
            password: "",
            redirect: false,
            alerts: [],
            visible: false,
            loading: 'Entrar'
        };
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({visible: false});
    }

    login() {

        if (this.state.email && this.state.password) {
            this.refs.btn.setAttribute("disabled", "disabled");
            this.setState({loading: 'Entrando..'});
            login('api/auth/login', this.state).then((result) => {
                let responseJSON = result;

                if (responseJSON.access_token) {
                    sessionStorage.setItem('access_token', responseJSON.access_token);
                    sessionStorage.setItem('name', responseJSON.user.name);
                    this.setState({redirect: true});
                } else {
                    this.setState({alerts: responseJSON, visible: true, tags: []});
                    this.refs.btn.removeAttribute("disabled");
                    this.setState({loading: 'Entrar'});
                }
            });
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        if (this.state.redirect) {
            return (<Redirect to={'/home'}/>)
        }

        if (sessionStorage.getItem("access_token")) {
            return (<Redirect to={'/home'}/>)
        }

        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center align-self-center">
                        <section className="col-xs-10 col-sm-10 col-md-6 col-lg-6">
                            <article className="card login-card">
                                <header className="card-header">
                                    <h1 className="card-title">Gerenciador de Postagens</h1>
                                </header>
                                <div className="card-body">
                                    <Alert dismissible variant={this.state.alerts.class} show={this.state.visible}
                                           onClose={this.onDismiss} className="text-center">
                                        <strong>{this.state.alerts.message}</strong>
                                    </Alert>
                                    <form>
                                        <div className="form-row">
                                            <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                <label htmlFor="email">E-mail:</label>
                                                <input type="email" onChange={this.onChange} name="email" id="email"
                                                       className="form-control" autoComplete="email" required/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                <label htmlFor="password">Senha:</label>
                                                <input type="password" onChange={this.onChange} name="password"
                                                       id="password" autoComplete="password" className="form-control"
                                                       required/>
                                            </div>
                                        </div>
                                        <div className="form-row float-right">
                                            <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                <input type="button" ref="btn" value={this.state.loading}
                                                       onClick={this.login}
                                                       className="btn btn-primary onclick" />
                                                &nbsp;
                                                <button type="reset" className="btn btn-secondary">Cancelar</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <footer className="card-footer">
                                    <p className="text-muted text-center">
                                        Copyright © Patrick Abrahim 2019. All right reserved.
                                    </p>
                                </footer>
                            </article>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;