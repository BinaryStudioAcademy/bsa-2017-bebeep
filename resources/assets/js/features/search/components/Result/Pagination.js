import React from 'react';
import PropTypes from 'prop-types';

class Pagination extends React.Component {

    constructor() {
        super();
        this.clickPage = this.clickPage.bind(this);
    }

    clickPage(e) {
        e.preventDefault();
        const {page, onChangePage, isDisabled} = this.props,
            newPage = parseInt(e.currentTarget.dataset.page);
        if (newPage !== page && !isDisabled) {
            onChangePage(newPage)
        }
    }

    getPageLink(n, key, name, currentPage, disabled = false) {
        return (
            <span
                key={key}
                className={'page-item' + (n === currentPage ? ' active' : '') + (disabled ? ' disabled' : '')}
            >
                <a href="#"
                   onClick={this.clickPage}
                   data-page={n}
                   className="page-link"
                >{name}</a>
            </span>
        );
    }

    getLinks({page, size, limit}) {
        let current = page,
            last = Math.ceil(size / limit),
            delta = 1,
            left = current - delta,
            right = current + delta + 1,
            range = [],
            rangeWithDots = [],
            l;

        for (let i = 1; i <= last; i++) {
            if (i == 1 || i == last || i >= left && i < right) {
                range.push(i);
            }
        }

        rangeWithDots.push(
            this.getPageLink(current - 1, 'prev', (<i className="fa fa-arrow-left" />), page, page <= 1)
        );

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(this.getPageLink(l + 1, l + 1, l + 1, current, false));
                } else if (i - l !== 1) {
                    rangeWithDots.push(this.getPageLink('...' + l, '...' + l, '...', current, true));
                }
            }
            rangeWithDots.push(this.getPageLink(i, i, i, current, false));
            l = i;
        }

        rangeWithDots.push(
            this.getPageLink(current + 1, 'next', (<i className="fa fa-arrow-right" />), page, page >= last)
        );

        return rangeWithDots;
    }

    render() {
        let pages = this.getLinks(this.props);

        return (
            <div className="pagination justify-content-end">
                {pages}
            </div>
        );
    }
}

Pagination.PropTypes = {
    isDisabled: PropTypes.bool,
    size: PropTypes.number,
    page: PropTypes.number,
    limit: PropTypes.number,
    onChangePage: PropTypes.func
};

export default Pagination;