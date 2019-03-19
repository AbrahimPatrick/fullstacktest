import React, { Component } from "react";

class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <footer className="footer">
                <p className="text-center text-light footer-p">
                    Copyright © Patrick Abrahim 2019. All right reserved.
                </p>
            </footer>
        )
    }
}
export default Footer;
