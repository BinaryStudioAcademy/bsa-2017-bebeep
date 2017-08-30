import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, {geocodeByAddress} from 'react-places-autocomplete';

class InputPlaces extends React.Component {
    constructor() {
        super();
        this.state = {
            focused: false,
            address: ''
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSelectPoint = this.onSelectPoint.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
    }

    onFocus(e) {
        const {onFocus} = this.props;
        this.setState({focused: true});
        if (onFocus) {
            onFocus(e);
        }
    }

    onBlur(e) {
        const {onBlur} = this.props;
        this.setState({focused: false});
        if (onBlur) {
            onBlur(e);
        }
    }

    onChangeAddress(address) {
        this.setState({address});
    }

    onSelectPoint(address) {
        const {onChange} = this.props;

        this.setState({address});

        geocodeByAddress(address)
            .then(results =>
                onChange({
                    place: results[0],
                    address: address,
                })
            ).catch(error => onChange({
                place: null,
                address: address,
            }));
    }

    render() {
        const {focused, address} = this.state,
            {error, id, ico, className, name, defaultValue, required} = this.props,
            inputProps = {
                value: address,
                onChange: this.onChangeAddress,
                defaultValue: defaultValue,
                id: id,
                type: 'search',
                onFocus: this.onFocus,
                onBlur: this.onBlur,
                name: name,
                required: required
            },
            placesCssClasses = {
                root: 'form-input__text form-input__autocomplete-root',
                input: 'form-input__text ' + (className || ''),
                autocompleteContainer: 'form-input__autocomplete-container'
            },
            AutocompleteItem = ({ formattedSuggestion }) => (
                <div className="suggestion-item">
                    <i className='fa fa-map-marker suggestion-icon' />
                    <strong>{formattedSuggestion.mainText}</strong>{' '}
                    <small className="text-muted">{formattedSuggestion.secondaryText}</small>
                </div>);

        return (
            <div className={(error ? 'has-danger' : '')} >
                <label
                    htmlFor={ id }
                    className={'form-input ' + (ico || '') + (address !== '' || focused ? ' form-input--focus' : '')}
                >
                    <PlacesAutocomplete
                        inputProps={inputProps}
                        classNames={placesCssClasses}

                        onSelect={this.onSelectPoint.bind(this)}
                        onEnterKeyDown={this.onSelectPoint.bind(this)}

                        googleLogo={false}
                        autocompleteItem={AutocompleteItem}
                        highlightFirstSuggestion={true}
                    />
                    <span className="form-input__label">{this.props.children}</span>
                </label>
                <div className="form-control-feedback">{ error }</div>
            </div>
        );
    }
}

InputPlaces.PropTypes = {
    id: PropTypes.required,
    value: PropTypes.required,
    ico: PropTypes.string,
    onChange: PropTypes.func.required
};

export default InputPlaces;
