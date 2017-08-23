import React from 'react';
import PropTypes from 'prop-types';

class SelectItem extends React.Component {
    render() {
        const {value, disabled, children} = this.props;
        return (
            <option value={value} disabled={!!disabled}>{children}</option>
        );
    }
}

SelectItem.PropTypes = {
    value: PropTypes.required,
    disabled: PropTypes.bool
};

export default SelectItem;