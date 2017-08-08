import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header: this.props.header
        }
    }

    render() {
        const { header } = this.state;

        return (
            <header>
                <h1>{header}</h1>
            </header>
        );
    }
}

Header.propTypes = {
    header: PropTypes.string
};

export default Header;
