import React from 'react';
import {localize} from 'react-localize-redux';

import "../../styles/public-profile.scss";
import {calcRatingData, fetchReceivedByDriverRating} from "../../../../app/services/ReviewService";
import Preloader from 'app/components/Preloader';

class DriverRating extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            rating: null
        }
    }

    componentDidMount() {
        this.getRating();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.driver === nextProps.driver) {
            return;
        }

        this.getRating();
    }

    getRating() {
        this.setState({rating: null, loading: true});

        fetchReceivedByDriverRating(this.props.driver)
            .then((response) => {
                this.setState({rating: response.data, loading: false});
            })
            .catch(() => {
                this.setState({loading: false});
            });
    }

    render() {
        const { translate } = this.props;

        if (this.state.loading) {
            return (<div className="rating-info"><Preloader enable={true}/></div>);
        }

        let rating = calcRatingData(this.state.rating);

        return (
            <div className="rating-info">
                <div className="row">
                    <div className="col-sm-6 text-center">
                        <div className="rating-block">
                            <h5>{translate('driver_public_profile.driver_rating')}</h5>
                            <h2 className="bold padding-bottom-7"><i className="fa fa-star" aria-hidden="true"></i>{rating.avg.toFixed(2)} <span className="small-text">/ 5</span></h2>
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
                                    <div className="progress-bar bg-success" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="5" style={{width: rating.byMark[5].percent + '%'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="pull-right rating__count">{rating.byMark[5].count}</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left rating__marker">
                                <div className="rating-marker">4 </div>
                            </div>
                            <div className="pull-left rating__progress">
                                <div className="progress rating-progress">
                                    <div className="progress-bar bg-primary" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="5" style={{width: rating.byMark[4].percent + '%'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="pull-right rating__count">{rating.byMark[4].count}</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left rating__marker">
                                <div className="rating-marker">3</div>
                            </div>
                            <div className="pull-left rating__progress">
                                <div className="progress rating-progress">
                                    <div className="progress-bar bg-info" role="progressbar" aria-valuenow="3" aria-valuemin="0" aria-valuemax="5" style={{width: rating.byMark[3].percent + '%'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="pull-right rating__count">{rating.byMark[3].count}</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left rating__marker">
                                <div className="rating-marker">2</div>
                            </div>
                            <div className="pull-left rating__progress">
                                <div className="progress rating-progress">
                                    <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="2" aria-valuemin="0" aria-valuemax="5" style={{width: rating.byMark[2].percent + '%'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="pull-right rating__count">{rating.byMark[2].count}</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left rating__marker">
                                <div className="rating-marker">1</div>
                            </div>
                            <div className="pull-left rating__progress">
                                <div className="progress rating-progress">
                                    <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="5" style={{width: rating.byMark[1].percent + '%'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="pull-right rating__count">{rating.byMark[1].count}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default localize(DriverRating, 'locale');
