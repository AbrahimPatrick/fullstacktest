import React, {Component} from 'react';
import './App.scss';
import {Switch, Route} from 'react-router-dom';
import List from "./components/Posts/List/List";
import Show from "./components/Posts/Show/Show";
import Footer from "./components/Layout/Footer/Footer";
import Navbar from "./components/Layout/Navbar/Navbar";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: '',
            term: ''
        };
        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(event) {
        this.setState({term: event});
    }

    render() {
        return (
            <div>
                <div className="container-fluid min-height">
                    <Navbar
                        data={this.state.term}
                        setTerm={this.searchHandler}
                    />

                    <Switch>
                        <Route path="/post/:slug" exact component={Show}/>
                        <Route
                            path="/"
                            render=
                                {
                                    (props) =>
                                        <List {...props}
                                              term={this.state.term}
                                        />
                                }
                        />
                    </Switch>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
