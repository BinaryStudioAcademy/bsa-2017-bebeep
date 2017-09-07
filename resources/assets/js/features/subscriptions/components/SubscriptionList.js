import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {setSubscriptions} from '../actions';
import {getSubscriptions} from 'app/services/SubscriptionService';
import Preloader from 'app/components/Preloader';

class SubscriptionList extends React.Component {
    constructor() {
        super();

        this.state = {
            preloader: false
        };
    }

    componentWillMount() {
        const {setSubscriptions} = this.props;
        this.setState({preloader: true});
        getSubscriptions().then(response => {
            this.setState({preloader: false});
            setSubscriptions(response.data);
        });
    }

    render() {
        const {translate, subscriptions} = this.props,
            {preloader} = this.state;

        return (
            <div className="subscription-list">
                { preloader
                    ? <Preloader enable={preloader} />
                    : _.map(subscriptions, (id) => (
                        <div></div>
                    ))
                }

            </div>
        );
    }
}

export default connect(
    state => ({
        translate: getTranslate(state.locale),
        subscriptions: state.subscriptions.subscriptions
    }),
    dispatch => bindActionCreators({setSubscriptions}, dispatch)
)(SubscriptionList);
