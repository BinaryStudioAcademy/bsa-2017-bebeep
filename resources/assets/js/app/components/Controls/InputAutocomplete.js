import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';

class InputAutocomplete extends React.Component {

    constructor() {
        super();

        this.state = {
            focused: false
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onFocus(e) {
        this.setState({focused: true});
        this.props.onFocus && this.props.onFocus(e);
    }

    onBlur(e) {
        this.setState({focused: false});
        this.props.onBlur && this.props.onBlur(e);
    }

    render() {
        const {error, value, id, ico, className, name, required, onChange, onSelected, items, transformer} = this.props,
            {focused} = this.state;

        return (
            <div className={(error ? 'has-danger' : '')} >
                <label
                    htmlFor={ id }
                    className={'form-input ' + (ico || '') + (value !== '' || focused ? ' form-input--focus' : '')}
                >
                    <Autocomplete
                        items={items}
                        shouldItemRender={(item, value) => transformer(item).label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                        getItemValue={item => transformer(item).label}
                        renderItem={(item, highlighted) =>
                            <div
                                key={transformer(item).id}
                                className={'autocomplete-box__item' + (highlighted ? ' autocomplete-box__item--active' : '')}
                            >
                                {transformer(item).label}
                            </div>
                        }
                        renderMenu={(items, value, style) =>
                            <div className="form-input__autocomplete-container autocomplete-box">{items}</div>}
                        wrapperProps={{
                            className: "form-input__text"
                        }}
                        wrapperStyle={{}}
                        value={value}
                        onChange={onChange}
                        onSelect={onSelected}
                        selectOnBlur={true}
                        inputProps={{
                            id: id,
                            className: "form-input__text " + (className || ''),
                            name: name,
                            required: required,
                            onBlur: this.onBlur,
                            onFocus: this.onFocus
                        }}
                    />
                    <span className="form-input__label">{this.props.children}</span>
                </label>
                <div className="form-control-feedback">{ error }</div>
            </div>
        );
    }
}

InputAutocomplete.PropTypes = {
    id: PropTypes.required,
    value: PropTypes.required,
    ico: PropTypes.string,
    transformer: PropTypes.func.isRequired
};

export default InputAutocomplete;
