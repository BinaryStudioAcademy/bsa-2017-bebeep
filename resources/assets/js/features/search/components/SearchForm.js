import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {geocodeByAddress} from 'react-places-autocomplete';
import '../styles/search-index.scss';

class SearchForm extends React.Component {
    constructor() {
        super();

        this.state = {
            startPoint: {
                address: '',
                place: null,
            },
            endPoint: {
                address: '',
                place: null,
            }
        };
    }

    onChangeStartPoint(address) {
        this.setState({
            startPoint: {address: address}
        });
    }

    onChangeEndPoint(address) {
        this.setState({
            endPoint: {address: address}
        });
    }

    onSelectStartPoint(address) {
        this.selectGeoPoint('start', address);
    }

    onSelectEndPoint(address) {
        this.selectGeoPoint('end', address);
    }

    selectGeoPoint(type, address) {
        this.setState({
            [type + 'Point']: {
                address: address,
                place: null
            }
        });

        geocodeByAddress(address)
            .then(results => {
                this.setState({
                    [type + 'Point']: {
                        place: results[0],
                        address: address,
                    }
                });
            })
            .catch(error => {
                this.setState({
                    [type + 'Point']: {
                        place: null,
                        address: address,
                    }
                })
            });
    }

    render() {
        const placesCssClasses = {
            root: 'form-group',
            input: 'form-control search-input',
            autocompleteContainer: 'autocomplete-container'
        };

        const startPointProps = {
            value: this.state.startPoint.address,
            onChange: this.onChangeStartPoint.bind(this),
        };

        const endPointProps = {
            value: this.state.endPoint.address,
            onChange: this.onChangeEndPoint.bind(this),
        };
        return (
                <form role="form" className="form-inline search-form" action="" method="POST">
                    <div className="form-group">
                        <label htmlFor="startPoint" className="sr-only">Leaving from</label>
                        <div className="col-md-10">
                            <PlacesAutocomplete inputProps={startPointProps}
                                                classNames={placesCssClasses}
                                                onSelect={this.onSelectStartPoint.bind(this)}
                                                onEnterKeyDown={this.onSelectStartPoint.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd" className="sr-only">Going to</label>
                        <div className="col-md-10">
                            <PlacesAutocomplete inputProps={endPointProps}
                                                classNames={placesCssClasses}
                                                onSelect={this.onSelectEndPoint.bind(this)}
                                                onEnterKeyDown={this.onSelectEndPoint.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-search btn-primary">Find a ride</button>
                    </div>
                </form>
        );
    }
}

export default  SearchForm;

