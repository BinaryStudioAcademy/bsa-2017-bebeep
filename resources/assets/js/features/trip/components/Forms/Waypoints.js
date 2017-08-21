import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {localize} from 'react-localize-redux';

class Waypoints extends React.Component {
    render() {
        const {translate} = this.props;
        let waypointsView = '';

        if (this.props.waypoints) {
            waypointsView = this.props.waypoints.map((point, index) =>
                <div className="row justify-content-end stopover-row" key={index}>
                    <label className="form-control-label text-muted col-sm-4">{translate('trip_form.stopover.name', {n: index + 1})}</label>
                    <div className="col-sm-8 text-right">
                        <PlacesAutocomplete inputProps={{value: point.value, onChange(address) {point.onChange(address, index)}}}
                                            classNames={this.props.placesCssClasses}
                                            onSelect={(address) => {point.onSelect(address, index);}}
                                            onEnterKeyDown={(address) => {point.onSelect(address, index);}}
                        />
                        <a href="#" onClick={(e) => { e.preventDefault(); this.props.onWaypointDelete(index); }}>{translate('trip_form.stopover.delete')}</a>
                    </div>
                </div>
            );
        }

        return (
            <div>
                {waypointsView}
                <div className="form-group text-right">
                    <a href="#" onClick={this.props.onWaypointAdd}>{translate('trip_form.stopover.add')}</a>
                </div>
            </div>
        )
    }
}

export default localize(Waypoints, 'locale');