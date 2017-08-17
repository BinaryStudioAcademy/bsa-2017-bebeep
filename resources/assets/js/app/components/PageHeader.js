import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PageHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header: this.props.header
        }
    }

    render() {
        const { header } = this.state;

        return (
            <header className="page-header">
                <h1 className="h4">{header}</h1>
            </header>
        );
    }
}

PageHeader.propTypes = {
    header: PropTypes.string
};

export default PageHeader;
