import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

class Waypoints extends React.Component {
    render() {
        let waypointsView = '';

        if (this.props.waypoints) {
            waypointsView = this.props.waypoints.map((point, index) =>
                <div className="row justify-content-end stopover-row" key={index}>
                    <label className="form-control-label text-muted col-sm-4">Stopover {index + 1}</label>
                    <div className="col-sm-8 text-right">
                        <PlacesAutocomplete inputProps={{value: point.value, onChange(address) {point.onChange(address, index)}}}
                                            classNames={this.props.placesCssClasses}
                                            onSelect={(address) => {point.onSelect(address, index);}}
                                            onEnterKeyDown={(address) => {point.onSelect(address, index);}}
                        />
                        <a href="#" onClick={(e) => { e.preventDefault(); this.props.onWaypointDelete(index); }}>Delete</a>
                    </div>
                </div>
            );
        }

        return (
            <div>
                {waypointsView}
                <div className="form-group text-right">
                    <a href="#" onClick={this.props.onWaypointAdd}>Add stopover</a>
                </div>
            </div>
        )
    }
}

export default Waypoints;