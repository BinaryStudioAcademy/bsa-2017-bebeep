import React from 'react';
import PropTypes from 'prop-types';
import {PageGenerator} from '../../services/PageGenerator';
import { PageItem } from './';

class Pagination extends React.Component {

    constructor() {
        super();
        this.clickPage = this.clickPage.bind(this);
    }

    clickPage(newPage) {
        const {onChangePage, isDisabled} = this.props;
        if (!isDisabled) {
            onChangePage(newPage)
        }
    }

    render() {
        const {page, size, limit} = this.props;
        let pageKey = 0;
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

Pagination.PropTypes = {
    isDisabled: PropTypes.bool,
    size: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired
};

export default Pagination;