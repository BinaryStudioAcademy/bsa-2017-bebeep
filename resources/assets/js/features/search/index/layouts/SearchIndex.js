import React, { Component } from 'react';

import PageHeader from 'app/components/PageHeader';
import SearchForm from '../components/SearchForm';

export default class SearchIndex extends Component {
    render() {
        return (
            <div>
                <PageHeader header={'Find a ride'}/>
                <SearchForm />
            </div>
        );
    }
}
