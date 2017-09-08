import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import DateTimeHelper from 'app/helpers/DateTimeHelper';
import {getCityLocation} from 'app/helpers/TripHelper';
import {
    changeSubscriptionStatus,
    deleteSubscription
} from 'app/services/SubscriptionService';
import {
    actionChangeSubscriptionStatus,
    actionDeleteSubscription
} from '../actions';
import SubscribeEditModal from './_Modals/SubscribeEditModal';
import '../styles/subscription-item.scss';

class SubscriptionItem extends React.Component {
    constructor() {
        super();

        this.state = {
            isEditOpen: false,
            isSuccessEdit: false,
            isErrorEdit: false
        };

        this.onChangeActive = this.onChangeActive.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onToggleEdit = this.onToggleEdit.bind(this);
        this.onSuccessEdit = this.onSuccessEdit.bind(this);
        this.onErrorEdit = this.onErrorEdit.bind(this);
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

    onToggleEdit() {
        this.setState({isEditOpen: !this.state.isEditOpen});
    }

    onSuccessEdit() {
        this.setState({isSuccessEdit: true});
        setTimeout(() => {
            this.setState({isSuccessEdit: false});
        }, 2000);
    }

    onErrorEdit() {
        this.setState({isErrorEdit: true});
        setTimeout(() => {
            this.setState({isErrorEdit: false});
        }, 2000);
    }

    render() {
        const {translate, id} = this.props,
            {isEditOpen, isErrorEdit, isSuccessEdit} = this.state,
            subscription = this.getSubscriptionById(id),
            mainClass = "subscription" + (subscription.is_active ? "" : " subscription--inactive") +
                (subscription.is_deleted ? " subscription--deleted" : "") +
                (isErrorEdit ? " subscription--error" : "") +
                (isSuccessEdit ? " subscription--success" : ""),
            date = DateTimeHelper.dateFormat(subscription.start_at_x, {onlyDate: true});

        return (
            <div className={mainClass}>
                <div className="row">
                    <div className="col-sm-1 text-left">
                        <div
                            className="subscription__checkbox round-checkbox round-checkbox--info"
                            title={subscription.is_active ? translate('subscriptions.activate') : translate('subscriptions.deactivate')}
                        >
                            <input
                                type="checkbox"
                                className="round-checkbox__control"
                                defaultChecked={subscription.is_active}
                                disabled={subscription.is_deleted}
                                id={"subscription-toggle-"+id}
                                onChange={this.onChangeActive}
                            />
                            <label className="round-checkbox__label" htmlFor={"subscription-toggle-"+id} />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        {date.date}
                    </div>
                    <div className="col-sm-5">
                        {getCityLocation(subscription.from)} - {getCityLocation(subscription.to)}
                    </div>
                    <div className="col-6 col-sm-1 text-sm-right">
                        <i className="subscription__edit fa fa-pencil"
                           title={translate('subscriptions.edit')}
                           onClick={this.onToggleEdit}
                        />
                    </div>
                    <div className="col-6 col-sm-1 text-sm-right">
                        <i className="subscription__delete fa fa-close"
                            onClick={this.onDelete}
                            title={translate('subscriptions.delete')}
                        />
                    </div>
                </div>
                <SubscribeEditModal
                    id={id}
                    isOpen={isEditOpen}
                    toggle={this.onToggleEdit}
                    onSuccess={this.onSuccessEdit}
                    onError={this.onErrorEdit}
                />
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
        actionDeleteSubscription
    }, dispatch)
)(SubscriptionItem);
