import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {
    changeSubscriptionStatus,
    deleteSubscription,
    restoreSubscription
} from 'app/services/SubscriptionService';
import {
    actionChangeSubscriptionStatus,
    actionDeleteSubscription,
    actionRestoreSubscription
} from '../actions';
import '../styles/subscription-item.scss';

class SubscriptionItem extends React.Component {
    constructor() {
        super();

        this.onChangeActive = this.onChangeActive.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onRestore = this.onRestore.bind(this);
    }

    getSubscriptionById(id) {
        return this.props.subscriptions.byId[id];
    }

    getFilterById(id) {
        return this.props.filters.byId[id];
    }

    onChangeActive(e) {
        const {id, actionChangeSubscriptionStatus} = this.props,
            active = e.target.checked;

        changeSubscriptionStatus(id, active)
            .then(() => actionChangeSubscriptionStatus(id, active));
    }

    onDelete() {
        const {id, actionDeleteSubscription} = this.props;

        deleteSubscription(id)
            .then(() => actionDeleteSubscription(id));
    }

    onRestore() {
        const {id, actionRestoreSubscription} = this.props;

        restoreSubscription(id)
            .then(() => actionRestoreSubscription(id));
    }

    render() {
        const {translate, id} = this.props,
            subscription = this.getSubscriptionById(id),
            mainClass = "subscription" + (subscription.is_active ? "" : " subscription--inactive") +
                (subscription.is_deleted ? " subscription--deleted" : "");

        return (
            <div className="subscription">
                <div className="row">
                    <div className="col-sm-1 text-left">
                        <div
                            className="subscription__checkbox round-checkbox round-checkbox--info"
                            title="Active"
                        >
                            <input
                                type="checkbox"
                                className="round-checkbox__control"
                                defaultChecked={subscription.is_active}
                                disabled={subscription.is_deleted}
                                id={"subscription-toggle-"+id}
                            />
                            <label className="round-checkbox__label" htmlFor={"subscription-toggle-"+id} />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        20.04.2017 09:00
                    </div>
                    <div className="col-sm-5">
                        Киев - Львов
                    </div>
                    <div className="col-6 col-sm-1 text-sm-right">
                        <i className="subscription__edit fa fa-pencil" />
                    </div>
                    <div className="col-6 col-sm-1 text-sm-right">
                        <i className="subscription__delete fa fa-close" />
                    </div>
                </div>
            {/*<div className={mainClass}>
                {subscription.start_at}
                <label htmlFor={"subscription-toggle-"+id}>
                    <input
                        type="checkbox"
                        defaultChecked={subscription.is_active}
                        disabled={subscription.is_deleted}
                        id={"subscription-toggle-"+id}
                        onChange={this.onChangeActive}
                    />
                </label>
                {
                    subscription.is_deleted
                        ? (<i className="fa fa-undo" onClick={this.onRestore} />)
                        : (<i className="fa fa-close" onClick={this.onDelete} />)
                }
            </div>*/}
            </div>
        );
    }
}

SubscriptionItem.PropTypes = {
    id: PropTypes.isRequired
};

export default connect(
    state => ({
        translate: getTranslate(state.locale),
        subscriptions: state.subscriptions.entities.subscriptions,
        filters: state.subscriptions.entities.filters
    }),
    dispatch => bindActionCreators({
        actionChangeSubscriptionStatus,
        actionDeleteSubscription,
        actionRestoreSubscription
    }, dispatch)
)(SubscriptionItem);
