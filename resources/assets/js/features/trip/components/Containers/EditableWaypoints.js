import React from 'react';
import {geocodeByAddress} from 'react-places-autocomplete';

export const EditableWaypoints = ComposedComponent => class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            waypoints: [],
            onWaypointAdd: this.onWaypointAdd.bind(this),
            onWaypointChange: this.onWaypointChange.bind(this),
            onWaypointSelect: this.onWaypointSelect.bind(this),
            onWaypointDelete: this.onWaypointDelete.bind(this),
        };
    }

    onWaypointAdd(e) {
        e.preventDefault();

        this.setState({
            waypoints: [
                ...this.state.waypoints,
                {
                    value: '',
                    place: null,
                    onChange: this.state.onWaypointChange,
                    onSelect: this.state.onWaypointSelect
                }
            ]
        });
    }

    onWaypointChange(address, index) {
        let waypoints = this.state.waypoints;
        waypoints[index].value = address;

        this.setState({
            waypoints
        });
    }

    onWaypointSelect(address, index) {
        let waypoints = this.state.waypoints;
        waypoints[index].value = address;
        waypoints[index].place = null;

        geocodeByAddress(address).then((results) => {
            waypoints[index].place = results[0];
            this.setState({
                waypoints
            });
        });
    }

    onWaypointDelete(index) {
        let waypoints = this.state.waypoints;
        waypoints.splice(index, 1);

        this.setState({
            waypoints
        });
    }

    render() {
        return <ComposedComponent {...this.props} {...this.state} />;
    }
};