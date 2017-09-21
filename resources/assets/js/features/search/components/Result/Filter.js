import React from 'react';
import SeatsDropDown from 'features/search/components/Result/Dropdowns/SeatsDropDown';
import AnimalsDropDown from 'features/search/components/Result/Dropdowns/AnimalsDropDown';
import LuggageDropDown from 'features/search/components/Result/Dropdowns/LuggageDropDown';
import RatingDropDown from 'features/search/components/Result/Dropdowns/RatingDropDown';
import TransferDropDown from 'features/search/components/Result/Dropdowns/TransferDropDown';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import { getTranslate } from 'react-localize-redux';
import { Range } from 'rc-slider';

import { setUrl, setFilter, getFilter} from 'features/search/services/SearchService';
import CurrencyService from 'features/currency/services/CurrencyService';

import 'features/search/styles/filter.scss';

class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            time: [0, 24],
            price: [0, 0],
            priceDisplay: [0, 0],
            priceCurrency: null,
            animals: null,
            seats: null,
            luggage: null,
            rating: null,
            transfers: null
        };
        this.timeChange = this.timeChange.bind(this);
        this.priceChange = this.priceChange.bind(this);
        this.isAnimalsAllowedChange = this.isAnimalsAllowedChange.bind(this);
        this.luggageChange = this.luggageChange.bind(this);
        this.seatsChange = this.seatsChange.bind(this);
        this.ratingChange = this.ratingChange.bind(this);
        this.transfersChange = this.transfersChange.bind(this);
    }

    componentWillMount() {
        this.updateState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateState(nextProps);

        const currency = this.state.priceCurrency;
            //priceDisplay = [...this.state.price];

        //console.log(priceDisplay);

        /*priceDisplay[0] = CurrencyService.convertValue(priceDisplay[0], currency);
        priceDisplay[1] = CurrencyService.convertValue(priceDisplay[1], currency);

        this.setState({ priceDisplay });*/
    }

    updateState(props) {
        const {query} = props.location;
        let filter = getFilter();

        if (!filter.price || (filter.price[0] === 0 && filter.price[1] === 0)) {
            filter.price = props.priceBounds;
        }

        this.setState(Object.assign({
            price: [0, 0],
            priceCurrency: props.activeCurrency,
            time: [0, 24],
            animals: null,
            luggage: null,
            seats: null,
            rating: null,
            transfers: null
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

    transfersChange(e) {
        setUrl(setFilter({transfers: e.target.value}));
    }

    render() {
        const { time, price, priceDisplay, animals, seats, luggage, rating, transfers } = this.state,
            { priceBounds, translate, activeCurrency } = this.props,
            priceFilterLabelHide = !activeCurrency.sign ? ' hide' : '';

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
                        <div className={"filter__prop-sign" + priceFilterLabelHide}>
                            {translate('search_result.filter.price_range', {
                                start: priceDisplay[0],
                                end: priceDisplay[1],
                                currency: activeCurrency.sign,
                            })}
                        </div>
                        <Range
                            min={priceBounds[0]}
                            max={priceBounds[1]}
                            step={1}
                            allowCross={false}
                            defaultValue={[priceBounds[0], priceBounds[1]]}
                            value={price}
                            onChange={(price) => this.setState({price})}
                            onAfterChange={this.priceChange}
                            pushable
                        />
                    </div>
                </div>
                <AnimalsDropDown
                    value={animals}
                    onChange={this.isAnimalsAllowedChange}
                />
                <LuggageDropDown
                    value={luggage}
                    onChange={this.luggageChange}
                />
                <SeatsDropDown
                    value={seats}
                    onChange={this.seatsChange}
                />
                <RatingDropDown
                    value={rating}
                    onChange={this.ratingChange}
                />
                <TransferDropDown
                    value={transfers}
                    onChange={this.transfersChange}
                />

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
        translate: getTranslate(state.locale),
        activeCurrency: state.currency.activeCurrency,
    })
)(Filter));
