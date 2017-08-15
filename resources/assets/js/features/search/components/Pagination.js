import React from 'react';

class Pagination extends React.Component {

    constructor() {
        super();
        this.clickPage = this.clickPage.bind(this);
    }

    clickPage(e) {
        e.preventDefault();
        const {page, onChangePage} = this.props,
            newPage = parseInt(e.target.dataset.page);

        if (newPage !== page) {
            onChangePage(newPage)
        }
    }

    getPageLink(n, name, page) {
        return (
            <a href="#"
               onClick={this.clickPage}
               data-page={n}
               key={n + '' + name}
               className={'pagination__item ' + (n === page ? 'pagination__item_active' : '')}>{name}</a>
        );
    }

    getLinks({ size, limit, page}) {
        const countPages = Math.ceil(size / limit);
        let pages = [];
        if (page > 1) {
            pages.push(
                this.getPageLink(page - 1, 'prev', page)
            );
        }
        for (let i = 1; i <= countPages; i++) {
            pages.push(
                this.getPageLink(i, i, page)
            );
        }
        if (page < countPages) {
            pages.push(
                this.getPageLink(page + 1, 'next', page)
            );
        }
        return pages;
    }

    render() {
        let pages = this.getLinks(this.props);

        return (
            <div className="pagination">
                {pages}
            </div>
        );
    }
}

export default Pagination;