import React from 'react';
import LangService from '../../../app/services/LangService';
import * as lang from '../lang/CreateTrip.locale.json';
import {localize} from 'react-localize-redux';

import PageHeader from 'app/components/PageHeader';
import CreateTripContainer from '../components/Containers/CreateTripContainer';

import '../styles/create_trip.scss';

export default localize(class CreateTrip extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <div>
                <PageHeader header={translate('create_trip.create_new_trip_header')}/>
                <CreateTripContainer />
            </div>
        );
    }
}, 'locale');
