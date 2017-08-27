import React from 'react';

import PageHeader from 'app/components/PageHeader';
import SearchForm from '../components/Index/SearchForm';
import LangService from 'app/services/LangService';
import * as lang from '../lang/SearchIndex.locale.json';
import {localize} from 'react-localize-redux';

export default localize(class SearchIndex extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <div>
                <PageHeader header={translate('search_index.find_a_ride_header')}/>
                <SearchForm />
            </div>
        );
    }
}, 'locale');
