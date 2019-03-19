import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {getdata} from "../../../services/getdata";
import {putdata} from "../../../services/putdata";
import {refresh} from "../../../services/auth/refresh/refresh";
import {Alert} from "react-bootstrap";


class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            user: {
                'name': '',
                'email': '',
                'password': ''
            },
            grant_type: "password",
            client_id: "1",
            client_secret: "s07mA3yV6TgvOJtMz2nZIdTZWthgcJIMnMG3VplG",
            redirect: false,
            alerts: [],
            visible: false
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({visible: false});
    }


    componentDidMount() {
        this.setState({redirect: refresh()});

        if (!this.state.redirect) {
            getdata('api/editar/' + this.state.id, data => this.setState(data));
        }
    }

    handleSubmit = () => {
        putdata('api/atualizar/' + this.state.id, this.state.user).then((result) => {
            let responseJSON = result;
            this.setState({alerts: responseJSON, visible: true});
            getdata('api/editar/' + this.state.id, data => this.setState(data));
        });
    }

    onInputChange = (e) => {
        this.state.user[e.target.name] = e.target.value;
        this.forceUpdate()
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
                                        <h1 className="card-title">Editar Usuário:</h1>
                                    </header>
                                    <div className="card-body">
                                        <form ref="myForm">
                                            <div className="form-row">
                                                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <label htmlFor="name">Nome:</label>
                                                    <input type="text" value={this.state.user.name}
                                                           onChange={this.onInputChange} ref={(input) => {
                                                        return this.e = input
                                                    }} name="name" id="name"
                                                           className="form-control" autoComplete="name" required/>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <label htmlFor="email">E-mail:</label>
                                                    <input type="email" name="email" id="email"
                                                           className="form-control" value={this.state.user.email}
                                                           onChange={this.onInputChange}
                                                           ref={(input) => {
                                                               return this.e = input
                                                           }} autoComplete="email" required/>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <label htmlFor="password">Senha:</label>
                                                    <input type="password" onChange={this.onInputChange}
                                                           ref={(input) => {
                                                               return this.e = input
                                                           }}
                                                           name="password"
                                                           id="password" className="form-control"
                                                           autoComplete="new-password" placeholder="Nova senha"/>
                                                </div>
                                            </div>
                                            <div className="form-row float-right">
                                                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <button type="button" value="update" onClick={this.handleSubmit}
                                                            ref={btn => {
                                                                this.btn = btn;
                                                            }}
                                                            className="btn btn-primary">Salvar
                                                    </button>
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

export default Edit;