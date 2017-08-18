import React from 'react';
import PageHeader from '../../../app/components/PageHeader';
import SearchForm from '../components/Index/SearchForm';

export default class SearchIndex extends React.Component {
    render() {
        return (
            <div>
                <PageHeader header={'Find a ride'}/>
                <SearchForm />
            </div>
        );
    }
}