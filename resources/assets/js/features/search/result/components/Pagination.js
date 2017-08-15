import React from 'react';

class Pagination extends React.Component {

    constructor() {
        super();
        this.clickPage = this.clickPage.bind(this);
    }

    clickPage(e) {
        e.preventDefault();
        const {page, onChangePage} = this.props,
            newPage = parseInt(e.currentTarget.dataset.page);
        if (newPage !== page) {
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

    getLinks({ size, limit, page}) {
        const countPages = Math.ceil(size / limit);
        let pages = [];
        if (countPages <= 1) {
            return pages;
        }

        pages.push(
            this.getPageLink(page - 1, 'prev', (<i className="fa fa-arrow-left" />), page, page <= 1)
        );

        pages.push(
            this.getPageLink(1, 1, 1, page)
        );

        if (page > 2) {
            if (page > 3) {
                pages.push(
                    this.getPageLink('...', '...1', '...', page, true)
                );
            }
            if (page == countPages && countPages > 3) {
                pages.push(
                    this.getPageLink(page - 2, page - 2, page - 2, page)
                );
            }
            pages.push(
                this.getPageLink(page - 1, page - 1, page - 1, page)
            );
        }

        if (page != 1 && page != countPages) {
            pages.push(
                this.getPageLink(page, page, page, page)
            );
        }

        if (page < countPages - 1) {
            pages.push(
                this.getPageLink(page + 1, page + 1, page + 1, page)
            );
            if (page == 1 && countPages > 3) {
                pages.push(
                    this.getPageLink(page + 2, page + 2, page + 2, page)
                );
            }
            if (countPages > 4) {
                pages.push(
                    this.getPageLink('...', '...2', '...', page, true)
                );
            }
        }

        pages.push(
            this.getPageLink(countPages, countPages, countPages, page)
        );

        pages.push(
            this.getPageLink(page + 1, 'next', (<i className="fa fa-arrow-right" />), page, page >= countPages)
        );
        return pages;
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

export default Pagination;