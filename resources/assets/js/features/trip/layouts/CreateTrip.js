import React from 'react';
import PageHeader from '../../../app/components/PageHeader';
import LangService from '../../../app/services/LangService';
import * as lang from '../lang/CreateTrip.locale.json';
import {localize} from 'react-localize-redux';
import '../styles/create_trip.scss';
import CreateTripContainer from "../components/Containers/CreateTripContainer";

export default localize(class CreateTrip extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <div>
                <PageHeader header={translate('create_new_trip_header')}/>
                <CreateTripContainer />
            </div>
        );
    }
}, 'locale');
