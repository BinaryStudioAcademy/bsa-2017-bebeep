import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import Slider, {Range} from 'rc-slider';
import moment from 'moment';
import {connect} from 'react-redux';
import { setUrl, setFilter, getFilter} from '../../services/SearchService';
import { withRouter } from 'react-router';
import '../../styles/filter.scss';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            time: [0, 24],
            price: [0, 0],
        };
        this.dateChange = this.dateChange.bind(this);
        this.timeChange = this.timeChange.bind(this);
        this.priceChange = this.priceChange.bind(this);
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
        if (filter.date) {
            filter.date = moment.unix(filter.date);
        }
        this.setState(Object.assign({
            price: props.priceBounds,
            time: [0, 24],
            date: props.start_at ? moment.unix(props.start_at) : null
        }, filter));
    }

    dateChange(date) {
        setUrl(setFilter({date: date ? date.unix() : null}));
    }

    timeChange(time) {
        setUrl(setFilter({time: time}));
    }

    priceChange(price) {
        setUrl(setFilter({price: price}));
    }

    render() {
        const { time, price, date } = this.state;
        const { priceBounds } = this.props;

        return (
            <div className="filter">
                <div className="filter__prop">
                    <div className="filter__prop-name">Date</div>
                    <div className="filter__prop-control">
                        <DatePicker
                            todayButton={"Today"}
                            selected={date}
                            onChange={this.dateChange}
                            placeholderText="mm/dd/yyyy"
                            minDate={moment()}
                            className="form-control"
                            isClearable={true}
                        />
                        <div className="filter__prop-sign">Time: {time[0]}h - {time[1]}h</div>
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
                    <div className="filter__prop-name">Price</div>
                    <div className="filter__prop-control">
                        <div className="filter__prop-sign">
                            From <span className="filter__currency">$</span>{price[0]} to <span className="filter__currency">$</span>{price[1]}
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
    })
)(Filter));