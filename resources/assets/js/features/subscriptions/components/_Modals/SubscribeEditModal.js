import React from 'react';
import moment from 'moment';
import {Range} from 'rc-slider';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {editSubscriptions} from '../../actions';
import {getTranslate} from 'react-localize-redux';
import {getCityLocation} from 'app/helpers/TripHelper';
import DateTimeHelper from 'app/helpers/DateTimeHelper';
import { editSubscription } from 'app/services/SubscriptionService';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import SeatsDropDown from 'features/search/components/Result/Dropdowns/SeatsDropDown';
import RatingDropDown from 'features/search/components/Result/Dropdowns/RatingDropDown';
import AnimalsDropDown from 'features/search/components/Result/Dropdowns/AnimalsDropDown';
import LuggageDropDown from 'features/search/components/Result/Dropdowns/LuggageDropDown';

import 'features/search/styles/subscribe-modal.scss';

class SubscribeEditModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            from: {},
            to: {},
            start_at: null,
            filters: {
                price: [0, 2000],
                time: [0, 24],
                animals: null,
                luggage: null,
                seats: null,
                rating: null
            }
        };

        this.animalsChange = this.animalsChange.bind(this);
        this.luggageChange = this.luggageChange.bind(this);
        this.seatsChange = this.seatsChange.bind(this);
        this.ratingChange = this.ratingChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.priceChange = this.priceChange.bind(this);
        this.timeChange = this.timeChange.bind(this);
    }

    updateFilterData(props) {
        const {subscriptions, filters, id} = props,
            subscription = subscriptions.byId[id];

        this.setState(_.reduce(subscription.filters, (state, filterId) => {
            const filter = filters.byId[filterId];

            if (filter.parameters['value']) {
                state.filters[filter.name] = filter.parameters['value'];
            } else if (filter.parameters['to'] && filter.parameters['from']) {
                state.filters[filter.name] = [
                    filter.parameters['from'],
                    filter.parameters['to']
                ];
            }

            return state;
        }, {
            from: subscription.from,
            to: subscription.to,
            start_at: moment.unix(subscription.start_at_x),
            filters: this.state.filters
        }));
    }

    componentWillMount() {
        this.updateFilterData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateFilterData(nextProps);
    }

    animalsChange(e) {
        this.setState({filters: {
            ...this.state.filters,
            animals: e.target.value
        }});
    }

    luggageChange(e) {
        this.setState({filters: {
            ...this.state.filters,
            luggage: e.target.value
        }});
    }

    seatsChange(e) {
        this.setState({filters: {
            ...this.state.filters,
            seats: e.target.value
        }});
    }

    ratingChange(e) {
        this.setState({filters: {
            ...this.state.filters,
            rating: e.target.value
        }});
    }

    priceChange(price) {
        this.setState({filters: {
            ...this.state.filters,
            price
        }});
    }

    timeChange(time) {
        this.setState({filters: {
            ...this.state.filters,
            time
        }});
    }

    onSubmit(e) {
        e.preventDefault();
        const {id, editSubscriptions, toggle, onSuccess, onError} = this.props,
            data = _.reduce(this.state.filters, (result, filter, name) => {
                if (filter) {
                    if (filter instanceof Array) {
                        result[name] = {from: filter[0], to: filter[1]};
                    } else {
                        result[name] = filter;
                    }
                }

                return result;
            }, {});

        editSubscription(id, {
            filters: data
        }).then((response) => {
            editSubscriptions(response.data);
            toggle();
            onSuccess();
        }).catch((error) => {
            console.error(error);
            onError();
        });
    }

    render() {
        const {translate, isOpen, toggle} = this.props,
            {from, to, start_at, filters} = this.state,
            {price, time, animals, luggage, seats, rating} = filters,
            cityFrom = getCityLocation(from),
            cityTo = getCityLocation(to),
            info = `${cityFrom} - ${cityTo}`,
            date = DateTimeHelper.dateFormat(start_at.unix(), {onlyDate: true});

        return (
            <Modal className="subscribe-modal" size="lg" isOpen={isOpen} toggle={toggle}>
                <ModalHeader className="subscribe-modal__header" toggle={toggle}>
                    <i className="subscribe-modal-icon fa fa-rss" aria-hidden="true" title={info}/>
                    <span className="subscribe-modal__header-text" title={info}>{translate('subscriptions.subscribe_header')}</span>
                </ModalHeader>
                <ModalBody>
                    <div className="subscribe-modal__body-routes mt-2 ml-3 mb-4">
                        <div className="subscribe-modal__body-routes-header pb-2">
                            <i className="subscribe-modal-icon subscribe-modal-icon-big v-align-bottom fa fa-road" aria-hidden="true" />
                            <span className="subscribe-modal__body-routes-title">{translate('subscriptions.route')}</span>
                        </div>
                        <div className="subscribe-modal__body-routes-main pl-4">
                            <span className="text-muted">{translate('subscriptions.from')}</span>
                            <span>{from.formatted_address}</span><br/>
                            <span className="text-muted">{translate('subscriptions.to')}</span>
                            <span>{to.formatted_address}</span><br/>
                            <span className="text-muted">{translate('subscriptions.when')}</span>
                            <span>{date.date}</span><br/>
                        </div>
                    </div>
                    <div className="subscribe-modal__body-filters ml-3 mb-3 mr-3">
                        <div className="subscribe-modal__body-filters-header pb-2">
                            <i className="subscribe-modal-icon subscribe-modal-icon-big v-align-bottom fa fa-tasks" aria-hidden="true" />
                            <span className="subscribe-modal__body-routes-title">{translate('subscriptions.filters')}</span>
                        </div>
                        <div className="subscribe-modal__body-filters-main pl-4">
                            <div className="row">
                                <div className="col-md-6 pr-4">
                                    <div className="filter__prop">
                                        <div className="filter__prop-name subscribe-modal-name">{translate('subscriptions.filter.time-text')}</div>
                                        <div className="filter__prop-control">
                                            <div className="filter__prop-name subscribe-modal-name">
                                                {translate('subscriptions.filter.time-value', {start: time[0], end: time[1]})}
                                            </div>
                                            <Range
                                                min={0}
                                                max={24}
                                                allowCross={false}
                                                value={time}
                                                onChange={this.timeChange}
                                                pushable
                                            />
                                        </div>
                                    </div>
                                    <AnimalsDropDown
                                        value={animals}
                                        onChange={this.animalsChange}
                                    />
                                    <LuggageDropDown
                                        value={luggage}
                                        onChange={this.luggageChange}
                                    />
                                </div>
                                <div className="col-md-6 pr-4">
                                    <div className="filter__prop">
                                        <div className="filter__prop-name subscribe-modal-name">{translate('subscriptions.filter.price')}</div>
                                        <div className="filter__prop-control">
                                            <div className="filter__prop-name subscribe-modal-name">
                                                {translate('subscriptions.filter.price_range', {start: price[0], end: price[1]})}
                                            </div>
                                            <Range
                                                min={0}
                                                max={2000}
                                                step={10}
                                                allowCross={false}
                                                value={price}
                                                onChange={this.priceChange}
                                                pushable
                                            />
                                        </div>
                                    </div>
                                    <SeatsDropDown
                                        value={seats}
                                        onChange={this.seatsChange}
                                    />
                                    <RatingDropDown
                                        value={rating}
                                        onChange={this.ratingChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="col-sm-12 text-right">
                        <Button color="info" className="hover" onClick={this.onSubmit}>
                            {translate('subscriptions.subscribe_save')}
                        </Button>{' '}
                        <Button outline color="danger" className="hover" onClick={toggle}>
                            {translate('subscriptions.subscribe_cancel')}
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
        )
    }
}

SubscribeEditModal.PropTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    id: PropTypes.isRequired,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
};

export default connect(
    state => ({
        subscriptions: state.subscriptions.entities.subscriptions,
        filters: state.subscriptions.entities.filters,
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({editSubscriptions}, dispatch)
)(SubscribeEditModal);
