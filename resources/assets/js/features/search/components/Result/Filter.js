import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import { getTranslate } from 'react-localize-redux';
import Slider, { Range } from 'rc-slider';

import { setUrl, setFilter, getFilter} from 'features/search/services/SearchService';

import 'features/search/styles/filter.scss';

class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            time: [0, 24],
            price: [0, 0],
            animals: null,
            seats: null,
            luggage: null,
            rating: null,
            transfer: null
        };
        this.timeChange = this.timeChange.bind(this);
        this.priceChange = this.priceChange.bind(this);
        this.isAnimalsAllowedChange = this.isAnimalsAllowedChange.bind(this);
        this.luggageChange = this.luggageChange.bind(this);
        this.seatsChange = this.seatsChange.bind(this);
        this.ratingChange = this.ratingChange.bind(this);
        this.transferChange = this.transferChange.bind(this);
    }

    componentWillMount() {
        this.updateState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateState(nextProps);
    }

    updateState(props) {
        const {query} = props.location;
        let filter = getFilter();
        this.setState(Object.assign({
            price: props.priceBounds,
            time: [0, 24],
            animals: null,
            luggage: null,
            seats: null,
            rating: null,
            transfer: null
        }, filter));
    }

    timeChange(time) {
        setUrl(setFilter({time: time}));
    }

    priceChange(price) {
        setUrl(setFilter({price: price}));
    }

    isAnimalsAllowedChange(e) {
        setUrl(setFilter({animals: e.target.value}));
    }

    luggageChange(e) {
        setUrl(setFilter({luggage: e.target.value}));
    }

    seatsChange(e) {
        setUrl(setFilter({seats: e.target.value}));
    }

    ratingChange(e) {
        setUrl(setFilter({rating: e.target.value}));
    }

    transferChange(e) {
        setUrl(setFilter({transfer: e.target.value}));
    }

    render() {
        const { time, price } = this.state;
        const { priceBounds, translate } = this.props;

        return (
            <div className="filter filter-centered">
                <div className="filter__prop">
                        <div className="filter__prop-name">{translate('search_result.filter.time-text')}</div>
                        <div className="filter__prop-control">
                            <div className="filter__prop-sign">
                                {translate('search_result.filter.time-value', {start: time[0], end: time[1]})}
                            </div>
                            <Range
                                min={0}
                                max={24}
                                allowCross={false}
                                value={time}
                                onChange={(time) => this.setState({time})}
                                onAfterChange={this.timeChange}
                                pushable
                            />
                        </div>
                </div>
                <div className="filter__prop">
                    <div className="filter__prop-name">{translate('search_result.filter.price')}</div>
                    <div className="filter__prop-control">
                        <div className="filter__prop-sign">
                            {translate('search_result.filter.price_range', {start: price[0],end: price[1]})}
                        </div>
                        <Range
                            min={priceBounds[0]}
                            max={priceBounds[1]}
                            step={10}
                            allowCross={false}
                            defaultValue={[priceBounds[0], priceBounds[1]]}
                            value={price}
                            onChange={(price) => this.setState({price})}
                            onAfterChange={this.priceChange}
                            pushable
                        />
                    </div>
                </div>
                <div className="filter__prop">
                    <div className="filter__prop-name">{translate('search_result.additional_conditions')}</div>

                    <div className="filter__prop-control">
                        <div className="filter__prop-sign">
                            {translate('search_result.animals')}
                        </div>

                        <select name="is_animals_allowed" value={this.state.animals || ''} className="form-control" id="is_animals_allowed" onChange={this.isAnimalsAllowedChange}>
                            <option value="">{translate('search_result.not_important')}</option>
                            <option value="1">{translate('search_result.allowed')}</option>
                            <option value="0">{translate('search_result.forbidden')}</option>
                        </select>
                    </div>

                    <br/>

                    <div className="filter__prop-control">
                        <div className="filter__prop-sign">
                            {translate('search_result.luggage_size')}
                        </div>

                        <select name="luggage" value={this.state.luggage || ''} className="form-control" id="luggage" onChange={this.luggageChange}>
                            <option value="">{translate('search_result.not_important')}</option>
                            <option value="0">{translate('search_result.luggage_size_0')}</option>
                            <option value="1">{translate('search_result.luggage_size_1')}</option>
                            <option value="2">{translate('search_result.luggage_size_2')}</option>
                        </select>
                    </div>

                    <br/>

                    <div className="filter__prop-control">
                        <div className="filter__prop-sign">
                            {translate('search_result.free_seats')}
                        </div>

                        <select name="seats" value={this.state.seats || ''} className="form-control" id="seats" onChange={this.seatsChange}>
                            <option value="">{translate('search_result.not_important')}</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">>=4</option>
                        </select>
                    </div>

                    <br/>

                    <div className="filter__prop-control">
                        <div className="filter__prop-sign">
                            {translate('search_result.driver_rating')}
                        </div>

                        <select name="rating" value={this.state.rating || ''} className="form-control" id="rating" onChange={this.ratingChange}>
                            <option value="">{translate('search_result.not_important')}</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div className="filter__prop-control">
                        <div className="filter__prop-sign">
                            {translate('search_result.transfer')}
                        </div>

                        <select name="transfer" value={this.state.transfer || ''} className="form-control" id="transfer" onChange={this.transferChange}>
                            <option value="1">{translate('search_result.transfer1')}</option>
                            <option value="2">{translate('search_result.transfer2')}</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

Filter.PropTypes = {
    priceBounds: PropTypes.array
};

export default withRouter(connect(
    (state) => ({
        start_at: state.search.start_at,
        translate: getTranslate(state.locale)
    })
)(Filter));
