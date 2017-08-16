import React from 'react';
import DatePicker from 'react-datepicker';
import Slider, {Range} from 'rc-slider';
import moment from 'moment';
import '../../styles/filter.scss';

class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            startDate: null,
            timeRange: [0, 24],
            priceRange: [10, 300],
        };
    }

    render() {
        const { timeRange, priceRange } = this.state;
        return (
            <div className="filter">
                <div className="filter__prop">
                    <div className="filter__prop-name">Date</div>
                    <div className="filter__prop-control">
                        <DatePicker
                            todayButton={"Today"}
                            selected={this.state.startDate}
                            onChange={date => this.setState({startDate: date})}
                            placeholderText="Date"
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
                            onChange={(value) => this.setState({timeRange: value})}
                            pushable
                        />
                    </div>
                </div>
                <div className="filter__prop">
                    <div className="filter__prop-name">Price</div>
                    <div className="filter__prop-control">
                        <div className="filter__prop-sign">
                            From
                            <span className="filter__currency">$</span>{priceRange[0]}
                            to
                            <span className="filter__currency">$</span>{priceRange[1]}
                        </div>
                        <Range
                            min={10}
                            max={300}
                            step={10}
                            allowCross={false}
                            defaultValue={priceRange}
                            onChange={(value) => this.setState({priceRange: value})}
                            pushable
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;