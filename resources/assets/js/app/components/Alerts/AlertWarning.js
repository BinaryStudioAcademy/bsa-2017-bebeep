import React from 'react';
import PropTypes from 'prop-types';

class AlertWarning extends React.Component {

    render() {
        const { className, children } = this.props;

        return (
            <div className={"alert alert-warning py-2 px-3 mb-2 " + className}>
                {children}
            </div>
        );
    }
}

AlertWarning.defaultProps = {
    className: '',
};

AlertWarning.propTypes = {
    className: PropTypes.string,
};

export default AlertWarning;
