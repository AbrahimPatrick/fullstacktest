import React, {Component} from 'react';
import phpstorm from './../../../image/phpstorm.png';
import html from './../../../image/html.png';
import chrome from './../../../image/chrome.png';
import workbench from './../../../image/workbench.png';

class Carousel extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row margin-top-100">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators bg-secondary">
                                    <li data-target="#carouselExampleIndicators" data-slide-to="0"
                                        className="active" />
                                    <li data-target="#carouselExampleIndicators" data-slide-to="1" />
                                    <li data-target="#carouselExampleIndicators" data-slide-to="2" />
                                    <li data-target="#carouselExampleIndicators" data-slide-to="3" />
                                </ol>
                                <div className="carousel-inner rounded border border-secondary">
                                    <div className="carousel-item active">
                                        <img className="" src={phpstorm} alt="First slide" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="" src={workbench} alt="Second slide" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="" src={html} alt="Third slide" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="" src={chrome} alt="Four slide" />
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                                   data-slide="prev">
                                    <span className="carousel-control-prev-icon bg-secondary" aria-hidden="true" />
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
                                   data-slide="next">
                                    <span className="carousel-control-next-icon  bg-secondary" aria-hidden="true" />
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Carousel;