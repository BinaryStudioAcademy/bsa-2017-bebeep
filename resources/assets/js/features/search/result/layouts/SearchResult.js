import React from 'react';
import PageHeader from '../../../../app/components/PageHeader';
import Filter from '../components/Filter';
import SearchForm from '../components/SearchForm';
import TripList from '../components/TripList';

class SearchResult extends React.Component {
    render() {
        return (
            <div>
                <PageHeader header={'Search trips'}/>
                <SearchForm />
                <Filter />
                <TripList />
            </div>
        )
    }
}

export default SearchResult;