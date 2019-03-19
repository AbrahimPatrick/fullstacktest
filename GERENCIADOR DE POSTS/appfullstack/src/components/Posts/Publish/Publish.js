import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {putdata} from "../../../services/putdata";
import {refresh} from "../../../services/auth/refresh/refresh";

class Publish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            redirect: false,
        }
    }

    componentDidMount(){
        this.setState({redirect: refresh()});

        if(!this.state.redirect) {
            putdata('api/post/publicar/' + this.state.id).then((result) => {
                let responseJSON = result;
                console.log(responseJSON);
            });
        }
    }

    render() {
        if(this.state.redirect) {
            return (<Redirect to={'/'}/>)
        } else {
            return (
                <Redirect to={'/posts'}/>
            )
        }
    }
}

export default Publish;