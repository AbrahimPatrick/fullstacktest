import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {refresh} from "../../../services/auth/refresh/refresh";

class Delete extends Component {
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
            //Função não solicitada. Caso necessite, habilitar futuramente.
            /*
            deletedata('api/excluir/' + this.state.id).then((result) => {
                let responseJSON = result;
                console.log(responseJSON);
            });*/
        }
    }

    render() {
        if(this.state.redirect) {
            return (<Redirect to={'/'}/>)
        } else {
            return (<Redirect to={'/usuarios'}/>)
        }
    }
}

export default Delete;