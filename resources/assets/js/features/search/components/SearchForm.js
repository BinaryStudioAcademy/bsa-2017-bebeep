import React from 'react';

class SearchForm extends React.Component {
    render() {
        return (
            <div>
                <input type="text" name="from" placeholder="From"/>
                <div className="btn"></div>
                <input type="text" name="to" placeholder="To"/>
                <input type="submit" value="Search"/>
            </div>
        )
    }
}

export default SearchForm;