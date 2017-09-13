import React from 'react';
import { localize } from 'react-localize-redux';

import ContainerWrapper from 'app/layouts/ContainerWrapper';
import PageHeader from 'app/components/PageHeader';
import CreateTripContainer from '../components/Containers/CreateTripContainer';

import LangService from 'app/services/LangService';
import * as lang from '../lang/CreateTrip.locale.json';

import '../styles/trip_form.scss';


class CreateTrip extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const { translate } = this.props;

        return (
            <ContainerWrapper className="container--min-height-350">
                <PageHeader header={ translate('create_trip.create_new_trip_header') }/>
                <CreateTripContainer />
            </ContainerWrapper>
        );
    }
}

export default localize(CreateTrip, 'locale');
