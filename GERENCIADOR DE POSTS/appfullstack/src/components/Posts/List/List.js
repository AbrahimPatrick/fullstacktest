import React, { Component } from 'react';
import {getdata} from "../../../services/getdata";
import {Link, Redirect} from "react-router-dom";
import {refresh} from "../../../services/auth/refresh/refresh";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[],
            posts:[],
            redirect: false
        };
    }

    componentDidMount(){
        this.setState({redirect: refresh()});
        if(!this.state.redirect) {
            getdata('api/posts', data => this.setState(data));
        }
    }

    render() {

        if(this.state.redirect) {
            return (<Redirect to={'/'}/>)
        }

        return (
            <div className="container">
                <div className="row justify-content-center align-self-center">
                    <section className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <article className="card">
                            <header className="card-header">
                                <h1 className="card-title">Postagens</h1>
                            </header>
                            <div className="card-body justify-content-center align-self-center">
                                <table className="table table-responsive">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Titulo</th>
                                        <th>Autor</th>
                                        <th>Postagem</th>
                                        <th>Tags</th>
                                        <th>Opções</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.posts.map((item, indice) => {
                                            return (
                                                <tr key={indice}>
                                                    <td>{indice+1}</td>
                                                    <td>{item.title}</td>
                                                    <td>{item.author.name}</td>
                                                    <td>{item.created_at}</td>
                                                    <td>{item.tags.map((tag, id) => {
                                                        return (
                                                            <span className="badge badge-dark" key={id}>{tag.name}</span>
                                                        )
                                                    })
                                                    }</td>
                                                    <td>
                                                        <Link to={"post/editar/" + item.id} className="btn btn-primary btn-sm">
                                                            Editar
                                                        </Link>
                                                        {item.published === 0 ?

                                                        <Link to={"post/publicar/" + item.id} className="btn btn-success btn-sm">
                                                            Publicar
                                                        </Link>
                                                        :
                                                        <Link to={"post/despublicar/" + item.id} className="btn btn-danger btn-sm">
                                                            Remover
                                                        </Link>
                                                        }
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

export default List;