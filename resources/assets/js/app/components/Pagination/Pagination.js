import React from 'react';
import PropTypes from 'prop-types';

import { PageGenerator } from 'app/services/PageGenerator';
import { PageItem } from './';

class Pagination extends React.Component {

    constructor() {
        super();
        this.clickPage = this.clickPage.bind(this);
    }

    clickPage(newPage) {
        const { onChangePage, isShow } = this.props;

        if (isShow) {
            onChangePage(newPage);
        }
    }

    render() {
        const { page, size, limit, isShow } = this.props;
        let pageKey = 0;

        if (!isShow) {
            return null;
        }

        return (
            <div className="pagination justify-content-end">
                <PageItem
                    page={page - 1}
                    currentPage={page}
                    disabled={page <= 1}
                    onChangePage={this.clickPage}
                ><i className="fa fa-arrow-left" /></PageItem>
                {PageGenerator(page, size, limit, (page, currentPage, disabled = false) => (
                    <PageItem
                        key={pageKey++}
                        page={page}
                        currentPage={currentPage}
                        disabled={disabled}
                        onChangePage={this.clickPage}
                    >{page}</PageItem>
                ))}
                <PageItem
                    page={page + 1}
                    currentPage={page}
                    disabled={page  >= Math.ceil(size / limit)}
                    onChangePage={this.clickPage}
                ><i className="fa fa-arrow-right" /></PageItem>
            </div>
        );
    }
}

Pagination.defaultProps = {
    isShow: false,
};

Pagination.PropTypes = {
    isShow: PropTypes.bool,
    size: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired
};

export default Pagination;
