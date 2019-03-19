import React, { Component } from 'react';
import {getdata} from "../../../services/getdata";
import {Link, Redirect} from "react-router-dom";
import {refresh} from "../../../services/auth/refresh/refresh";


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[],
            redirect: false
        };
    }

    componentDidMount(){
        this.setState({redirect: refresh()});

        if(!this.state.redirect) {
            getdata('api/listar', data => this.setState(data));
        }
    }

    render() {

        if(this.state.redirect) {
            return (<Redirect to={'/'}/>)
        } else {

            return (
                <div className="container">
                    <div className="row justify-content-center align-self-center">
                        <section className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <article className="card">
                                <header className="card-header">
                                    <h1 className="card-title">Lista de Usuários</h1>
                                </header>
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nome</th>
                                            <th>Usuário</th>
                                            <th>Opções</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.users.map((item, indice) => {
                                                return (
                                                    <tr key={indice}>
                                                        <td>{indice + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.email}</td>
                                                        <td>
                                                            <Link to={"usuario/editar/" + item.id}
                                                                  className="btn btn-primary btn-sm">
                                                                Editar
                                                            </Link>
                                                            <Link to={"usuario/excluir/" + item.id}
                                                                  className="btn btn-danger btn-sm">
                                                                Excluir
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <footer className="card-footer">
                                    <p className="text-muted text-center">

                                    </p>
                                </footer>
                            </article>
                        </section>
                    </div>
                </div>
            )
        }
    }
}

export default List;