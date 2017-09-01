import React from 'react';
import {localize} from 'react-localize-redux';
import ProfileComment from './ProfileComment';
import Preloader from 'app/components/Preloader';

import "../styles/public-profile.scss";
import {fetchReceivedByDriver} from "../../../app/services/ReviewService";

class ProfileCommentsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            reviews: []
        }
    }

    componentDidMount() {
        this.getReviews();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.driver === nextProps.driver) {
            return;
        }

        this.getReviews();
    }

    getReviews() {
        this.setState({reviews: [], loading: true});

        fetchReceivedByDriver(this.props.driver)
            .then((response) => {
                this.setState({reviews: response.data.data, loading: false});
            })
            .catch(() => {
                this.setState({loading: false});
            });
    }

    render() {
        const {translate} = this.props;

        if (this.state.loading) {
            return (<div className="driver__comments"><Preloader enable={true}/></div>);
        }

        if (this.state.reviews.length <= 0) {
            return (<span>&nbsp;</span>);
        }

        return (
            <div className="driver__comments">
                <p className="text-left">
                    <strong>{translate('driver_public_profile.driver_comments')}</strong>
                </p>
                <br/>
                {this.state.reviews.map((review, i) =>
                    <ProfileComment key={i} comment={review}/>
                )}
            </div>
        );
    }
}

export default localize(ProfileCommentsList, 'locale');
