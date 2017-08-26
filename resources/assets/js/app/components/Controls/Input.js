import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
    constructor() {
        super();
        this.state = {
            focused: false
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
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

    render() {
        const {focused} = this.state,
            {error, value, id, ico, type, className, name, defaultValue, required, onChange} = this.props;

        return (
            <div className={(error ? 'has-danger' : '')} >
                <label
                    htmlFor={ id }
                    className={'form-input ' + (ico || '') + (value !== '' || focused ? ' form-input_focus' : '')}
                >
                    <input
                        id={ id }
                        className={"form-input__text " + (className || '')}
                        value={value}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
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
