import React from 'react';
import '../styles/trip-card.scss';
import moment from 'moment';
import DirectionsMap from "../../../app/components/DirectionsMap";
import {Link} from 'react-router';
import {securedRequest} from '../../../app/services/RequestService';
import {localize} from 'react-localize-redux';

class Trip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: this.getStartDate(),
            startPlace: this.getStartPlace(),
            endPlace: this.getEndPlace(),
            deletable: this.props.deletable,
            editable: this.props.editable,
            isDeleted: false
        };
    }

    getStartDate() {
        return moment(`${this.props.trip.start_at} +0000`, "YYYY-MM-DD HH:mm:ss Z").format('D MMMM HH:mm');
    }

    getStartPlace() {
        if (!this.props.trip.routes.length) {
            return null;
        }

        return this.props.trip.routes[0].from;
    }

    getEndPlace() {
        if (!this.props.trip.routes.length > 0) {
            return null;
        }

        return this.props.trip.routes[this.props.trip.routes.length - 1].to;
    }

    deleteSelf() {
        securedRequest.delete('/api/v1/trips/' + this.props.trip.id).then(() => {
            this.setState({
                deletable: false,
                editable: false,
                isDeleted: true
            });
        });
    }

    restoreSelf() {
        securedRequest.delete('/api/v1/trips/trash/' + this.props.trip.id).then(() => {
            this.setState({
                deletable: this.props.deletable,
                editable: this.props.editable,
                isDeleted: false
            });
        });
    }

    render() {
        const {translate} = this.props;

        return (
            <div className={'col-sm-4 trip-item ' + (this.state.isDeleted ? 'deleted-trip' : '')}>
                {this.state.startPlace ? (
                    <DirectionsMap title={this.state.startDate}
                                   needDirection="1"
                                   endTime={() => {}}
                                   from={this.state.startPlace.geometry.location}
                                   to={this.state.endPlace.geometry.location}
                    >
                        <div className="card-block">
                            <div className="card-text">
                                <span className="text-muted"><strong>{translate('car')}:</strong> {this.props.trip.vehicle.brand}</span><br/>
                                <span className="text-muted"><strong>{translate('price')}:</strong> ${this.props.trip.price}</span><br/>
                                <span className="text-muted"><strong>{translate('seats')}:</strong> {this.props.trip.seats}</span><br/>
                            </div>
                        </div>
                        <div className="card-block trip-actions">
                            {this.state.editable ? (
                                <Link to={'/trip/edit/' + this.props.trip.id} className="btn btn-primary">{translate('edit')}</Link>
                            ) : (<span>&nbsp;</span>)}
                            {this.state.deletable ? (
                                <button onClick={this.deleteSelf.bind(this)} className="btn btn-danger hover">{translate('delete')}</button>
                            ) : (<span>&nbsp;</span>)}
                            {this.state.isDeleted ? (
                                <span>{translate('deleted_successfully')} &nbsp;<button onClick={this.restoreSelf.bind(this)} className="btn btn-default hover">{translate('restore')}</button></span>
                            ) : (<span>&nbsp;</span>)}
                        </div>
                    </DirectionsMap>
                ) : (<span>&nbsp;</span>)}
            </div>
        )
    }
}

export default localize(Trip, 'locale');
