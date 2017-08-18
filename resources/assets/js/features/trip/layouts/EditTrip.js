import React from 'react';

import PageHeader from '../../../app/components/PageHeader';
import EditTripContainer from "../components/Containers/EditTripContainer";

import '../styles/edit_trip.scss';

export default class EditTrip extends React.Component {
    render() {
        return (
            <div>
                <PageHeader header={'Edit trip'}/>
                <EditTripContainer id={ this.props.params.id }/>
            </div>
        );
    }
}
