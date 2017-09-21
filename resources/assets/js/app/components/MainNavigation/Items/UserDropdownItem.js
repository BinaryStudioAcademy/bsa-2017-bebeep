import React from 'react';
import { Link } from 'react-router';

class UserDropdownItem extends React.Component {

    render() {
        const { linkTo, isShow, onClick, children, classes } = this.props;

        if (!isShow) {
            return null;
        }

        return (
            <Link className={'dropdown-item ' + classes} to={linkTo} onClick={onClick}>
                {children}
            </Link>
        );
    }
}

UserDropdownItem.defaultProps = {
    isShow: true,
};

export default UserDropdownItem;
