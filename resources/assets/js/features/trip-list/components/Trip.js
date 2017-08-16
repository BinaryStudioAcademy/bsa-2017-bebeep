import React from 'react';
import '../styles/trip-card.scss';
import moment from 'moment';
import DirectionsMap from "../../../app/components/DirectionsMap";

class Trip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: this.getStartDate(),
            startPlace: this.getStartPlace(),
            endPlace: this.getEndPlace()
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

    render() {
        return (
            <div className="col-sm-4 trip-item">
                {this.state.startPlace ? (
                    <DirectionsMap title={this.state.startDate}
                                   needDirection="1"
                                   endTime={() => {}}
                                   from={this.state.startPlace.geometry.location}
                                   to={this.state.endPlace.geometry.location}
                    >
                        <div className="card-block">
                            <div className="card-text">
                                <span className="text-muted"><strong>Car:</strong> {this.props.trip.vehicle.brand}</span><br/>
                                <span className="text-muted"><strong>Price:</strong> ${this.props.trip.price}</span><br/>
                                <span className="text-muted"><strong>Seats:</strong> {this.props.trip.seats}</span><br/>
                            </div>
                        </div>
                        <div className="card-block trip-actions">
                            <a href="#" className="btn btn-primary">Edit</a>
                            {this.props.deletable ? (
                                <a href="#" className="btn btn-danger">Delete</a>
                            ) : (<span>&nbsp;</span>)}
                        </div>
                    </DirectionsMap>
                ) : (<span>&nbsp;</span>)}
            </div>
        )
    }
}

export default Trip;
