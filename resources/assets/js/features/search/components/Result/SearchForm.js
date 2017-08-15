import React from 'react';
import { connect } from 'react-redux';

class SearchForm extends React.Component {

    constructor() {
        super();
        this.swapFromTo = this.swapFromTo.bind(this);
    }

    swapFromTo() {
        const to = this.inputTo.value;
        this.inputTo.value = this.inputFrom.value;
        this.inputFrom.value = to;
    }

    render() {
        const {tripData} = this.props;
        return (
            <div>
                <input ref={ (input) => this.inputFrom = input } type="text" name="from" placeholder="From" defaultValue={tripData.from.name} />
                <div className="btn" onClick={this.swapFromTo}>&lt;-&gt;</div>
                <input ref={ (input) => this.inputTo = input } type="text" name="to" placeholder="To"  defaultValue={tripData.to.name} />
                <input type="submit" value="Search"/>
            </div>
        )
    }
}

const SearchFormConnect = connect( state => ({
    tripData: state.search
}))(SearchForm);

export default SearchFormConnect;