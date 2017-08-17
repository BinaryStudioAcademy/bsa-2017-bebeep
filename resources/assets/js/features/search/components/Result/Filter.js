import React from 'react';
import DatePicker from 'react-datepicker';
import Slider, {Range} from 'rc-slider';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {filter} from '../../actions';
import '../../styles/filter.scss';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment.unix(props.startDate),
            timeRange: props.filterData.time,
            priceRange: props.filterData.price,
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
        this.props.filter({
            date: startDate ? startDate.unix() : null,
            time: timeRange,
            price: priceRange,
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.startDate !== this.state.startDate) {
            this.setFilter(nextState);
        }
        return true;
    }

    render() {
        const { timeRange, priceRange, startDate } = this.state;
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
                            defaultValue={timeRange}
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
                            min={0}
                            max={1000}
                            step={10}
                            allowCross={false}
                            defaultValue={[0, 1000]}
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

export default connect(
    (state) => ({
        filterData: state.search.filter,
        startDate: state.search.start_at,
    }),
    (dispatch) => bindActionCreators({filter}, dispatch)
)(Filter);