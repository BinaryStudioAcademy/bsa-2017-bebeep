import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PageHeader extends Component {

    constructor() {
        super();
    }

    render() {
        const { header } = this.props;

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
