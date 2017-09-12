import React from 'react';
import PropTypes from 'prop-types';

class PageHeader extends React.Component {

    constructor() {
        super();
    }

    render() {
        const { header } = this.props;

        return (
            <header className="page-header">
                <h1 className="page-header__header">{header}</h1>
            </header>
        );
    }
}

PageHeader.propTypes = {
    header: PropTypes.string
};

export default PageHeader;
