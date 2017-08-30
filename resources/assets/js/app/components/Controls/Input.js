import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {

    render() {
        const {error, value, id, ico, type, className, name, defaultValue, required, onChange} = this.props;

        return (
            <div className={(error ? 'has-danger' : '')} >
                <label
                    htmlFor={ id }
                    className={'form-input ' + (ico || '') + (value !== '' ? ' form-input--focus' : '')}
                >
                    <input
                        id={ id }
                        className={"form-input__text " + (className || '')}
                        value={value}
                        type={ type || 'text' }
                        name={ name }
                        defaultValue={ defaultValue }
                        required={ required }
                        onChange={ onChange }
                    />
                    <span className="form-input__label">{this.props.children}</span>
                </label>
                <div className="form-control-feedback">{ error }</div>
            </div>
        );
    }
}

Input.PropTypes = {
    id: PropTypes.required,
    value: PropTypes.required,
    ico: PropTypes.string
};

export default Input;
