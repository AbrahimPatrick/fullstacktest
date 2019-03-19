import React, {Component} from 'react';
import './App.scss';
import {Switch, Route} from 'react-router-dom';
import List from "./components/Posts/List/List";
import Show from "./components/Posts/Show/Show";
import Footer from "./components/Layout/Footer/Footer";
import Carousel from "./components/Layout/Carousel/Carousel";
import Navbar from "./components/Layout/Navbar/Navbar";

class App extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid min-height">
                    <div className="row">
                        <div className="col">
                            <Navbar/>
                            <Carousel />
                            <Switch>
                                <Route path="/" exact component={List} />
                                <Route path="/post/:slug" exact component={Show} />
                            </Switch>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;
