import React, {Component} from 'react';
import {getdata} from "../../../services/http/getdata";
import {Link, Redirect} from "react-router-dom";
import moment from 'moment';

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: this.props.match.params.slug,
            post: {
                id: "",
                title: "",
                slug: "",
                body: "",
                image: "",
                tags: [],
                author: {
                    "name": ""
                }
            },
        };
    }

    componentDidMount() {
        getdata('api/public/post/' + this.state.slug, data => this.setState(data));
    }

    render() {
        if(window.location.pathname === "/") {
            return (<Redirect to={'/'}/>)
        }

        console.log(this.state);

        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center align-self-center margin-top-100">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <img src={this.state.post.image} alt="Imagem do post" className="rounded mx-auto d-block border-secondary" />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <nav aria-label="breadcrumb" className="bg-light rounded">
                                <ol className="breadcrumb bg-light border border-light-md margin-top-30">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{this.state.slug}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center align-self-center">
                        <section className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <article className="card width-100 margin-top-20">
                                <header className="card-header">
                                    <div className="row">
                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            <time dateTime={this.state.post.date}>{moment(this.state.post.date).format('DD/MM/YYYY')} - {this.state.post.author.name}</time>
                                        </div>
                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                                            {this.state.post.tags.map((tag, id) => {
                                                return (
                                                    <span className="badge badge-dark" key={id}>{tag.name}</span>
                                                )
                                            })
                                            }
                                        </div>
                                    </div>
                                </header>
                                <div className="card-body">
                                    <h5 className="card-title">{this.state.post.title}</h5>
                                    <div className="card-text text-justify">
                                        {this.state.post.body.split('\n').map( (it, i) => <div key={'x'+i}>{it}<br /></div> )}

                                    </div>
                                </div>
                            </article>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default Show;