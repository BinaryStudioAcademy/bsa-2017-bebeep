import React from 'react';
import '../../styles/search-sort.scss';

class SortPanel extends React.Component {
    render() {
        const { sort, order, onChange } = this.props;
        return (
            <span>
                <a href="#sort/price"
                   onClick={e => { e.preventDefault(); onChange('price') }}
                   className={"search-sort" + (sort === 'price' ? " search-sort_active" : '') + (order === 'asc' ? " search-sort_asc" : "")}
                >Price</a>
                <a href="#sort/start"
                   onClick={e => { e.preventDefault(); onChange('start_at') }}
                   className={"search-sort" + (sort === 'start_at' ? " search-sort_active" : '') + (order === 'asc' ? " search-sort_asc" : "")}
                >Date</a>
            </span>
        );
    }
}

export default SortPanel;