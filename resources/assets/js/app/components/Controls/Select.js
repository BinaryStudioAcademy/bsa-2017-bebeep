import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
    render() {
        const {error, value, id, type, className, name, defaultValue, required, onChange} = this.props;

        return (
            <div className={(error ? 'has-danger' : '')} >
                <div className="form-select">
                    <select
                        className={"form-select__select " + (className || '')}
                        value={value}
                        id={id}
                        type={type}
                        name={name}
                        defaultValue={defaultValue}
                        required={required}
                        onChange={onChange}
                    >
                        {this.props.children}
                    </select>
                </div>
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
