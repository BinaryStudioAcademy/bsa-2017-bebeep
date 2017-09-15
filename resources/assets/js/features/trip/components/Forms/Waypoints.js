import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { localize } from 'react-localize-redux';

import { DeleteButton } from 'app/components/Buttons';

class Waypoints extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            waypointsView: '',
        };
    }

    componentWillMount() {
        const { waypoints } = this.props;
        let waypointsView = '';

        if (waypoints.length) {
            waypointsView = waypoints.map((waypoint, index) =>
                this.renderWaypointView(waypoint, index)
            );
        }

        this.setState({
            waypointsView,
        });
    }

    componentWillReceiveProps(nextProps) {
        const waypoints = nextProps.waypoints;
        let waypointsView = '';

        if (waypoints.length) {
            waypointsView = waypoints.map((waypoint, index) =>
                this.renderWaypointView(waypoint, index)
            );
        }

        this.setState({
            waypointsView,
        });
    }

    renderWaypointView(waypoint, index) {
        const { translate, placesCssClasses, onWaypointDelete } = this.props;

        return (
            <div className="row align-items-center justify-content-end waypoints-element" key={index}>
                <label className="form-control-label text-muted col-sm-4 mt-3">
                    {translate('trip_form.stopover.name', {n: index + 1})}
                </label>

                <div className="col-sm-8 text-right mt-3">
                    <div className="row no-gutters align-items-center">
                        <div className="col-10">
                            <PlacesAutocomplete
                                inputProps={{
                                    value: waypoint.value,
                                    onChange: (address) => {waypoint.onChange(address, index)},
                                }}
                                classNames={placesCssClasses}
                                onSelect={(address) => {waypoint.onSelect(address, index);}}
                                onEnterKeyDown={(address) => {waypoint.onSelect(address, index);}}
                            />
                        </div>
                        <div className="col-2">
                            <DeleteButton onClick={() => onWaypointDelete(index)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { translate, onWaypointAdd } = this.props,
            { waypointsView } = this.state;

        return (
            <div>
                {waypointsView}
                <div className="form-group text-right waypoints-add-action">
                    <a href="#" onClick={onWaypointAdd}>
                        {translate('trip_form.stopover.add')}
                    </a>
                </div>
            </div>
        );
    }
}

export default localize(Waypoints, 'locale');
