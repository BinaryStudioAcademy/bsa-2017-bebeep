import React from 'react';

import LangService from 'app/services/LangService';
import * as lang from '../lang/details/TripDetails.locale.json';
import {localize} from 'react-localize-redux';

import PageHeader from 'app/components/PageHeader';
import TripDetailsContainer from '../components/Containers/TripDetailsContainer';

//import '../styles/edit_trip.scss';

export default localize(class TripDetails extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <div>
                <PageHeader header={translate('trip_details.page_header')}/>
                <TripDetailsContainer id={ this.props.params.id }/>
            </div>
        );
    }
}, 'locale');
