import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import SeatsDropDown from '../Dropdowns/SeatsDropDown';
import RatingDropDown from '../Dropdowns/RatingDropDown';
import AnimalsDropDown from '../Dropdowns/AnimalsDropDown';
import LuggageDropDown from '../Dropdowns/LuggageDropDown';
import ConfirmLoginModal from './ConfirmLoginModal';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import {Range} from 'rc-slider';
import {getTranslate} from 'react-localize-redux';
import {transformSubscriptionData,sendSubscribeRequest} from 'features/search/services/SearchService';
import 'features/search/styles/subscribe-modal.scss';
import AuthService from 'app/services/AuthService';
import { subscriptionUpdate, subscriptionReset } from 'features/search/actions';

class SubscribeModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            price: [0, 2000],
            time: [0, 24],
            animals: null,
            luggage: null,
            seats: null,
            rating: null,
            currency: null,
            requestSendSuccess: false,
            confirmLoginModalIsOpen: false
        };
        this.animalsChange = this.animalsChange.bind(this);
        this.luggageChange = this.luggageChange.bind(this);
        this.seatsChange = this.seatsChange.bind(this);
        this.ratingChange = this.ratingChange.bind(this);
    }

    updateFilterData(props) {
        const {data, activeCurrency} = props;

        this.setState({
            time: data.filters.time,
            animals: data.filters.animals,
            luggage: data.filters.luggage,
            seats: data.filters.seats,
            rating: data.filters.rating,
            start_at: data.start_at,
            currency: data.currency || activeCurrency,
        });
    }

    componentWillMount() {
        this.updateFilterData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateFilterData(nextProps);
    }

    animalsChange(e) {
        this.setState({animals: e.target.value});
    }

    luggageChange(e) {
        this.setState({luggage: e.target.value});
    }

    seatsChange(e) {
        this.setState({seats: e.target.value});
    }

    ratingChange(e) {
        this.setState({rating: e.target.value});
    }

    renderModalBody() {
        let {requestSendSuccess} = this.state;
        const {time, price, animals, seats, luggage, rating, currency} = this.state,
            {translate, data} = this.props;

        if(requestSendSuccess) {
            return (
                <div className="alert alert-success" role="alert">
                    <strong>{translate('subscription.success-great')}</strong> {translate('subscription.success-text')}
                </div>
            );
        } else {
            return (
                <div>
                    <div className="subscribe-modal__body-routes mt-2 ml-3 mb-4">
                        <div className="subscribe-modal__body-routes-header pb-2">
                            <i className="subscribe-modal-icon subscribe-modal-icon-big v-align-bottom fa fa-road" aria-hidden="true"></i>
                            <span className="subscribe-modal__body-routes-title">{translate('subscription.route')}</span>
                        </div>
                        <div className="subscribe-modal__body-routes-main pl-4">
                            <span className="text-muted">{translate('subscription.from')}</span><span>{data.from.name}</span><br/>
                            <span className="text-muted">{translate('subscription.to')}</span><span>{data.to.name}</span><br/>
                        </div>
                    </div>
                    <div className="subscribe-modal__body-filters ml-3 mb-3 mr-3">
                        <div className="subscribe-modal__body-filters-header pb-2">
                            <i className="subscribe-modal-icon subscribe-modal-icon-big v-align-bottom fa fa-tasks" aria-hidden="true"></i>
                            <span className="subscribe-modal__body-routes-title">{translate('subscription.filters')}</span>
                        </div>
                        <div className="subscribe-modal__body-filters-main pl-4">
                            <div className="row">
                                <div className="col-md-6 pr-4">
                                    <div className="filter__prop">
                                        <div className="filter__prop-name subscribe-modal-name">{translate('search_result.filter.time-text')}</div>
                                        <div className="filter__prop-control">
                                            <div className="filter__prop-name subscribe-modal-name">
                                                {translate('search_result.filter.time-value', {start: time[0], end: time[1]})}
                                            </div>
                                            <Range
                                                min={0}
                                                max={24}
                                                allowCross={false}
                                                value={time}
                                                onChange={(time) => this.setState({time})}
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
                                        <div className="filter__prop-name subscribe-modal-name">{translate('search_result.filter.price')}</div>
                                        <div className="filter__prop-control">
                                            <div className="filter__prop-name subscribe-modal-name">
                                                {translate('search_result.filter.price_range', {
                                                    start: price[0],
                                                    end: price[1],
                                                    currency: currency ? currency.sign : ''
                                                })}
                                            </div>
                                            <Range
                                                min={0}
                                                max={2000}
                                                step={10}
                                                allowCross={false}
                                                value={price}
                                                onChange={(price) => this.setState({price})}
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
                </div>
            );
        }
    }

    renderModalFooter() {
        let {requestSendSuccess} = this.state;

        const userEmail = AuthService.getEmail(),
            {translate, isAuth, email} = this.props,
            authClass = (isAuth && userEmail) ? ' subscribe-modal__footer-label-hidden' : '';

        if(!requestSendSuccess) {
            return (
                <ModalFooter>
                    <div className="col-md-12">
                        <form role="form" method="POST" action="/api/v1/subscription" onSubmit={this.onSubmit.bind(this)}>
                            <div className="row ml-2">
                                <div className="col-md-5">
                                    <div className={authClass}>
                                        <label htmlFor="email" className="form-control-label subscribe-modal__footer-label">
                                            {translate('subscription.enter-email')}
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder={translate('subscription.email-placeholder')}
                                            required={(isAuth && userEmail) ? false : 'required'}
                                        />
                                    </div>
                                </div>
                                <div className={"col-md-3 offset-md-4" + (isAuth && email ? '' : " pt-4")}>
                                    <Button outline color="success" className="hover" >{translate('subscription.subscribe_btn')}</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ModalFooter>
            );
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const userId = AuthService.getUserId(),
            userEmail = AuthService.getEmail(),
            {isAuth, email, data} = this.props,
            {time, animals, luggage, seats, rating, price} = this.state;

        let subsEmail = (isAuth && userEmail) ? userEmail : e.target['email'].value;
        let toBeTransformed = {
            userId,
            time,
            animals,
            luggage,
            seats,
            rating,
            price,
            subsEmail,
            data
        };
        let requestData = transformSubscriptionData(toBeTransformed);

        this.props.subscriptionUpdate(requestData);

        sendSubscribeRequest(requestData).
            then(response => {
                if (response.status === 200) {
                    this.setState({requestSendSuccess: true});
                    this.props.subscriptionReset();
                }
            }).catch((error) => {
                if (error.response.status === 422) {
                    if (error.response.data.errors.email.user_exists === true) {
                        this.setState({confirmLoginModalIsOpen: true});
                    }
                }
            });
    }

    render() {
        const {translate, isOpen, onClosed} = this.props;

        return (
            <span>
                <Modal className="subscribe-modal" size="lg" isOpen={isOpen} toggle={onClosed}>
                    <ModalHeader className="subscribe-modal__header" toggle={onClosed}>
                        <i className="subscribe-modal-icon fa fa-rss" aria-hidden="true" title={translate('subscription.info')}/>
                        <span className="subscribe-modal__header-text" title={translate('subscription.info')}>{translate('subscription.subscribe_header')}</span>
                    </ModalHeader>
                    <ModalBody className="p-15">{ this.renderModalBody() }</ModalBody>
                    { this.renderModalFooter() }

                    <ConfirmLoginModal
                        isOpen={this.state.confirmLoginModalIsOpen}
                        onClosed={ () => this.setState({confirmLoginModalIsOpen: false})}
                    />
                </Modal>
            </span>
        )
    }
}

export default connect(
    state => ({
        data: state.search,
        isAuth: state.user.login.success,
        email: state.user.profile.email,
        activeCurrency: state.currency.activeCurrency,
        currencies: state.currency.currencies,
        translate: getTranslate(state.locale)
    }),
    (dispatch) => bindActionCreators({subscriptionUpdate, subscriptionReset}, dispatch)
)(SubscribeModal);
