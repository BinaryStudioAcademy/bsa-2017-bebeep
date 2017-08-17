import React from 'react';
import PageHeader from '../../../app/components/PageHeader';
import Result from '../components/Result/Result';

class SearchResult extends React.Component {
    constructor() {
        super();

    }

    render() {
        return (
            <div>
                <PageHeader header={'Search trips'}/>
                <Result />
            </div>
        )
    }
}

export default SearchResult;