import React, {Component} from 'react';
import {getdata} from "../../../services/http/getdata";
import {Link} from "react-router-dom";
import Carousel from "../../Layout/Carousel/Carousel";
import moment from 'moment';

function searchingFor(term) {
    return function (x) {
        return x.title.toLowerCase().includes(term.toLowerCase()) ||
            !term;
    }
}

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
        getdata('api/public/posts', data => this.setState(data));
    }

    render() {
        const {posts} = this.state;

        return (
            <main>
                <Carousel/>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <nav aria-label="breadcrumb" className="bg-light rounded">
                                <ol className="breadcrumb bg-light border border-light-md margin-top-30">
                                    <li className="breadcrumb-item active" aria-current="page">Home</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-left">
                            {this.props.term !== '' ? <h3>{"Pesquisando por Título: "+this.props.term}</h3> : ''}
                        </div>
                    </div>
                    <div className="row justify-content-center align-self-center">
                        {
                            posts.filter(searchingFor(this.props.term)).map((item, indice) => {
                                return (
                                    <section key={indice} className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <article className="card width-100 margin-top-20">
                                            <header className="card-header">
                                                <div className="row">
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <time dateTime={item.date}>{moment(item.date).format('DD/MM/YYYY')} - {item.author.name}</time>
                                                    </div>
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                                                        {item.tags.map((tag, id) => {
                                                            return (
                                                                <span className="badge badge-dark"
                                                                      key={id}>{tag.name}</span>
                                                            )
                                                        })
                                                        }
                                                    </div>
                                                </div>
                                            </header>
                                            <div className="card-body">
                                                <h5 className="card-title">{item.title}</h5>
                                                <p className="card-text text-justify">{item.body}</p>
                                                <Link to={'post/' + item.slug} className="btn btn-primary float-right">Saiba
                                                    mais</Link>
                                            </div>
                                        </article>
                                    </section>
                                )
                            })
                        }
                    </div>
                </div>
            </main>
        )
    }
}

export default List;