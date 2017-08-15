import React from 'react';

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
        return (
            <div>
                <input ref={ (input) => this.inputFrom = input } type="text" name="from" placeholder="From" />
                <div className="btn" onClick={this.swapFromTo}>&lt;-&gt;</div>
                <input ref={ (input) => this.inputTo = input } type="text" name="to" placeholder="To"/>
                <input type="submit" value="Search"/>
            </div>
        )
    }
}

export default SearchForm;