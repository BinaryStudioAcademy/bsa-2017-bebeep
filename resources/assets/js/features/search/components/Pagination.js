import React from 'react';

class Pagination extends React.Component {
    render() {
        const {size, limit, page, onChangePage} = this.props;
        let pages = [];

        for (let i = 1; i <= Math.floor(size / limit); i ++) {
            pages.push(
                <a href="#"
                   onClick={(e) => { e.preventDefault(); onChangePage(e.target.dataset.page)}}
                   data-page={i}
                   key={i}
                   className={'pagination__item ' + i === page ? 'pagination__item_active' : ''}>{i}</a>
            );
        }
        return (
            <div className="pagination">
                {pages}
            </div>
        );
    }
}

export default Pagination;