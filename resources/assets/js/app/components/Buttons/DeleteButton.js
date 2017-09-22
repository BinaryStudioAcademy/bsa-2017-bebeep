import React from 'react';
import PropTypes from 'prop-types';

class DeleteButton extends React.Component {

    render() {
        const { className, onClick, title } = this.props;

        return (
            <button type="button"
                role="button"
                className={"btn btn--with-icon btn-danger " + className}
                title={title}
                onClick={onClick}
            >
                <i className="fa fa-trash-o" aria-hidden="true" />
            </button>
        );
    }
}

DeleteButton.defaultProps = {
    className: '',
    onClick: () => {},
};

DeleteButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default DeleteButton;
