import React from 'react';
import { localize } from 'react-localize-redux';

import LangService from 'app/services/LangService';
import * as LangTripDetails from '../lang/TripDetails.locale.json';
import * as LangSearchForm from 'features/search/lang/SearchIndex.locale.json';

import PageHeader from 'app/components/PageHeader';
import SearchForm from 'features/search/components/Index/SearchForm';
import TripDetailsContainer from '../components/Containers/TripDetailsContainer';


class TripDetails extends React.Component {

    componentWillMount() {
        LangService.addTranslation(LangTripDetails);
        LangService.addTranslation(LangSearchForm);
    }

    render() {
        const { translate, params } = this.props;

        return (
            <div>
                <SearchForm />
                <TripDetailsContainer id={ params.id } />
            </div>
        );
    }
}

export default localize(TripDetails, 'locale');
