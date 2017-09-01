import React from 'react';

import PageHeader from 'app/components/PageHeader';
import Result from '../components/Result/Result';
import LangService from 'app/services/LangService';
import {localize} from 'react-localize-redux';
import * as lang from '../lang/SearchResult.locale.json';

class SearchResult extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <Result />
        )
    }
}

export default localize(SearchResult, 'locale');
