import React, { Component } from 'react';
import {Alert} from 'react-bootstrap';

class Alerts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            alerts: [],
        };

        this.onDismiss = this.onDismiss.bind(this);
        this.onMessage = this.onMessage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ message: nextProps.alerts, visible: nextProps.visible });
    }

    onDismiss() {
        this.setState({visible: false});
    }

    onMessage(message) {
        this.setState({visible: true});
        console.log(message);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <Alert dismissible variant={this.state.alerts.class} show={this.state.visible} onClose={this.onDismiss} className="text-center">
                            <strong>{this.state.alerts.message}</strong>
                        </Alert>
                    </div>
                </div>
            </div>
        );
    }
}

export default Alerts;