import React from 'react';
import {localize} from 'react-localize-redux';

class SubscriptionList extends React.Component {
    render() {
        const {translate} = this.props;

        return (
            <div>

            </div>
        );
    }
}

export default localize(SubscriptionList, 'locale');
