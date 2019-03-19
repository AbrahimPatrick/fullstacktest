import React, { Component } from 'react';
import './App.scss';
import {Helmet} from "react-helmet";
import { Switch, Route } from 'react-router-dom';
import Login from "./components/Auth/Login/Login";
import Home from "./components/Home/Home";
import Signup from "./components/Users/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import List from "./components/Users/List/List";
import Edit from "./components/Users/Edit/Edit";
import EditPost from "./components/Posts/Edit/Edit";
import Delete from "./components/Users/Delete/Delete";
import DeletePost from "./components/Posts/Delete/Delete";
import New from "./components/Posts/New/New";
import ListPosts from "./components/Posts/List/List";
import Publish from "./components/Posts/Publish/Publish";
import Unpublish from "./components/Posts/Unpublish/Unpublish";
import Footer from "./components/Footer/Footer";

class App extends Component {
  render() {
    return (
        <div>
            <Helmet>
                <style>{'body { background-color: rgba(87, 165, 255, 0.51); }'}</style>
            </Helmet>
            {sessionStorage.getItem("access_token") ? <Navbar /> : ''}
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <Switch>
                  <Route path="/" exact component={Login} />
                  <Route path="/home" exact component={Home} />
                  <Route path="/usuario/novo" exact component={Signup} />
                  <Route path="/usuario/editar/:id" exact component={Edit} />
                  <Route path="/post/editar/:id" exact component={EditPost} />
                  <Route path="/post/publicar/:id" exact component={Publish} />
                  <Route path="/post/despublicar/:id" exact component={Unpublish} />
                  <Route path="/post/excluir/:id" exact component={DeletePost} />
                  <Route path="/usuario/excluir/:id" exact component={Delete} />
                  <Route path="/posts" exact component={ListPosts} />
                  <Route path="/usuarios" exact component={List} />
                  <Route path="/post/novo" exact component={New} />
                </Switch>
              </div>
            </div>
          </div>
            {sessionStorage.getItem("access_token") ? <Footer /> : ''}
        </div>
    );
  }
}

export default App;
