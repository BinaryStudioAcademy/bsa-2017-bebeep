import React from 'react';

import LangService from 'app/services/LangService';
import * as lang from '../lang/EditTrip.locale.json';
import {localize} from 'react-localize-redux';
import PageHeader from 'app/components/PageHeader';
import EditTripContainer from '../components/Containers/EditTripContainer';

import '../styles/edit_trip.scss';

export default localize(class EditTrip extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <div>
                <PageHeader header={translate('edit_trip_header')}/>
                <EditTripContainer id={ this.props.params.id }/>
            </div>
        );
    }
}, 'locale');
