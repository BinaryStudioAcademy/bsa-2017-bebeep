import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import Slider, {Range} from 'rc-slider';
import moment from 'moment';
import {connect} from 'react-redux';
import '../../styles/filter.scss';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            timeRange: [0, 24],
            priceRange: [0, 0],
        };
        this.dateChange = this.dateChange.bind(this);
        this.timeChange = this.timeChange.bind(this);
        this.priceChange = this.priceChange.bind(this);
    }

    dateChange(startDate) {
        this.setState({startDate});
    }

    timeChange(timeRange) {
        this.setState({timeRange});
    }

    priceChange(priceRange) {
        this.setState({priceRange});
    }

    setFilter({startDate, timeRange, priceRange}) {
        this.props.onChange({
            date: startDate ? startDate.unix() : null,
            time: timeRange,
            price: priceRange,
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        // set low bound price to min if before was min
        if (
            nextProps.priceBounds[0] !== this.props.priceBounds[0]
            &&
            this.props.priceBounds[0] === this.state.priceRange[0]
        ) {
            nextState.priceRange[0] = nextProps.priceBounds[0];
        }
        // set high bound price to max if before was max
        if (
            nextProps.priceBounds[1] !== this.props.priceBounds[1]
            &&
            this.props.priceBounds[1] === this.state.priceRange[1]
        ) {
            nextState.priceRange[1] = nextProps.priceBounds[1];
        }

        if (nextState.startDate !== this.state.startDate) {
            this.setFilter(nextState);
        }

        if (nextProps.resetFilter) {
            nextState.startDate = null;
            nextState.timeRange = [0, 24];
            nextState.priceRange = nextProps.priceBounds;
        }
        return true;
    }

    render() {
        const { timeRange, priceRange, startDate } = this.state;
        const { priceBounds } = this.props;

        return (
            <div className="filter">
                <div className="filter__prop">
                    <div className="filter__prop-name">Date</div>
                    <div className="filter__prop-control">
                        <DatePicker
                            todayButton={"Today"}
                            selected={startDate}
                            onChange={this.dateChange}
                            placeholderText="mm/dd/yyyy"
                            minDate={moment()}
                            className="form-control"
                            isClearable={true}
                        />
                        <div className="filter__prop-sign">Time: {timeRange[0]}h - {timeRange[1]}h</div>
                        <Range
                            min={0}
                            max={24}
                            allowCross={false}
                            value={timeRange}
                            onChange={this.timeChange}
                            pushable
                            onAfterChange={() => this.setFilter(this.state)}
                        />
                    </div>
                </div>
                <div className="filter__prop">
                    <div className="filter__prop-name">Price</div>
                    <div className="filter__prop-control">
                        <div className="filter__prop-sign">
                            From <span className="filter__currency">$</span>{priceRange[0]} to <span className="filter__currency">$</span>{priceRange[1]}
                        </div>
                        <Range
                            min={priceBounds[0]}
                            max={priceBounds[1]}
                            step={10}
                            allowCross={false}
                            defaultValue={[priceBounds[0], priceBounds[1]]}
                            value={priceRange}
                            onChange={this.priceChange}
                            pushable
                            onAfterChange={() => this.setFilter(this.state)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

Filter.PropTypes = {
    priceBounds: PropTypes.array,
    onChange: PropTypes.func
};

export default connect(
    (state) => ({
        filterData: state.search.filter,
        startDate: state.search.start_at,
    })
)(Filter);