import React from 'react';
import { Link } from 'react-router';

class MainMenuItem extends React.Component {

    render() {
        const { linkTo, isShow, children } = this.props;

        if (!isShow) {
            return null;
        }

        return (
            <li className="header-menu__item hidden-md-down">
                <Link to={linkTo} activeClassName="active">
                    {children}
                </Link>
            </li>
        );
    }
}

MainMenuItem.defaultProps = {
    isShow: true,
};

export default MainMenuItem;
