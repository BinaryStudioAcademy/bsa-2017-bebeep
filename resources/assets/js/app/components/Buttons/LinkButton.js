import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class LinkButton extends React.Component {

    render() {
        const { pathTo, className, iconClassName } = this.props;

        return (
            <Link to={pathTo}
                className={"btn btn--with-icon btn-primary " + className}
            >
                <i className={"fa " + iconClassName} aria-hidden="true" />
            </Link>
        );
    }
}

LinkButton.defaultProps = {
    className: '',
};

LinkButton.propTypes = {
    pathTo: PropTypes.string.isRequired,
    iconClassName: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default LinkButton;
