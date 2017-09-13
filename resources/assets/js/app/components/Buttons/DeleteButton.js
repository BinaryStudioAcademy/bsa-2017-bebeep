import React from 'react';

class DeleteButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { className, onClick } = this.props;

        return (
            <button type="button"
                role="button"
                className={"btn btn--with-icon btn-danger " + className}
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

export default DeleteButton;
