import React from 'react';
import PageHeader from '../../../app/components/PageHeader';
import Filter from '../components/Result/Filter';
import SearchForm from '../components/Result/SearchForm';
import TripList from '../components/Result/TripList';

class SearchResult extends React.Component {
    render() {
        return (
            <div>
                <PageHeader header={'Search trips'}/>
                <SearchForm />
                <div className="row">
                    <div className="col-md-3">
                        <Filter />
                    </div>
                    <div className="col-md-9">
                        <TripList />
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchResult;