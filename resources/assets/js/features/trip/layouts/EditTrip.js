import React from 'react';
import { localize } from 'react-localize-redux';

import ContainerWrapper from 'app/layouts/ContainerWrapper';
import PageHeader from 'app/components/PageHeader';
import EditTripContainer from '../components/Containers/EditTripContainer';

import LangService from 'app/services/LangService';
import * as lang from '../lang/EditTrip.locale.json';

import '../styles/edit_trip.scss';

class EditTrip extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const { translate } = this.props;

        return (
            <ContainerWrapper>
                <PageHeader header={ translate('edit_trip.edit_trip_header') }/>
                <EditTripContainer id={ this.props.params.id }/>
            </ContainerWrapper>
        );
    }
}

export default localize(EditTrip, 'locale');
