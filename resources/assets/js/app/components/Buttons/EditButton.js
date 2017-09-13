import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class EditButton extends React.Component {

    render() {
        const { className, pathTo } = this.props;

        return (
            <Link to={pathTo}
                className={"btn btn--with-icon btn-success " + className}
            >
                <i className="fa fa-pencil" aria-hidden="true" />
            </Link>
        );
    }
}

EditButton.defaultProps = {
    className: '',
};

EditButton.propTypes = {
    pathTo: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default EditButton;
