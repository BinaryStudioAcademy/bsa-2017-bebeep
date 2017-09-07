import React from 'react';
import {connect} from 'react-redux';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import {Range} from 'rc-slider';
import {getTranslate} from 'react-localize-redux';
import {simpleRequest} from 'app/services/RequestService';
import {transformSubscriptionData} from 'features/search/services/SearchService';
import 'features/search/styles/subscribe-modal.scss';

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
            requestSendSuccess: false
        };
        this.animalsChange = this.animalsChange.bind(this);
        this.luggageChange = this.luggageChange.bind(this);
        this.seatsChange = this.seatsChange.bind(this);
        this.ratingChange = this.ratingChange.bind(this);
    }

    updateFilterData(data) {
        this.setState({
            time: data.filters.time,
            animals: data.filters.animals,
            luggage: data.filters.luggage,
            seats: data.filters.seats,
            rating: data.filters.rating,
            start_at: data.start_at
        });
    }

    componentWillMount() {
        this.updateFilterData(this.props.data);
    }

    componentWillReceiveProps(nextProps) {
        this.updateFilterData(nextProps.data);
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

    onSubmit(e) {
        e.preventDefault();
        const formEmail = e.target['email'].value,
            {email, data} = this.props,
            {time, animals, luggage, seats, rating, price} = this.state;

        let subsEmail = formEmail ? formEmail : email;
        let toBeTransformed = {
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
        simpleRequest.post('api/v1/subscription', requestData)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({requestSendSuccess: true});
                }
            });
    }

    render() {
        const {translate, isOpen, onClosed, data, isAuth, email} = this.props;
        const {time, price, animals, seats, luggage, rating, requestSendSuccess} = this.state;
        const authClass = (isAuth && email) ? ' subscribe-modal__footer-label-hidden' : '';

        return (
            <span>

                <Modal className="subscribe-modal" size="lg" isOpen={isOpen} toggle={onClosed}>
                    <ModalHeader className="subscribe-modal__header" toggle={onClosed}>
                        <i className="subscribe-modal-icon fa fa-rss" aria-hidden="true" title={translate('subscription.info')}/>
                        <span className="subscribe-modal__header-text" title={translate('subscription.info')}>{translate('subscription.subscribe_header')}</span>
                    </ModalHeader>
                    <ModalBody className="p-15">
                    {(requestSendSuccess) ?
                        (
                        <div className="alert alert-success" role="alert">
                            <strong>{translate('subscription.success-great')}</strong> {translate('subscription.success-text')}
                        </div>
                        )
                        :
                        (
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
                                            <div className="filter__prop">
                                            <div className="filter__prop-control">
                                                <div className="filter__prop-name subscribe-modal-name">
                                                    {translate('search_result.animals')}
                                                </div>
                                                <select name="is_animals_allowed" value={animals || ''} className="form-control" id="is_animals_allowed" onChange={this.animalsChange}>
                                                    <option value="">{translate('search_result.not_important')}</option>
                                                    <option value="1">{translate('search_result.allowed')}</option>
                                                    <option value="0">{translate('search_result.forbidden')}</option>
                                                </select>
                                            </div>
                                            </div>
                                            <div className="filter__prop">
                                                <div className="filter__prop-control">
                                                    <div className="filter__prop-name subscribe-modal-name">
                                                        {translate('search_result.luggage_size')}
                                                    </div>
                                                    <select name="luggage" value={luggage || ''} className="form-control" id="luggage" onChange={this.luggageChange}>
                                                        <option value="">{translate('search_result.not_important')}</option>
                                                        <option value="0">{translate('search_result.luggage_size_0')}</option>
                                                        <option value="1">{translate('search_result.luggage_size_1')}</option>
                                                        <option value="2">{translate('search_result.luggage_size_2')}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 pr-4">
                                            <div className="filter__prop">
                                                <div className="filter__prop-name subscribe-modal-name">{translate('search_result.filter.price')}</div>
                                                <div className="filter__prop-control">
                                                    <div className="filter__prop-name subscribe-modal-name">
                                                        {translate('search_result.filter.price_range', {start: price[0], end: price[1]})}
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
                                            <div className="filter__prop">
                                                <div className="filter__prop-control">
                                                    <div className="filter__prop-name subscribe-modal-name">
                                                        {translate('search_result.free_seats')}
                                                    </div>
                                                    <select name="seats" value={seats || ''} className="form-control" id="seats" onChange={this.seatsChange}>
                                                        <option value="">{translate('search_result.not_important')}</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">{translate('search_result.more')}4</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="filter__prop">
                                                <div className="filter__prop-control">
                                                    <div className="filter__prop-name subscribe-modal-name">
                                                        {translate('search_result.driver_rating')}
                                                    </div>
                                                    <select name="rating" value={rating || ''} className="form-control" id="rating" onChange={this.ratingChange}>
                                                        <option value="">{translate('search_result.not_important')}</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    }
                    </ModalBody>
                    {(requestSendSuccess) ? ('') : (
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
                                                required={email ? false : 'required'}
                                            />
                                        </div>
                                    </div>
                                    <div className={"col-md-3 offset-md-4" + (isAuth && email ? '' : " pt-4")}>
                                        <Button outline color="success" className="hover" >{translate('subscription.subscribe_btn')}</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </ModalFooter> ) }
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
        translate: getTranslate(state.locale)
    })
)(SubscribeModal);
