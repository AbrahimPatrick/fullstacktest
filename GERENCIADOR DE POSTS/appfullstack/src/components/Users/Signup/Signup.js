import React, {Component} from 'react';
import {postdata} from "../../../services/postdata";
import {Redirect} from "react-router-dom";
import {refresh} from "../../../services/auth/refresh/refresh";
import {Alert} from "react-bootstrap";


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            act: 0,
            index: '',
            grant_type: "password",
            client_id: "1",
            client_secret: "s07mA3yV6TgvOJtMz2nZIdTZWthgcJIMnMG3VplG",
            name: "",
            email: "",
            password: "",
            redirect: false,
            alerts: [],
            visible: false
        };
        this.signup = this.signup.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    getInitialState() {
        return (
            {
                data: [],
                act: 0,
                index: '',
                grant_type: "password",
                client_id: "1",
                client_secret: "s07mA3yV6TgvOJtMz2nZIdTZWthgcJIMnMG3VplG",
                name: "",
                email: "",
                password: "",
            }
        )
    }

    onDismiss() {
        this.setState({visible: false});
    }

    componentDidMount() {
        this.setState({redirect: refresh()});

        if (!this.state.redirect) {
            this.refs.name.focus();
        }
    }

    signup() {
        this.refs.btn.setAttribute("disabled", "disabled");
        postdata('api/cadastro', this.state).then((result) => {
            let responseJSON = result;
            this.setState({alerts: responseJSON, visible: true});
        });
        this.setState(this.getInitialState());
        this.refs.myForm.reset();
        this.refs.btn.removeAttribute("disabled");
        this.refs.name.focus();
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        if (this.state.redirect) {
            return (<Redirect to={'/'}/>)
        } else {

            return (
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <Alert dismissible variant={this.state.alerts.class} show={this.state.visible}
                                       onClose={this.onDismiss} className="text-center">
                                    <strong>{this.state.alerts.message}</strong>
                                </Alert>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center align-self-center">
                            <section className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <article className="card">
                                    <header className="card-header">
                                        <h1 className="card-title">Criar Usuário</h1>
                                    </header>
                                    <div className="card-body">
                                        <form ref="myForm">
                                            <div className="form-row">
                                                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <label htmlFor="name">Nome:</label>
                                                    <input type="text" ref="name" onChange={this.onChange} name="name"
                                                           id="name"
                                                           className="form-control" autoComplete="name"
                                                           placeholder="Nome"
                                                           required/>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <label htmlFor="email">E-mail:</label>
                                                    <input type="email" ref="email" onChange={this.onChange}
                                                           name="email"
                                                           id="email"
                                                           className="form-control" autoComplete="email"
                                                           placeholder="E-mail" required/>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <label htmlFor="password">Senha:</label>
                                                    <input type="password" ref="password" onChange={this.onChange}
                                                           name="password"
                                                           id="password" className="form-control"
                                                           autoComplete="new-password" placeholder="senha" required/>
                                                </div>
                                            </div>
                                            <div className="form-row float-right">
                                                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <input type="button" ref="btn" value="Salvar"
                                                           onClick={this.signup}
                                                           className="btn btn-primary onclick" />
                                                    &nbsp;
                                                    <button type="reset" className="btn btn-secondary">Cancelar</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <footer className="card-footer">
                                        <p className="text-muted text-center">

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
}

export default Signup;