import React from 'react';
import PropTypes from 'prop-types';
import {localize} from 'react-localize-redux';
import DateTime from 'react-datetime';
import moment from 'moment';

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

    valid(current){
        return current.isAfter(moment().subtract( 1, 'day' ));
    };

    render() {
        const { error, value, id, translate, className, label } = this.props,
            { focused } = this.state;

        return (
            <div className={(error ? 'has-danger' : '')} >
                <label htmlFor={id} className={"form-input fa-calendar" + (value !== null || focused ? ' form-input--focus' : '')}>
                    <div className="form-input__text">
                        <DateTime
                            id={id}
                            isValidDate={this.valid}
                            value={value}
                            className={ "form-input__text " + (className || '')}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            locale={translate('datetimepicker.set_locale')}
                            {...this.props}
                        />
                    </div>
                    <span className="form-input__label">{label}</span>
                </label>
                <div className="form-control-feedback">{ error }</div>
            </div>
        );
    }
}

InputDateTime.PropTypes = {
    id: PropTypes.required,
    value: PropTypes.required,
};

export default localize(InputDateTime, 'locale');
