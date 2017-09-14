import React from 'react';
import PropTypes from 'prop-types';
import { localize } from 'react-localize-redux';
import DateTime from 'react-datetime';

import 'app/styles/react-datetime.scss';

class InputDateTime extends React.Component {
    constructor() {
        super();
        this.state = {
            focused: false
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onFocus(e) {
        const { onFocus } = this.props;

        this.setState({focused: true});
        if (onFocus) {
            onFocus(e);
        }
    }

    onBlur(e) {
        const { onBlur } = this.props;

        this.setState({focused: false});
        if (onBlur) {
            onBlur(e);
        }
    }

    render() {
        const { translate, error, value, id, className, label, timeFormat, isValidDate, labelClasses, wrapperClasses, inputProps, defaultValue } = this.props,
            { focused } = this.state;

        const dateFormat = 'YYYY-MM-DD',
            errorClass = error ? 'has-danger' : '',
            labelClass = (labelClasses || '') + (
                value !== null || focused ? ' form-input--focus' : ''),
            wrapperClass = 'form-input__text ' + (wrapperClasses || ''),
            dtValue = value || '',
            dtDefaultValue = defaultValue || '',
            dtClass = 'form-input__text ' + (className || '');

        return (
            <div className={errorClass} >
                <label htmlFor={id} className={labelClass}>
                    <div className={wrapperClass}>
                        <DateTime
                            {...this.props}
                            id={id}
                            value={dtValue}
                            timeFormat={timeFormat}
                            isValidDate={isValidDate}
                            inputProps={inputProps}
                            defaultValue={dtDefaultValue}
                            dateFormat={dateFormat}
                            className={dtClass}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            locale={translate('datetimepicker.set_locale')}
                        />
                    </div>
                    <span className="form-input__label">{label}</span>
                </label>
                <div className="form-control-feedback">{error}</div>
            </div>
        );
    }
}

InputDateTime.propTypes = {
    id: PropTypes.string.isRequired,
    timeFormat: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
    ]),
    error: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    labelClasses: PropTypes.string,
    wrapperClasses: PropTypes.string,
    inputProps: PropTypes.object,
    isValidDate: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
};

export default localize(InputDateTime, 'locale');
