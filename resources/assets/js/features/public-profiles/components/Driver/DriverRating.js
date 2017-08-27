import React from 'react';
import {localize} from 'react-localize-redux';

import "../../styles/driver-profile.scss";

class DriverRating extends React.Component {

    render() {
        const { translate } = this.props;

        return (
            <div className="rating-info">
                <div className="row">
                    <div className="col-sm-6 text-center">
                        <div className="rating-block">
                            <h5>{translate('driver_public_profile.driver_rating')}</h5>
                            <h2 className="bold padding-bottom-7"><i className="fa fa-star" aria-hidden="true"></i>4.3 <span className="small-text">/ 5</span></h2>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <h5>{translate('driver_public_profile.driver_rating_breakdown')}</h5>
                        <div className="pull-left">
                            <div className="pull-left rating__marker">
                                <div className="rating-marker">5</div>
                            </div>
                            <div className="pull-left rating__progress">
                                <div className="progress rating-progress">
                                    <div className="progress-bar bg-success" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="5" style={{width:'100%'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="pull-right rating__count">1</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left rating__marker">
                                <div className="rating-marker">4 </div>
                            </div>
                            <div className="pull-left rating__progress">
                                <div className="progress rating-progress">
                                    <div className="progress-bar bg-primary" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="5" style={{width:'100%'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="pull-right rating__count">1</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left rating__marker">
                                <div className="rating-marker">3</div>
                            </div>
                            <div className="pull-left rating__progress">
                                <div className="progress rating-progress">
                                    <div className="progress-bar bg-info" role="progressbar" aria-valuenow="3" aria-valuemin="0" aria-valuemax="5" style={{width:'60%'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="pull-right rating__count">0</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left rating__marker">
                                <div className="rating-marker">2</div>
                            </div>
                            <div className="pull-left rating__progress">
                                <div className="progress rating-progress">
                                    <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="2" aria-valuemin="0" aria-valuemax="5" style={{width:'40%'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="pull-right rating__count">0</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left rating__marker">
                                <div className="rating-marker">1</div>
                            </div>
                            <div className="pull-left rating__progress">
                                <div className="progress rating-progress">
                                    <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="5" style={{width:'20%'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="pull-right rating__count">0</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default localize(DriverRating, 'locale');
