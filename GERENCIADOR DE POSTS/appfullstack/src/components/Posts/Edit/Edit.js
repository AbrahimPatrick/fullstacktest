import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {getdata} from "../../../services/getdata";
import {WithContext as ReactTags} from "react-tag-input";
import {refresh} from "../../../services/auth/refresh/refresh";
import {Alert} from "react-bootstrap";
import {post} from "../../../services/formdata/post";

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            post: {
                id: "",
                title: "",
                slug: "",
                body: "",
                image: "",
                name_tag: [],
                author: {
                    id: "",
                    name: ""
                }
            },
            client_id: "1",
            client_secret: "s07mA3yV6TgvOJtMz2nZIdTZWthgcJIMnMG3VplG",
            redirect: false,
            tags: [],
            suggestions: [],
            alerts: [],
            visible: false,
            loading: 'Enviar'
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onDismiss() {
        this.setState({visible: false});
    }

    componentDidMount() {
        this.setState({redirect: refresh()});
        if (!this.state.redirect) {
            getdata('api/posts/' + this.state.id, data => [
                this.state.tags = data.post.tags,
                this.setState(data)
            ]);

            getdata('api/tags', data => this.setState(data));
        }
    }

    handleDelete(i) {
        const {tags} = this.state;

        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({tags: [...state.tags, tag]}));
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({tags: newTags});
    }

    handleSubmit = () => {
        this.refs.btn.setAttribute("disabled", "disabled");
        this.setState({loading: 'Enviando..'});
        this.state.tags.map((item, indice) => {
            return (
                this.state.tags[indice].id = parseInt(item.id),
                    this.forceUpdate()
            )
        });
        this.state.post.tags = this.state.tags;
        this.forceUpdate();
        console.log(this.state);

        let formData = new FormData();
        formData.append('image', this.state.post.image);
        formData.append('body', this.state.post.body);
        formData.append('author', this.state.post.author.name);
        formData.append('title', this.state.post.title);
        formData.append('tags', JSON.stringify(this.state.post.tags));
        formData.append('_method', 'PUT');

        console.log(formData);

        post('api/post/editar/' + this.state.id, formData).then((result) => {
            let responseJSON = result;
            this.setState({alerts: responseJSON, visible: true});
            getdata('api/posts/' + this.state.id, data => this.setState(data));
            this.setState({loading: 'Enviar'});
            this.refs.btn.removeAttribute("disabled");
        });
    }

    onInputChange = (e) => {
        this.state.post[e.target.name] = e.target.value;
        this.forceUpdate()
    }

    onInputChangeAuthor = (e) => {
        this.state.post.author.name = e.target.value;
        this.forceUpdate()
    }

    onFileChange(e){
        e.preventDefault();
        let file = e.target.files[0];
        this.state.post[e.target.name] = file;

        this.forceUpdate();
    }


    render() {

        if (this.state.redirect) {
            return (<Redirect to={'/'}/>)
        } else {

            this.state.tags.map((item, indice) => {
                return (
                    this.state.tags[indice].id = String(item.id)
                )
            });

            this.state.suggestions.map((item, indice) => {
                return (
                    this.state.suggestions[indice].id = String(item.id)
                )
            });

            const {tags, suggestions} = this.state;

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
                                        <h1 className="card-title">Editar Postagem</h1>
                                    </header>
                                    <div className="card-body">
                                        <form ref="myForm">
                                            <div className="form-row">
                                                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <label htmlFor="name_author">Adicione marcadores:</label>
                                                    <ReactTags tags={tags}
                                                               placeholder = 'Adicione os marcadores'
                                                               suggestions={suggestions}
                                                               handleDelete={this.handleDelete}
                                                               handleAddition={this.handleAddition}
                                                               handleDrag={this.handleDrag}
                                                               delimiters={delimiters}
                                                               inputFieldPosition="inline"
                                                               inline
                                                               autofocus={true}
                                                               id="inputId"
                                                               classNames={{
                                                                   tags: 'tagsClass',
                                                                   tagInput: 'tagInputClass',
                                                                   tagInputField: 'form-control focus',
                                                                   selected: 'selectedClass',
                                                                   tag: 'badge badge-dark badge-md',
                                                                   remove: 'removeClass',
                                                                   suggestions: 'suggestionsClass list-group-item',
                                                                   activeSuggestion: 'activeSuggestionClass list-group-item active'
                                                               }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <label htmlFor="name_author">Nome do Autor:</label>
                                                    <input type="text" value={this.state.post.author.name}
                                                           onChange={this.onInputChangeAuthor} ref={(input) => {
                                                        return this.e = input
                                                    }}
                                                           name="name_author" id="name_author"
                                                           className="form-control" autoComplete="name_author"
                                                           placeholder="Nome do autor" required/>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <label htmlFor="title">Título:</label>
                                                    <input type="title" value={this.state.post.title}
                                                           onChange={this.onInputChange} ref={(input) => {
                                                        return this.e = input
                                                    }} name="title"
                                                           id="title"
                                                           className="form-control" autoComplete="title"
                                                           placeholder="Título do Post" required/>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <label htmlFor="body">Texto:</label>
                                                    <textarea value={this.state.post.body} onChange={this.onInputChange}
                                                              ref={(input) => {
                                                                  return this.e = input
                                                              }} name="body"
                                                              id="body" className="form-control" autoComplete="corpo"
                                                              placeholder="Corpo do Post" cols="5" rows="5" required>

                                            </textarea>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <label htmlFor="image">Adicionar imagem:</label>
                                                    <input type="file" ref="image" onChange={this.onFileChange} name="image"
                                                           id="image"
                                                           className="form-control" autoComplete="image" required/>

                                                </div>
                                            </div>
                                            <div className="form-row float-right">
                                                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <input type="button" ref="btn" value={this.state.loading}
                                                           onClick={this.handleSubmit}
                                                           className="btn btn-primary onclick" />
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