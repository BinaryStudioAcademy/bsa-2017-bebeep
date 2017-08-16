import React from 'react';
import PageHeader from '../../../app/components/PageHeader';
import '../styles/edit_trip.scss';
import EditTripContainer from "../components/Edit/EditTripContainer";

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
