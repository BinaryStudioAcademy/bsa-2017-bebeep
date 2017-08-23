import React from 'react';
import { localize } from 'react-localize-redux';

import LangService from 'app/services/LangService';
import * as lang from '../lang/details/TripDetails.locale.json';

import PageHeader from 'app/components/PageHeader';
import TripDetailsContainer from '../components/Containers/TripDetailsContainer';


export default localize(class TripDetails extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const { translate, params } = this.props;

        return (
            <div>
                <PageHeader header={translate('trip_details.page_header')}/>
                <TripDetailsContainer id={ params.id }/>
            </div>
        );
    }
}, 'locale');
