import React from 'react';
import PropTypes from 'prop-types';

class PageItem extends React.Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        const { currentPage, onChangePage } = this.props,
            newPage = parseInt(e.currentTarget.dataset.page);
        if (newPage !== currentPage) {
            onChangePage(newPage);
        }
    }

    render() {
        const {page, currentPage, disabled, children} = this.props;
        return (
            <span className={'page-item' + (page === currentPage ? ' active' : '') + (disabled ? ' disabled' : '')}>
                <a href="#"
                   onClick={this.onClick}
                   data-page={page}
                   className="page-link"
                >{children}</a>
            </span>
        );
    }
}

PageItem.PropTypes = {
    page: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
    onChangePage: PropTypes.func.isRequired
};

export default PageItem;
